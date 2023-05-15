import { Link, useNavigate } from "react-router-dom"
import { IngredientType } from "./Types"
import Ingredient from "./Ingredient"
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid"

type EditIngredientsProps = {
    availableIngredients: IngredientType[]
    onDeleteIngredient: (id: string) => void
    onUpdateIngredient: (id: string, label: string) => void
    onAddIngredient: (ingredient: IngredientType) => void
}


const EditIngredients = ({ availableIngredients, onUpdateIngredient, onDeleteIngredient, onAddIngredient }: EditIngredientsProps) => {
    const navigate = useNavigate();

    return (
        <>
            <h2 className="text-xl text-center font-medium">Ingredients</h2>
            <div className="relative p-6 flex-auto">
                {availableIngredients.map(ingredient => (<Ingredient key={ingredient.id} ingredient={ingredient} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onDeleteIngredient} isLabelEditable />))}
            </div>
            <h3 className="text-xl font-medium px-6 mb-3">New Ingredient</h3>

            <CreatableReactSelect
                className="mb-2 px-6"
                controlShouldRenderValue={false}
                placeholder="Add..."
                noOptionsMessage={() => 'Name your new ingredient'}
                onCreateOption={label => {
                    const newIngredient = { id: uuidV4(), label, isAvailable: false }
                    onAddIngredient(newIngredient);
                }}
            />
            <div className="flex justify-center">
                <Link to="/">
                    <button type="button" className="text-stone-500 border border-stone-500 hover:bg-stone-500 hover:text-white active:bg-stone-600 font-bold text-md px-2 py-0.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                        Back
                    </button>
                </Link>
            </div>
        </>
    )
}

export default EditIngredients;
