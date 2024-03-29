import { HomeScreen, MainScreen } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainScreen>
      <Suspense fallback={<p>Loading feed...</p>}>
        <section className="pl-4 md:pl-6">
          <HomeScreen />
        </section>
      </Suspense>
    </MainScreen>
  );
}
