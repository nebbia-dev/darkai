'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import Loading from "@/app/loading";
import {Suspense} from "react";

export default function Home() {

  return (
      <>
          <div className="w-[60vw] h-[100vh]">
              <Scene/>
          </div>
          <Selection/>
      </>
  );
}
