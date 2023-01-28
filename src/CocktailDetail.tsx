import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Cocktail } from './APIResponsesTypes';
import Ingredient from './components/Ingredient';
import { Ingredient as IngredientType } from './APIResponsesTypes';
import useFetch from "./useFetch";

const CocktailDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { error, isLoading, data: cocktail }: { error: string | null, isLoading: boolean, data: Cocktail } = useFetch('http://localhost:8001/cocktails/' + id);
    // const handleDelete = () => {
    //     fetch('http://localhost:8000/cocktails/' + id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         navigate('/');
    //     }
    //     ).catch(err => console.log(err));
    // }
    //async delete cocktail with catch error
    const [isEditable, setIsEditable] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [isEditLoading, setIsEditLoading] = useState(false);
    useEffect(() => {
        if (cocktail) {
            setIngredients(cocktail.ingredients);
        }
    }, [cocktail]);

    const handleDelete = async () => {
        try {
            await fetch('http://localhost:8001/cocktails/' + id, {
                method: 'DELETE'
            });
            navigate('/');
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleEdit = async () => {
        setIsEditable((prevState) => (!prevState))
        if (isEditable) {
            setIngredients(cocktail.ingredients);
        }
    }
    const handleIngredientName = (e, i) => {
        setIngredients(ingredients.map((ing, index) => {
            if (index === i) {
                return { ...ing, ingredient: e.target.value };
            } else {
                return ing;
            }
        }))
    }
    const handleIngredientAvailable = (i: number) => {
        setIngredients(ingredients.map((ing, index) => {
            if (index === i) {
                return { ...ing, isAvailable: !ing.isAvailable };
            } else {
                return ing;
            }
        }))
    }
    const handleSubmit = () => {
        const edittedCoktail: Cocktail = { id: cocktail.id, title: cocktail.title, body: cocktail.body, author: cocktail.author, ingredients: ingredients };
        setIsEditLoading(true);
        fetch('http://localhost:8001/cocktails/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(edittedCoktail)
        }).then(() => {
            setIsEditLoading(false);
            setIsEditable(false);
        }).catch(err => console.log(err));
    }


    return (<div className="cocktail-details">
        <div className="home">
            {error && <p>{error}</p>}
            {isLoading && <div>Loading...</div>}
            {cocktail &&
                <article className='py-3 px-4'>
                    <h2 className='text-cyan-600 text-xl font-medium mb-2'>{cocktail.title}</h2>
                    <ul className='flex flex-col flex-wrap justify-between mb-5 ml-8'>
                        {ingredients &&
                            ingredients.map((ingredient, index) =>
                                <Ingredient
                                    key={index}
                                    isEditable={isEditable}
                                    index={index}
                                    ingredient={ingredient}
                                    handleDelete={handleDelete}
                                    handleName={handleIngredientName}
                                    handleAvailable={handleIngredientAvailable} />
                            )}
                    </ul>

                    <button className='bg-red-400 text-xs text-white p-2 rounded-lg' onClick={handleDelete}>Delete</button>
                    <button className='bg-orange-400 text-xs text-white p-2 ml-2 rounded-lg' onClick={handleEdit}>{isEditable ? 'Cancel' : 'Edit'}</button>
                    <button className='bg-green-400 text-xs text-white p-2 ml-2 rounded-lg' onClick={handleSubmit}>Submit</button>

                </article>}
        </div>
    </div>);
}

export default CocktailDetails;