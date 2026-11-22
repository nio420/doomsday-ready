import { Suspense } from "react";
import { PageFallback } from "@/components/ui/PageFallback";
import RewatchPlanView from "@/components/rewatch/rewatchPlanView";

export default function RewatchPlanPage() {
  return (
    <Suspense fallback={<PageFallback label="Loading rewatch planner..." />}>
      <RewatchPlanView />
    </Suspense>
  );
}
