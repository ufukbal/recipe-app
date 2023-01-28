import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom";
import { Recipe } from "./App";

type RecipeLayoutProps = {
    recipes: Recipe[];
}
const RecipeLayout = ({ recipes }: RecipeLayoutProps) => {
    const { id } = useParams();
    const recipe = recipes.find(r => r.id === id);
    if (recipe == null) return <Navigate to="/" replace />

    return <Outlet context={recipe} />;
};


export const useRecipe = () => {
    return useOutletContext<Recipe>()
}

export default RecipeLayout;
