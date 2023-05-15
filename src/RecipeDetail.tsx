import { Link, useNavigate } from "react-router-dom";
import { useRecipe } from "./RecipeLayout";

type RecipeDetailProps = {
    onDelete: (id: string) => void
}
const RecipeDetail = ({ onDelete }: RecipeDetailProps) => {
    const recipe = useRecipe()
    const navigate = useNavigate();

    return <div className="cocktail-details">
        <div className="home">
            {
                <article className='py-3 px-4'>
                    <div className="flex justify-between flex-wrap items-center ">
                        <h2 className='text-cyan-600 text-xl font-medium mb-2 '>{recipe.title}</h2>

                        <div className="flex gap-2 justify-center">
                            <Link to={'edit'} >
                                <button type="submit" className='bg-cyan-500 text-white font-bold text-md px-2 py-0.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                                    Edit
                                </button>
                            </Link>
                            <button onClick={() => {
                                onDelete(recipe.id);
                                navigate("/");
                            }} type="button" className=' text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white font-bold text-md px-2 py-0.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                                Delete
                            </button>
                            <Link to="/">
                                <button type="button" className="text-stone-500 border border-stone-500 hover:bg-stone-500 hover:text-white active:bg-stone-600 font-bold text-md px-2 py-0.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                    Back
                                </button>
                            </Link>
                        </div>
                    </div>
                    <ul className='flex flex-row flex-wrap mb-5 max-w-xs gap-1'>
                        {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                            <span className={`${ingredient.isAvailable ? "bg-emerald-600" : "bg-orange-600"}  text-orange-100 text-xs font-medium px-2.5 py-0.5 rounded`}>{ingredient.label}</span>)
                        )}
                    </ul>

                    <div>{recipe.body}</div>
                </article>}
        </div>
    </div>;
};

export default RecipeDetail;
