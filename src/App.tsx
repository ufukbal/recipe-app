import { Routes, Route, Navigate } from 'react-router-dom'
import CocktailDetail from './CocktailDetail'
import Home from './Home'
import Navbar from './Navbar'
import NewRecipe from './NewRecipe'
import { v4 as uuidV4 } from "uuid"
import useFetch from './useFetch'
import RecipeList from './RecipeList'
import { Dispatch, useMemo } from 'react'
import RecipeLayout from './RecipeLayout'
import RecipeDetail from './RecipeDetail'
import EditRecipe from './EditRecipe'
export type Recipe = {
  id: string
} & RecipeData

export type RawRecipe = {
  id: string
} & RawRecipeData

export type RawRecipeData = {
  title: string
  body: string
  tagIds: string[]
}

export type RecipeData = {
  title: string
  body: string
  tags: Tag[]
}

export type Tag = {
  id: string
  label: string
}

function App() {
  const { error, isLoading, data: tags, setData: setTags }: { error: string | null, isLoading: boolean, data: Tag[], setData: Dispatch<any> } = useFetch('http://localhost:8001/tags')
  let { isLoading: recipesLoading, data: recipes, setData: setRecipes }: { error: string | null, isLoading: boolean, data: RawRecipe[], setData: Dispatch<any> } = useFetch('http://localhost:8001/cocktails')

  const recipesWithTags = useMemo(() => {
    console.log(recipes);
    return recipes?.map(recipe => {
      return { ...recipe, tags: tags.filter(tag => recipe.tagIds.includes(tag.id)) }
    })
  }, [recipes, tags])

  const onCreateRecipes = async ({ tags, ...data }: RecipeData) => {
    const newRecipe = {
      ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)
    }
    try {
      const response = await fetch('http://localhost:8001/cocktails', {
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
  const onUpdateRecipes = async (id: string, { tags, ...data }: RecipeData) => {
    const edittedRecipe = {
      ...data, id: id, tagIds: tags.map(tag => tag.id)
    }
    try {
      const response = await fetch('http://localhost:8001/cocktails/' + id, {
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

  const addTag = async (tag: Tag) => {
    try {
      const response = await fetch('http://localhost:8001/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tag)
      });
      const data = await response.json();
      console.log(data);
      setTags([...tags, data]);
    }
    catch (err) {
      console.log(err);
    }
  }

  const onUpdateIngredient = async (id: string, label: string) => {
    const edittedTag = {
      id: id, label: label
    }
    try {
      const response = await fetch('http://localhost:8001/tags/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(edittedTag)
      });
      const data = await response.json();
      console.log(data);
      setTags(tags.map(tag => {
        if (tag.id === id) {
          return edittedTag;
        } else {
          return tag;
        }
      }));
    }
    catch (err) {
      console.log(err);
    }
  }
  const onDeleteIngredient = async (id: string) => {
    try {
      const response = await fetch('http://localhost:8001/tags/' + id, {
        method: 'DELETE'
      });
      const data = await response.json();
      setTags((prevTags: Tag[]) => {
        return prevTags.filter(tag => tag.id !== id)
      })

    }
    catch (err) {
      console.log(err);
    }
  }

  const onDeleteRecipe = async (id: string) => {
    try {
      const response = await fetch('http://localhost:8001/cocktails/' + id, {
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
      {!recipesLoading && <div className='my-10 mx-auto max-w-2xl p-5'>
        <Routes>
          <Route path="/" element={<RecipeList availableTags={tags} recipes={recipesWithTags} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onDeleteIngredient} />} />
          <Route path="/create" element={<NewRecipe onSubmit={onCreateRecipes} onAddTag={addTag} availableTags={tags} />} />
          <Route path="recipes/:id" element={<RecipeLayout recipes={recipesWithTags} />}>
            <Route index element={<RecipeDetail onDelete={onDeleteRecipe} />} />
            <Route path="edit" element={<EditRecipe onSubmit={onUpdateRecipes} onAddTag={addTag} availableTags={tags} />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>}
    </div>
  )
}

export default App
