import React from "react";
import { RecipeData, Tag } from "./App";
import RecipeForm from "./RecipeForm";

type NewRecipeProps = {
    onSubmit: (data: RecipeData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}
const NewRecipe = ({ onSubmit, onAddTag, availableTags }: NewRecipeProps) => {
    return <div><RecipeForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags} /></div>;
};

export default NewRecipe;
