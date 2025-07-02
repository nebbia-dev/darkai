'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense, useState} from "react";
import Loading from "@/app/components/Loading";
import ActionBar from "@/app/components/ActionBar";

export default function Home() {
    const [ui, setUi] = useState<boolean>(false);
      return (
          <div className={`flex ${!ui ? 'flex-row' : 'flex-col'} w-[100vw] mx-auto bg-gray-50 relative`}>
              <button className="absolute top-4 left-4 text-white bg-black rounded-[50%] h-12 w-12 cursor-pointer font-bold z-30" onClick={() => setUi((prev) => !prev)}>UI</button>
              <Suspense fallback={<Loading/>}>
                  <div className={`${!ui ? 'w-[50vw]' : 'w-full h-[70vh]'}`}>
                      <Scene/>
                      <ActionBar/>
                  </div>
                  <div className={`${!ui ? 'w-[50vw]' : 'w-full h-[calc(30vh-54px)]'}`}>
                      <Selection ui={ui}/>
                  </div>
              </Suspense>
          </div>
      );
}
