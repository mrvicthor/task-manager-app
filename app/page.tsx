import { Columns, Toggle, MainScreen, MobileMenu } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainScreen>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Columns />
      </Suspense>
      <MobileMenu />
      <Toggle />
    </MainScreen>
  );
}
