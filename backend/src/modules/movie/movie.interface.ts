export interface Movie {
  id: string;
  title: string;
  releaseYear: number;
  runtimeMinutes: number;
  watched: boolean;
  prerequisites?: Movie[];
  requiredBy?: Movie[];
  createdAt: Date;
  updatedAt: Date;
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
