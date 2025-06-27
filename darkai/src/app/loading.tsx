export default function Loading() {
    console.log('loading...')
    return(
        <div className="w-[100vw] h-[100vh] flex flex-col justify-center align-center">
            <span className="loader mb-8 inline-block mx-auto"></span>
            <h2 className="text-gray-50 mx-auto">
                Loading...
            </h2>
        </div>
    )
}