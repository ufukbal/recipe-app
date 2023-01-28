import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReactSelect from "react-select/";
import { Recipe, Tag } from "./App";

type RecipeListProps = {
    availableTags: Tag[]
    recipes: SimplifiedRecipe[]
    onDeleteIngredient: (id: string) => void
    onUpdateIngredient: (id: string, label: string) => void
}
type SimplifiedRecipe = {
    title: string
    tags: Tag[]
    id: string
}

type EditModalProps = {
    availableTags: Tag[]
    handleClose: () => void
    onDeleteIngredient: (id: string) => void
    onUpdateIngredient: (id: string, label: string) => void
}
const RecipeList = ({
    availableTags,
    recipes,
    onDeleteIngredient,
    onUpdateIngredient
}: RecipeListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);

    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            return (
                (title === "" ||
                    recipe.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 ||
                    selectedTags.every(tag => recipe.tags.some(recipeTag => recipeTag.id === tag.id)))
            )
        })
    }, [title, selectedTags, recipes]);

    return (
        <>
            <div className="flex justify-between mb-4 items-center">
                <h2 className='text-xl text-center'>Recipes</h2>
                <div className="flex gap-2 justify-center">
                    <Link to="/create">
                        <button type="submit" className='bg-cyan-500 text-white font-bold uppercase px-3 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>
                            Create
                        </button>
                    </Link>
                    <button type="button" onClick={() => setShowEditModal(true)} className=' text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'>Edit Tags</button>
                </div>
            </div>
            <form className="flex justify-between my-3" >
                <div className="w-full">
                    <label className='text-left block'>Title:</label>
                    <input className='form-inputs w-full' type="text"
                        required
                        name="title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="w-full">
                    <label className='text-left block px-2'>Cocktail Author</label>
                    <ReactSelect
                        className="px-2 py-1 mx-0"
                        value={selectedTags.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        options={availableTags?.map(tag => {
                            return { label: tag.label, value: tag.id }
                        })}
                        onChange={tags => {
                            setSelectedTags(tags.map(tag => {
                                return { label: tag.label, id: tag.value }
                            }))
                        }}
                        isMulti />
                </div>
            </form>
            <div className="grid mb-8 gap-4 md:grid-cols-2">
                {recipes && filteredRecipes?.map(recipe => (
                    <RecipeCard id={recipe.id} title={recipe.title} tags={recipe.tags} />
                ))}

            </div>
            {showEditModal && <EditIngredientsModal availableTags={availableTags} handleClose={() => setShowEditModal(false)} onUpdateIngredient={onUpdateIngredient} onDeleteIngredient={onDeleteIngredient} />}

        </>);
};

const RecipeCard = ({ id, title, tags }: SimplifiedRecipe) => {
    return <Link to={`recipes/${id}`}>
        <div className="flex flex-col text-center py-3 px-4 border-2 border-gray-50 hover:shadow-md" key={id} >
            <h2 className='text-cyan-600 text-xl font-medium mb-2'>{title}</h2>
            <div className="flex justify-center flex-wrap gap-0.5">{tags && tags.map((tag) => (
                <span className="bg-orange-600 text-orange-100 text-xs font-medium px-2.5 py-0.5 rounded">{tag.label}</span>)
            )}</div>
        </div >
    </Link>

}

const EditIngredientsModal = ({ availableTags, handleClose, onUpdateIngredient, onDeleteIngredient }: EditModalProps) => {
    return (
        <div>
            <div
                className="justify-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                                Modal Title
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={handleClose}
                            >
                                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                </span>
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            {availableTags.map(tag => (
                                <div className="flex justify-between">
                                    <input className='px-1 py-0.5 mx-0 my-0.5 border-2 border-gray-100 box-border block w-full' type="text"
                                        required
                                        name="title"
                                        value={tag.label}
                                        onChange={e => onUpdateIngredient(tag.id, e.target.value)}
                                    />
                                    <div className="flex items-center ml-2">
                                        <button className="bg-orange-600 text-orange-100 text-xs font-medium px-1 rounded"
                                            onClick={() => onDeleteIngredient(tag.id)}>
                                            X
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="opacity-25 fixed inset-0 z-40 bg-black" type="button" onClick={handleClose}>x</button>
        </div>
    )
}


export default RecipeList;
