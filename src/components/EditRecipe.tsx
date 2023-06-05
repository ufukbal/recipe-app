import { RecipeData, IngredientType } from "../types/Types";
import RecipeForm from "./RecipeForm";
import { useRecipe } from "./RecipeLayout";

type EditRecipeProps = {
    onSubmit: (id: string, data: RecipeData) => void
    onAddIngredient: (ingredient: IngredientType) => void
    availableIngredients: IngredientType[]
    onUpdateIngredient: (id: string, label: string, isAvailable: boolean) => void
}
const EditRecipe = ({ onSubmit, onAddIngredient, availableIngredients, onUpdateIngredient }: EditRecipeProps) => {
    const recipe = useRecipe();
    return <div><RecipeForm
        title={recipe.title}
        body={recipe.body}
        ingredients={recipe.ingredients}
        onSubmit={data => onSubmit(recipe.id, data)}
        onAddIngredient={onAddIngredient}
        availableIngredients={availableIngredients}
        onUpdateIngredient={onUpdateIngredient}
    />
    </div>;
};

export default EditRecipe;
