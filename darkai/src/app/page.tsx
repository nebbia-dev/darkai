import Scene from "@/app/components/Scene";

export default function Home() {
  return (
      <>
        <div className="w-[60vw] h-[100vh]">
          <Scene/>
        </div>
        <div className="w-[40vw] h-[90vh] flex flex-col align-center justify-center text-center bg-white my-auto rounded text-black">
          <p>Welcome to the DARKAI Grillz Configurator</p>
            <p>Choose the grillz perfect for you!</p>
        </div>
      </>
  );
}
