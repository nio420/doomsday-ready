/**
 * Typed API client for the Doomsday Ready frontend.
 * Reads the backend base URL from NEXT_PUBLIC_API_URL, defaulting to
 * https://doomsday-backend1.vercel.app. All helpers return parsed JSON
 * and throw ApiError on non-ok or unsuccessful responses.
 */

import type {
  ApiErrorResponse,
  ApiResult,
  ApiResponse,
  BookingQuoteResponse,
  Cinema,
  CreateCinemaInput,
  CreateMovieInput,
  Movie,
  RewatchOrderResponse,
  UpdateMovieInput,
} from "@/types";

const RAW_API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://doomsday-backend1.vercel.app";

const API_URL = RAW_API_URL.replace(/\/+$/, "");

export class ApiError extends Error {
  public readonly status: number;
  public readonly code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${API_URL}${normalizedPath}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    // Always fetch fresh data from the backend.
    cache: "no-store",
  });

  let body: unknown;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    const err = body as { message?: string; code?: string } | null;
    throw new ApiError(
      err?.message ?? `API request failed with status ${res.status}`,
      res.status,
      err?.code,
    );
  }

  return body as T;
}

function unwrap<T>(result: ApiResult<T>, fallbackStatus = 400): T {
  if (!result.success) {
    throw new ApiError(
      result.message,
      fallbackStatus,
      (result as ApiErrorResponse).code,
    );
  }

  if (result.data === undefined) {
    throw new ApiError("Response data is missing", fallbackStatus);
  }

  return result.data;
}

export const api = {
  /** GET /api/movies */
  getMovies: () => request<ApiResponse<Movie[]>>("/api/movies"),

  /** POST /api/movies */
  createMovie: (body: CreateMovieInput) =>
    request<ApiResponse<Movie>>("/api/movies", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /** PATCH /api/movies/:id */
  updateMovie: (id: string, body: UpdateMovieInput) =>
    request<ApiResponse<Movie>>(`/api/movies/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),

  /** GET /api/movies/:id/rewatch-order */
  getRewatchOrder: (id: string) =>
    request<ApiResponse<RewatchOrderResponse>>(
      `/api/movies/${encodeURIComponent(id)}/rewatch-order`,
    ),

  /** GET /api/cinemas */
  getCinemas: () => request<ApiResponse<Cinema[]>>("/api/cinemas"),

  /** POST /api/cinemas */
  createCinema: (body: CreateCinemaInput) =>
    request<ApiResponse<Cinema>>("/api/cinemas", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  /** GET /api/cinemas/:id/booking?groupSize=N */
  getBookingQuote: (id: string, groupSize: number) =>
    request<ApiResponse<BookingQuoteResponse>>(
      `/api/cinemas/${encodeURIComponent(id)}/booking?groupSize=${encodeURIComponent(String(groupSize))}`,
    ),
} as const;

/**
 * Typed convenience helpers used directly by UI components.
 */
export const moviesApi = {
  list: async (): Promise<Movie[]> => {
    const res = (await api.getMovies()) as ApiResult<Movie[]>;
    return unwrap(res);
  },
  create: async (body: CreateMovieInput): Promise<Movie> => {
    const res = (await api.createMovie(body)) as ApiResult<Movie>;
    return unwrap(res);
  },
  update: async (id: string, body: UpdateMovieInput): Promise<Movie> => {
    const res = (await api.updateMovie(id, body)) as ApiResult<Movie>;
    return unwrap(res);
  },
  rewatchOrder: async (id: string): Promise<RewatchOrderResponse> => {
    const res = (await api.getRewatchOrder(
      id,
    )) as ApiResult<RewatchOrderResponse>;
    return unwrap(res);
  },
};

export const cinemasApi = {
  list: async (): Promise<Cinema[]> => {
    const res = (await api.getCinemas()) as ApiResult<Cinema[]>;
    return unwrap(res);
  },
  create: async (body: CreateCinemaInput): Promise<Cinema> => {
    const res = (await api.createCinema(body)) as ApiResult<Cinema>;
    return unwrap(res);
  },
  bookingQuote: async (
    id: string,
    groupSize: number,
  ): Promise<BookingQuoteResponse> => {
    const res = (await api.getBookingQuote(
      id,
      groupSize,
    )) as ApiResult<BookingQuoteResponse>;
    return unwrap(res);
  },
};
