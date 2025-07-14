'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";
import {Suspense, useEffect, useState} from "react";
import Loading from "@/app/components/Loading";
import ActionBar from "@/app/components/ActionBar";
import {useTeethStore} from "@/app/stores/teeth";

export default function Home() {
    const ui = useTeethStore((state) => state.ui);
    const setUI = useTeethStore((state) => state.setUI);
    const loaded = useTeethStore((state) => state.loaded);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setTimeout(() => setIsMounted(true), 100);
    });

    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            const height = window.innerHeight;

            if(height > width) {
                setUI(true);
            } else {
                setUI(false);
            }
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if(!isMounted) return <Loading/>

      return (
            <div className={`flex ${!ui ? 'flex-row' : 'flex-col'} w-[100vw] mx-auto bg-gray-50 relative`}>
                  {/*<button className="absolute top-4 left-4 text-white bg-black rounded-[50%] h-12 w-12 cursor-pointer font-bold z-30" onClick={setUI}>UI</button>*/}

                <div className={`relative ${!ui ? 'w-[50vw] h-[calc(100vh-54px)]' : 'w-full h-[60vh]'}`}>
                    <Suspense fallback={<Loading/>}>
                          <Scene/>
                    </Suspense>
                        {loaded && <ActionBar ui={ui}/>}
                </div>
                      <div className={`${!ui ? 'w-[50vw] h-[calc(100vh-54px)]' : 'w-full h-[calc(40vh-54px)]'}`}>
                          {loaded && <Selection ui={ui}/>}
                      </div>
              </div>
      );
}
