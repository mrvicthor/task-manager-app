import { Columns, Toggle, MainScreen } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainScreen>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Columns />
      </Suspense>
      <Toggle />
    </MainScreen>
  );
}
