import { Suspense } from "react";
import { PageFallback } from "@/components/ui/PageFallback";
import HomeView from "@/components/home/homeView";

export default function HomePage() {
  return (
    <Suspense fallback={<PageFallback label="Loading watch-party hub..." />}>
      <HomeView />
    </Suspense>
  );
}
