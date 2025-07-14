export default function Loading() {

    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center align-center absolute z-30">
            <span className="loader mb-8 inline-block mx-auto"></span>
            <h2 className="text-gray-950 mx-auto">
                Loading...
            </h2>
        </div>
    )
}