import { FormEvent, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { RecipeData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid"

type RecipeFormProps = {
    onSubmit: (data: RecipeData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
} & Partial<RecipeData>

const RecipeForm = ({ onSubmit, onAddTag, availableTags, title = "", body = "", tags = [] }: RecipeFormProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    const bodyRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            body: bodyRef.current!.value,
            tags: selectedTags
        })

        navigate("..")

    }
    return <div className="max-w-md mx-auto my-0 text-center">
        <h2 className='text-xl'>Create New Cocktail</h2>

        <form onSubmit={handleSubmit}>
            <label className='text-left block'>Cocktail Title:</label>
            <input className='form-inputs w-full ' type="text" ref={titleRef}
                required
                name="title"
                defaultValue={title}
            />
            <label className='text-left block'>Cocktail Body:</label>
            <textarea
                ref={bodyRef}
                className='form-inputs w-full '
                required
                name="body"
                defaultValue={body}
            />
            <label className='text-left block'>Cocktail Author</label>
            <CreatableReactSelect
                value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                })}
                options={availableTags.map(tag => {
                    return { label: tag.label, value: tag.id }
                })}
                onCreateOption={label => {
                    const newTag = { id: uuidV4(), label }
                    onAddTag(newTag);
                    setSelectedTags(prev => [...prev, newTag])
                }}
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                        return { label: tag.label, id: tag.value }
                    }))
                }}
                isMulti />
            <>
                {/* <label>
                    Ingredients
                </label>
                <ul className='flex flex-col flex-wrap justify-between mb-5'>
                    {ingredients &&
                        ingredients.map((ingredient, index) => (
                            <Ingredient
                                key={index}
                                isEditable={true}
                                index={index}
                                ingredient={ingredient}
                                handleDelete={handleDelete}
                                handleAvailable={handleIngredientAvailable}
                                handleName={handleIngredientName}
                            />
                        ))
                    }
                </ul>
                <div className='flex my-3'>
                    <input type="checkbox" checked={checked}
                        onChange={() => setChecked(!checked)
                        } />
                    <input className='ml-4 border-gray-100 border-2 box-border' type="text"
                        name="ingredient"
                        value={ingredientName}
                        onChange={(e) => setIngredientName(e.target.value)}
                    />
                    <button type="button" disabled={!ingredientName} className='bg-teal-400 text-white p-1 ml-2 rounded-lg disabled:bg-slate-400 disabled:opacity-50 disabled:cursor-not-allowed'
                        onClick={() => {
                            setIngredients([...ingredients, { ingredient: ingredientName, isAvailable: checked }]);
                            setIngredientName('');
                            setChecked(false);
                        }}>
                        Add
                    </button>
                </div> */}


            </>
            <div className="flex gap-2 justify-center mt-2">
                <button type="submit" className='bg-teal-400 text-white p-2 rounded-lg'>Add</button>
                <Link to="..">
                    <button type="button" className='bg-orange-400 text-white p-2 rounded-lg'>Cancel</button>
                </Link>
            </div>


        </form>
    </div >;
};

export default RecipeForm;
