import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { RecipeData, IngredientType } from "../types/Types";
import { v4 as uuidV4 } from "uuid"
import Ingredient from "./Ingredient";

type RecipeFormProps = {
    onSubmit: (data: RecipeData) => void
    onAddIngredient: (ingredient: IngredientType) => void
    availableIngredients: IngredientType[]
    onUpdateIngredient: (id: string, label: string, isAvailable: boolean) => void
} & Partial<RecipeData>

const RecipeForm = ({ onSubmit, onAddIngredient, availableIngredients, title = "", body = "", ingredients = [], onUpdateIngredient }: RecipeFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>(ingredients);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            ingredients: selectedIngredients
        })
        navigate("/");
    }

    const onNewRecipeDeleteIngredient = (id: string) => {
        setSelectedIngredients((prevIngredients: IngredientType[]) => {
            return prevIngredients.filter(ingredient => ingredient.id !== id)
        })

    }
    return <div className="max-w-md mx-auto my-0 text-center">
        <h2 className='text-xl'>Create New Recipe</h2>

        <form onSubmit={handleSubmit}>
            <label className='text-left block'>Recipe Title:</label>
            <input className='form-inputs w-full ' type="text" ref={titleRef}
                required
                name="title"
                defaultValue={title}
            />
            <label className='text-left block'>Description:</label>
            <textarea
                ref={bodyRef}
                className='form-inputs w-full '
                required
                name="body"
                defaultValue={body}
            />
            <label className='text-left block'>Ingredients:</label>
            <CreatableReactSelect
                controlShouldRenderValue={false}
                placeholder="Select or Type..."
                value={selectedIngredients.map(ingredient => {
                    return { label: ingredient.label, value: ingredient.id, isAvailable: ingredient.isAvailable }
                })}
                options={availableIngredients.map(ingredient => {
                    return { label: ingredient.label, value: ingredient.id, isAvailable: ingredient.isAvailable }
                })}
                onCreateOption={label => {
                    const newIngredient = { id: uuidV4(), label, isAvailable: false }
                    onAddIngredient(newIngredient);
                    setSelectedIngredients(prev => [...prev, newIngredient])
                }}
                onChange={ingredients => {
                    setSelectedIngredients(ingredients.map(ingredient => {
                        return { label: ingredient.label, id: ingredient.value, isAvailable: ingredient.isAvailable }
                    }))
                }}
                isMulti />
            {selectedIngredients?.map((ingredient) => (
                <Ingredient key={ingredient.id} ingredient={ingredient} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onNewRecipeDeleteIngredient} />
            ))}
            <div className="flex gap-2 justify-center mt-2">
                <button type="submit" className='bg-teal-400 text-white p-2 rounded-lg shadow hover:shadow-md'>Create</button>
                <Link to="..">
                    <button type="button" className='bg-orange-400 text-white p-2 rounded-lg shadow hover:shadow-md'>Cancel</button>
                </Link>
            </div>
        </form>
    </div >;
};

export default RecipeForm;
