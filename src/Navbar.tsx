import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="p-5 flex items-center max-w-2xl my-0 mx-auto border-b-2 border-gray-100">
            <Link to="/"><h1 className='text-cyan-600 font-bold text-2xl'>Recipe Shopping</h1></Link>
            <div className='ml-auto flex items-center gap-4 flex-wrap '>
                <Link className=' group text-cyan-500 font-bold leading-5 ease-linear transition duration-300' to="/create">
                    Create
                    <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-cyan-500"></span>
                </Link>
                <Link className='  group text-orange-500 font-bold leading-5 ease-linear transition duration-300' to="/ingredients">
                    Ingredients
                    <span className="block max-w-0 mt-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-orange-500"></span>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar