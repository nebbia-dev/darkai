'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense} from "react";
import Loading from "@/app/components/Loading";

export default function Home() {

  return (
      <>
          <Suspense fallback={<Loading/>}>
              <div className="w-[50vw]">
                  <Scene/>
              </div>
              <div className="w-[50vw]">
                  <Selection/>
              </div>
          </Suspense>
      </>
);
}
