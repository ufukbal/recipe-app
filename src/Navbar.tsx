import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="p-5 flex items-center max-w-2xl my-0 mx-auto border-b-2 border-gray-100">
            <h1 className='text-cyan-600 text-2xl font-Quicksand'>Cocktail Menu</h1>
            <div className='ml-auto'>
                <Link className="ml-4 p-2 hover:text-cyan-600" to="/">Home</Link>
                <Link className="ml-4 p-2 hover:text-cyan-600" to="/create">New Cocktail</Link>

            </div>
        </nav>
    )
}

export default Navbar