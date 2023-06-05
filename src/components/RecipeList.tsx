import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/";
import { IngredientType } from "../types/Types";

type RecipeListProps = {
    availableIngredients: IngredientType[]
    recipes: SimplifiedRecipe[]
    onDeleteIngredient: (id: string) => void
    onUpdateIngredient: (id: string, label: string) => void
}
type SimplifiedRecipe = {
    title: string
    ingredients: IngredientType[]
    id: string
}


const RecipeList = ({
    availableIngredients,
    recipes
}: RecipeListProps) => {
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>([]);
    const [title, setTitle] = useState("");
    const [showAvailableRecipes, setShowAvailableRecipes] = useState(false);

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            return (
                (title === "" ||
                    recipe.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedIngredients.length === 0 ||
                    selectedIngredients.every(ingredient => recipe.ingredients.some(recipeIng => recipeIng.id === ingredient.id))) && (!showAvailableRecipes ||
                        recipe.ingredients.every((ing) => ing.isAvailable)
                )
            )
        })
    }, [title, selectedIngredients, recipes, showAvailableRecipes]);
    const [renderedRecipes, setRenderedRecipes] = useState<SimplifiedRecipe[]>(filteredRecipes);

    return (
        <>
            <form className="flex flex-wrap flex-col mb-3 gap-0 md:gap-2 md:flex-row justify-between items-start md:items-center " >
                <div className="">
                    <label className='text-left block font-semibold text-cyan-700'>Title</label>
                    <input className='form-inputs my-0.5 w-full py-1.5 border-2 ' type="text"
                        required
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="flex-grow w-full min-w-[15rem] md:max-w-[18rem]">
                    <label className='text-left font-semibold text-cyan-700'>Ingredients</label>
                    <ReactSelect
                        className="py-0.5 "
                        value={selectedIngredients.map(ing => {
                            return { label: ing.label, value: ing.id }
                        })}
                        options={availableIngredients?.map(ing => {
                            return { label: ing.label, value: ing.id }
                        })}
                        onChange={ingredients => {
                            setSelectedIngredients(ingredients.map(ingredient => {
                                return { label: ingredient.label, id: ingredient.value, isAvailable: false }
                            }))
                        }}
                        isMulti />
                </div>
                <div className="flex flex-col">
                    <label className='text-left block font-semibold text-cyan-700'>Show</label>
                    <div className="py-0.5">
                        <button type="button"
                            onClick={() => setShowAvailableRecipes(!showAvailableRecipes)}
                            className={`'h-9 w-32 ${showAvailableRecipes ? 'text-orange-500 border border-orange-500 hover:bg-orange-500' : 'text-emerald-500 border border-emerald-500 hover:bg-emerald-500'}  hover:text-white font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1ease-linear transition-all duration-150'`}>
                            {showAvailableRecipes ? 'All' : 'Available'}
                        </button>
                    </div>
                </div>
            </form>
            <div className="grid mb-8 gap-4 md:grid-cols-2">
                {recipes && filteredRecipes?.map(recipe => (
                    <RecipeCard id={recipe.id} key={recipe.id} title={recipe.title} ingredients={recipe.ingredients} />
                ))}

            </div>
        </>);
};

const RecipeCard = ({ id, title, ingredients }: SimplifiedRecipe) => {
    const isRecipeAvailable = ingredients.every((ing) => ing.isAvailable)
    return <Link to={`recipes/${id}`} className="border-2 border-gray-50 hover:shadow-md flex flex-col text-center py-3 px-4 ">
        <div key={id} >
            <h2 className='text-cyan-600 text-xl font-medium mb-2'>{title}</h2>
            <div className="flex justify-center flex-wrap gap-0.5">{ingredients && ingredients.map((ingredient) => (
                <span key={ingredient.id} className={`${ingredient.isAvailable ? "bg-emerald-600" : "bg-orange-600"}  text-orange-100 text-xs font-medium px-2.5 py-0.5 rounded`}>{ingredient.label}</span>)
            )}</div>
        </div >
    </Link >

}


export default RecipeList;
