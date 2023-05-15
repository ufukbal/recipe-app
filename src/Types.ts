export type Recipe = {
    id: string
  } & RecipeData
  
  export type RawRecipe = {
    id: string
    title: string
    body: string
    ingredientIds: string[]
  }
  
  export type RecipeData = {
    title: string
    body: string
    ingredients: IngredientType[]
  }
  
  export type IngredientType = {
    id: string
    label: string
    isAvailable: boolean
  }