import { Suspense } from "react";
import { PageFallback } from "@/components/ui/PageFallback";
import BookingView from "@/components/booking/bookingView";

export default function BookingPage() {
  return (
    <Suspense fallback={<PageFallback label="Loading group booking..." />}>
      <BookingView />
    </Suspense>
  );
}
