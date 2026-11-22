import { Suspense } from "react";

import { PageFallback } from "@/components/ui/PageFallback";
import MovieView from "@/components/movies/movieView";

export default function MoviesPage() {
  return (
    <Suspense fallback={<PageFallback label="Loading movies catalog..." />}>
      <MovieView />
    </Suspense>
  );
}
