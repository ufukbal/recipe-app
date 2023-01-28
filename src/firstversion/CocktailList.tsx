import { Link } from 'react-router-dom';
import { Cocktail } from './APIResponsesTypes';

const CocktailList = ({ cocktails }: { cocktails: Cocktail[] }) => {

    return (
        <div>
            {cocktails.map(cocktail => (

                <div className="py-3 px-4 border-b-2 border-gray-50 hover:shadow-md" key={cocktail.id} >
                    <Link to={`/cocktails/${cocktail.id}`}>
                        <h2 className='text-cyan-600 text-xl font-medium mb-2'>{cocktail.title}</h2>
                        {cocktail.ingredients && cocktail.ingredients.every(v => v.isAvailable === true) ? <p>Available</p> : <p>Not Available</p>}

                        <p>Written by {cocktail.author}</p>
                    </Link>
                </div>


            ))}
        </div>
    );
}

export default CocktailList;