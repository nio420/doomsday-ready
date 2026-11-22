import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import {
  Cinema,
  CreateCinemaInput,
  BookingQuoteResponse,
  BundleAllocation,
} from "./cinema.interface";

const createCinemaDB = async (data: CreateCinemaInput): Promise<Cinema> => {
  const uniqueBundleSizes = Array.from(new Set(data.bundleSizes));

  const cinema = await prisma.cinema.create({
    data: {
      name: data.name,
      bundleSizes: uniqueBundleSizes,
    },
  });

  return cinema;
};

const listCinemasDB = async (): Promise<Cinema[]> => {
  return prisma.cinema.findMany({
    orderBy: { createdAt: "asc" },
  });
};

const getBookingQuoteDB = async (
  id: string,
  groupSize: number,
): Promise<BookingQuoteResponse> => {
  const cinema = await prisma.cinema.findUnique({
    where: { id },
  });

  if (!cinema) {
    throw new AppError("Cinema not found", 404);
  }

  const candidateSizes = Array.from(new Set(cinema.bundleSizes));
  const dp: number[] = new Array<number>(groupSize + 1).fill(Infinity);
  const parent: (number | null)[] = new Array<number | null>(
    groupSize + 1,
  ).fill(null);
  dp[0] = 0;

  for (let current = 1; current <= groupSize; current++) {
    for (const bundleSize of candidateSizes) {
      if (
        current - bundleSize >= 0 &&
        dp[current - bundleSize] + 1 < dp[current]
      ) {
        dp[current] = dp[current - bundleSize] + 1;
        parent[current] = bundleSize;
      }
    }
  }

  if (dp[groupSize] === Infinity) {
    return {
      cinemaId: id,
      possible: false,
      groupSize,
      totalBundles: 0,
      bundles: [],
      message: "Not possible",
    };
  }

  const bundles: BundleAllocation[] = [];
  const bundleCounts = new Map<number, number>();
  let remaining = groupSize;

  while (remaining > 0) {
    const bundleSize = parent[remaining] as number;
    bundleCounts.set(bundleSize, (bundleCounts.get(bundleSize) ?? 0) + 1);
    remaining -= bundleSize;
  }

  for (const [bundleSize, count] of bundleCounts) {
    bundles.push({ bundleSize, count });
  }

  return {
    cinemaId: id,
    possible: true,
    groupSize,
    totalBundles: dp[groupSize],
    bundles,
  };
};

export const cinemaService = {
  createCinemaDB,
  listCinemasDB,
  getBookingQuoteDB,
};
