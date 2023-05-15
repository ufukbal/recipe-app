import { RecipeData, IngredientType } from "./Types";
import RecipeForm from "./RecipeForm";

type NewRecipeProps = {
    onSubmit: (data: RecipeData) => void
    onAddIngredient: (ingredient: IngredientType) => void
    availableIngredients: IngredientType[]
    onUpdateIngredient: (id: string, label: string) => void
}
const NewRecipe = ({ onSubmit, onAddIngredient, availableIngredients, onUpdateIngredient }: NewRecipeProps) => {
    return <div><RecipeForm onSubmit={onSubmit} onAddIngredient={onAddIngredient} availableIngredients={availableIngredients} onUpdateIngredient={onUpdateIngredient} /></div>;
};

export default NewRecipe;
