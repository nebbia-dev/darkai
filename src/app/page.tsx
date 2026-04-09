import fetchPrices from "@/app/_helpers/_db-interactions/fetchPrices";
import Configurator from "@/app/_components/_layout/Configurator";

export default async function Home() {
    const prices = await fetchPrices();

    return (
            <Configurator fetchedPrices={prices}/>
    );
}
