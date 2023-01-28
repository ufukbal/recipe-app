import { RecipeData, Tag } from "./App";
import RecipeForm from "./RecipeForm";
import { useRecipe } from "./RecipeLayout";

type EditRecipeProps = {
    onSubmit: (id: string, data: RecipeData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}
const EditRecipe = ({ onSubmit, onAddTag, availableTags }: EditRecipeProps) => {
    const recipe = useRecipe();
    return <div><RecipeForm
        title={recipe.title}
        body={recipe.body}
        tags={recipe.tags}
        onSubmit={data => onSubmit(recipe.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags} />
    </div>;
};

export default EditRecipe;
