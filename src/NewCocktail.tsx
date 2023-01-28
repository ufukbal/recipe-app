import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { Ingredient as IngredientType } from './APIResponsesTypes';
import Ingredient from './components/Ingredient';

const NewCocktail = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('guest');
    const [checked, setChecked] = useState(false);
    const [ingredients, setIngredients] = useState<IngredientType[]>([]);
    const [ingredientName, setIngredientName] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const cocktail = { title, body, author, ingredients };
        console.log(checked);
        setIsLoading(true);
        fetch('http://localhost:8001/cocktails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktail)
        }).then(() => {
            setIsLoading(false);
            navigate('/');
        }).catch(err => console.log(err));
    }

    const handleDelete = (index: number) => {
        setIngredients((prevState) => prevState.filter((item) => item !== ingredients[index]))
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

    return (
        <div className="max-w-md mx-auto my-0 text-center">
            <h2 className='text-xl'>Create New Cocktail</h2>

            <form onSubmit={handleSubmit}>
                <label className='text-left block'>Cocktail Title:</label>
                <input className='form-inputs' type="text"
                    required
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label className='text-left block'>Cocktail Body:</label>
                <textarea
                    className='form-inputs'
                    required
                    name="body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <label className='text-left block'>Cocktail Author</label>
                <select
                    className='form-inputs'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="ufuk">Ufuk</option>
                    <option value="elif">Elif</option>
                    <option value="guest">Guest</option>
                </select>
                <>
                    <label>
                        Ingredients
                    </label>
                    <ul className='flex flex-col flex-wrap justify-between mb-5'>
                        {ingredients &&
                            ingredients.map((ingredient, index) => (
                                <Ingredient
                                    key={index}
                                    isEditable={true}
                                    index={index}
                                    ingredient={ingredient}
                                    handleDelete={handleDelete}
                                    handleAvailable={handleIngredientAvailable}
                                    handleName={handleIngredientName}
                                />
                            ))
                        }
                    </ul>
                    <div className='flex my-3'>
                        <input type="checkbox" checked={checked}
                            onChange={() => setChecked(!checked)
                            } />
                        <input className='ml-4 border-gray-100 border-2 box-border' type="text"
                            name="ingredient"
                            value={ingredientName}
                            onChange={(e) => setIngredientName(e.target.value)}
                        />
                        <button type="button" disabled={!ingredientName} className='bg-teal-400 text-white p-1 ml-2 rounded-lg disabled:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed'
                            onClick={() => {
                                setIngredients([...ingredients, { ingredient: ingredientName, isAvailable: checked }]);
                                setIngredientName('');
                                setChecked(false);
                            }}>
                            Add
                        </button>
                    </div>


                </>
                {!isLoading && <button type="submit" className='bg-teal-400 text-white p-2 rounded-lg'>Add Cocktail</button>}
                {isLoading && <button disabled>Adding...</button>}

            </form>
        </div >
    )
}

export default NewCocktail