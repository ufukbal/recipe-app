import React, { ChangeEventHandler, useState } from "react";
import { Ingredient as IngredientType } from "../APIResponsesTypes";

interface IngredientPropType {
    ingredient: IngredientType;
    isEditable: boolean;

    index: number;
}

type IsEditablePropType =
    | { isEditable: false; handleDelete?: never; handleName?: never; handleAvailable?: never }
    | {
        isEditable: boolean; handleDelete: (index: number) => void;
        handleName: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
        handleAvailable: (index: number) => void;
    }

const Ingredient = ({ ingredient, handleDelete, isEditable, index, handleName, handleAvailable }: IngredientPropType & IsEditablePropType) => {

    return <li className={`text-left  ${!isEditable ? (ingredient.isAvailable ? 'text-green-500 list-disc' : 'text-red-500 list-circle') : 'flex'}`}>

        {isEditable ? (
            <div className='flex my-3'>
                <input type="checkbox"
                    checked={ingredient.isAvailable}
                    onChange={() => handleAvailable(index)} />
                <input className='ml-4 border-gray-100 border-2 box-border' type="text"
                    required={!ingredient.ingredient}
                    name="ingredient"
                    placeholder={ingredient.ingredient}
                    onChange={(e) => handleName(e, index)}
                />
            </div>
        ) :
            <label >{ingredient.ingredient}</label>
        }
        {isEditable && <button type="button"
            className='text-red-500 font-bold p-1 ml-1 text-right'
            onClick={() => handleDelete(index)}>
            X
        </button>
        }
    </li>;
};

export default Ingredient;
