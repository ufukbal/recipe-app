import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './Navbar'
import NewRecipe from './NewRecipe'
import { v4 as uuidV4 } from "uuid"
import useFetch from './useFetch'
import RecipeList from './RecipeList'
import { Dispatch, useMemo } from 'react'
import RecipeLayout from './RecipeLayout'
import RecipeDetail from './RecipeDetail'
import EditRecipe from './EditRecipe'
import EditIngredients from './EditIngredients'
import { IngredientType, RawRecipe, RecipeData } from './Types'

function App() {
  const { error, isLoading, data: ingredients, setData: setIngredients }: { error: string | null, isLoading: boolean, data: IngredientType[], setData: Dispatch<any> } = useFetch('http://localhost:8001/ingredients')
  let { isLoading: recipesLoading, data: recipes, setData: setRecipes }: { error: string | null, isLoading: boolean, data: RawRecipe[], setData: Dispatch<any> } = useFetch('http://localhost:8001/recipes')

  const recipesWithIngredients = useMemo(() => {
    console.log(recipes);
    return recipes?.map(recipe => {
      return { ...recipe, ingredients: ingredients.filter(ingredient => recipe.ingredientIds.includes(ingredient.id)) }
    })
  }, [recipes, ingredients])

  const onCreateRecipes = async ({ ingredients, ...data }: RecipeData) => {
    const newRecipe = {
      ...data, id: uuidV4(), ingredientIds: ingredients.map(ingredient => ingredient.id)
    }
    try {
      const response = await fetch('http://localhost:8001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });
      const data = await response.json();
      console.log(data);
      setRecipes([...recipes, data]);
    }
    catch (err) {
      console.log(err);
    }
  }
  const onUpdateRecipes = async (id: string, { ingredients, ...data }: RecipeData) => {
    const edittedRecipe = {
      ...data, id: id, ingredientIds: ingredients.map(ingredient => ingredient.id)
    }
    try {
      const response = await fetch('http://localhost:8001/recipes/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edittedRecipe)
      });
      const data = await response.json();
      console.log(data);
      setRecipes(recipes.map(recipe => {
        if (recipe.id === id) {
          return edittedRecipe;
        } else {
          return recipe;
        }
      }));
    }
    catch (err) {
      console.log(err);
    }
  }

  const addIngredient = async (ingredient: IngredientType) => {
    const newIngredient = { ...ingredient }
    try {
      const response = await fetch('http://localhost:8001/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newIngredient)
      });
      const data = await response.json();
      setIngredients([...ingredients, data]);
    }
    catch (err) {
      console.log(err);
    }
  }

  const onUpdateIngredient = async (id: string, label: string, isAvailable: boolean) => {
    const edittedIngredient = {
      id: id, label: label, isAvailable: isAvailable
    }
    try {
      const response = await fetch('http://localhost:8001/ingredients/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edittedIngredient)
      });
      const data = await response.json();
      console.log(data);
      setIngredients(ingredients.map(ingredient => {
        if (ingredient.id === id) {
          return edittedIngredient;
        } else {
          return ingredient;
        }
      }));
    }
    catch (err) {
      console.log(err);
    }
  }
  const onDeleteIngredient = async (id: string) => {
    try {
      const response = await fetch('http://localhost:8001/ingredients/' + id, {
        method: 'DELETE'
      });
      const data = await response.json();
      setIngredients((prevIngs: IngredientType[]) => {
        return prevIngs.filter(ingredient => ingredient.id !== id)
      })

    }
    catch (err) {
      console.log(err);
    }
  }

  const onDeleteRecipe = async (id: string) => {
    try {
      const response = await fetch('http://localhost:8001/recipes/' + id, {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
      setRecipes((prevState: RawRecipe[]) => {
        return prevState.filter(recipe => recipe.id !== id)
      })

    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <div className=''>
      <Navbar />
      {!recipesLoading && <div className='my-4 mx-auto max-w-2xl p-5'>
        <Routes>
          <Route path="/" element={<RecipeList availableIngredients={ingredients} recipes={recipesWithIngredients} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onDeleteIngredient} />} />
          <Route path="/create" element={<NewRecipe onSubmit={onCreateRecipes} onAddIngredient={addIngredient} availableIngredients={ingredients} onUpdateIngredient={onUpdateIngredient} />} />
          <Route path="recipes/:id" element={<RecipeLayout recipes={recipesWithIngredients} />}>
            <Route index element={<RecipeDetail onDelete={onDeleteRecipe} />} />
            <Route path="edit" element={<EditRecipe onSubmit={onUpdateRecipes} onAddIngredient={addIngredient} availableIngredients={ingredients} onUpdateIngredient={onUpdateIngredient} />} />
          </Route>
          <Route path="/ingredients" element={<EditIngredients availableIngredients={ingredients} onAddIngredient={addIngredient} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onDeleteIngredient} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>}
    </div>
  )
}

export default App
