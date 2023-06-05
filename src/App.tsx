import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import NewRecipe from './components/NewRecipe'
import { v4 as uuidV4 } from "uuid"
import useFetch from './hooks/useFetch'
import RecipeList from './components/RecipeList'
import { Dispatch, useMemo } from 'react'
import RecipeLayout from './components/RecipeLayout'
import RecipeDetail from './components/RecipeDetail'
import EditRecipe from './components/EditRecipe'
import EditIngredients from './components/EditIngredients'
import { IngredientType, RawRecipe, RecipeData } from './types/Types'

function App() {
  let { error, isLoading, data: ingredients, setData: setIngredients }: { error: string | null, isLoading: boolean, data: IngredientType[], setData: Dispatch<any> } = useFetch('http://localhost:8001/ingredients')
  let { isLoading: recipesLoading, data: recipes, setData: setRecipes }: { error: string | null, isLoading: boolean, data: RawRecipe[], setData: Dispatch<any> } = useFetch('http://localhost:8001/recipes')

  const recipesWithIngredients = useMemo(() => {
    return recipes?.map(recipe => {
      return { ...recipe, ingredients: ingredients.filter(ingredient => recipe.ingredientIds.includes(ingredient.id)) }
    })
  }, [recipes, ingredients])

  const onCreateRecipes = async ({ ...data }: RecipeData) => {
    const newRecipe = {
      title: data.title, body: data.body, id: uuidV4(), ingredientIds: data.ingredients.map(ingredient => ingredient.id)
    }
    const ids = new Set(ingredients.map(d => d.id));
    var merged = [...ingredients, ...data.ingredients.filter(d => !ids.has(d.id))];
    setIngredients(merged)
    try {
      const response = await fetch('http://localhost:8001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });
      const data = await response.json();
      setRecipes([...recipes, data]);
    }
    catch (err) {
      console.log(err);
    }
  }
  const onUpdateRecipes = async (id: string, { ...data }: RecipeData) => {
    const edittedRecipe = {
      body: data.body, id: id, ingredientIds: data.ingredients.map(ingredient => ingredient.id)
    }
    const ids = new Set(ingredients.map(d => d.id));
    var merged = [...ingredients, ...data.ingredients.filter(d => !ids.has(d.id))];
    setIngredients(merged)
    try {
      const response = await fetch('http://localhost:8001/recipes/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edittedRecipe)
      });
      const data = await response.json();
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
