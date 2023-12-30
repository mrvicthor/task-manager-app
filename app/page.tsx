import { Boards, Toggle, MainScreen } from "@/components";
import { Suspense } from "react";

export default function Home() {
  return (
    <MainScreen>
      <Suspense fallback={<p>Loading feed...</p>}>
        <Boards />
      </Suspense>
      <Toggle />
    </MainScreen>
  );
}
