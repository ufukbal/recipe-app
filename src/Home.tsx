import { Cocktail } from "./APIResponsesTypes";
import CocktailList from "./CocktailList";
import useFetch from "./useFetch";

const Home = () => {
    const { error, isLoading, data: cocktails }: { error: string | null, isLoading: boolean, data: Cocktail[] } = useFetch('http://localhost:8001/cocktails')

    return (
        <div className="home">
            {error && <p>{error}</p>}
            {isLoading && <div>Loading...</div>}
            {cocktails && <CocktailList cocktails={cocktails} />}
        </div>
    );
}

export default Home;