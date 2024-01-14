import { Columns, Toggle, MainScreen, MobileMenu } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainScreen>
      <Suspense fallback={<p>Loading feed...</p>}>
        <section className="pl-4 md:pl-6">
          <Columns />
        </section>
      </Suspense>
      <MobileMenu />
      {/* <Toggle /> */}
    </MainScreen>
  );
}
