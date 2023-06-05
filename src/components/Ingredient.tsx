import { useEffect, useState } from "react";
import { IngredientType } from "../types/Types";

type IngredientsProps = {
    ingredient: IngredientType
    onDeleteIngredient: (id: string) => void
    onUpdateIngredient: (id: string, label: string, isAvailable: boolean) => void
    isLabelEditable?: boolean
}

const Ingredient = ({ ingredient, onUpdateIngredient, onDeleteIngredient, isLabelEditable }: IngredientsProps) => {
    const [ingredientLabel, setIngredientLabel] = useState(ingredient.label);
    const [focus, setFocus] = useState(false);
    const [isAvailable, setIsAvailable] = useState(ingredient.isAvailable);
    const onSave = () => {
        onUpdateIngredient(ingredient.id, ingredientLabel, isAvailable)
    }
    useEffect(() => {
        onSave();
    }, [isAvailable]);

    return <div className="flex justify-between items-center gap-1">
        <input type="checkbox"
            className="accent-emerald-600"
            checked={isAvailable}
            onChange={() => setIsAvailable((prevState: boolean) => (!prevState))} />

        <input disabled={!isLabelEditable} className=' focus:outline-none focus:border-spacing-1 focus:border-orange-200 focus:ring-1 focus:ring-orange-200 px-1 py-0.5 mx-0 my-0.5 border-2 border-gray-100 box-border block w-full' type="text"
            required
            name="title"
            value={ingredientLabel}
            onChange={e => setIngredientLabel(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
        />

        {focus && <button type="button" disabled={ingredientLabel === ingredient.label} className="bg-orange-600 text-orange-100 text-xs font-medium px-1 rounded disabled:bg-orange-500 disabled:cursor-not-allowed disabled:opacity-75"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onSave}>
            Save
        </button>}
        <button type="button" className="bg-orange-600 text-orange-100 text-xs font-medium px-1 rounded"
            onClick={() => onDeleteIngredient(ingredient.id)}>
            X
        </button>
    </div>
};

export default Ingredient;
