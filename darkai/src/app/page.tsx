'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense} from "react";
import Loading from "@/app/components/Loading";
import ActionBar from "@/app/components/ActionBar";

export default function Home() {

  return (
      <>
          <Suspense fallback={<Loading/>}>
              <div className="w-[50vw]">
                  <Scene/>
                  <ActionBar/>
              </div>
              <div className="w-[50vw]">
                  <Selection/>
              </div>
          </Suspense>
      </>
);
}
