export interface Cocktail {
    id: number;
    title: string;
    ingredients?: Ingredient[];
    body: string;
    author: string;
}

export interface Ingredient {
    unit?: string;
    amount?: number;
    ingredient: string;
    isAvailable: boolean;
}

