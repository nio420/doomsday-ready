/**
 * Domain types aligned exactly with the Doomsday Ready backend API.
 * Backend source: /d/doomsday-ready/backend/src
 */

export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  runtimeMinutes: number;
  watched: boolean;
  prerequisites?: Movie[];
  requiredBy?: Movie[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateMovieInput {
  title: string;
  releaseYear: number;
  runtimeMinutes: number;
  watched?: boolean;
  prerequisites?: string[];
}

export interface UpdateMovieInput {
  title?: string;
  releaseYear?: number;
  runtimeMinutes?: number;
  watched?: boolean;
  prerequisites?: string[];
}

export interface RewatchOrderMovie {
  id: string;
  title: string;
  runtimeMinutes: number;
  watched: boolean;
}

export interface RewatchOrderResponse {
  movieId: string;
  prerequisites: RewatchOrderMovie[];
  watchedCount: number;
  unwatchedRuntimeMinutes: number;
}

export interface Cinema {
  id: string;
  name: string;
  bundleSizes: number[];
  createdAt: string;
  updatedAt: string;
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

export interface Booking {
  id: string;
  cinemaId: string;
  groupSize: number;
  movieId?: string;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: string;
}

export interface CreateBookingInput {
  cinemaId: string;
  groupSize: number;
  movieId?: string;
}

/**
 * Standard API response envelopes used by the backend.
 * Success:  { success: true, message: string, data?: T }
 * Error:    { success: false, message: string, code?: string }
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  code?: string;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: PaginationMeta;
}
