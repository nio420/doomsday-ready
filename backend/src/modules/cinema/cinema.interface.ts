export interface Cinema {
  id: string;
  name: string;
  bundleSizes: number[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCinemaInput {
  name: string;
  bundleSizes: number[];
}

export interface BundleAllocation {
  bundleSize: number;
  count: number;
}

export interface BookingQuoteResponse {
  cinemaId: string;
  possible: boolean;
  groupSize: number;
  totalBundles: number;
  bundles: BundleAllocation[];
  message?: string;
}
