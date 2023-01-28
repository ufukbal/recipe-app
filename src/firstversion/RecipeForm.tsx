import React from "react";

const RecipeForm = () => {
    return <ul className='flex flex-col flex-wrap justify-between mb-5 ml-8'>
        {ingredients &&
            ingredients.map((ingredient, index) =>
                <Ingredient
                    key={index}
                    isEditable={isEditable}
                    index={index}
                    ingredient={ingredient}
                    handleDelete={handleDelete}
                    handleName={handleIngredientName}
                    handleAvailable={handleIngredientAvailable} />
            )}
    </ul>;
};

export default RecipeForm;
