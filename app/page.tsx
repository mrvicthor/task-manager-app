// import { HomeScreen, MainScreen } from "@/components";
import HomeScreen from "../components/Home";
import MainScreen from "../components/MainScreen";
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
