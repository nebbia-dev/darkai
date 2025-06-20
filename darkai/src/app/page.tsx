'use client'
import Scene from "@/app/components/Scene";
import Selection from "@/app/components/Selection";

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
