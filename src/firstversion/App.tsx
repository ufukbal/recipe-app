import { Routes, Route, Navigate } from 'react-router-dom'
import CocktailDetail from './CocktailDetail'
import Home from './Home'
import Navbar from './Navbar'
import NewCocktail from './NewCocktail'

function App() {

  return (
    <div className=''>
      <Navbar />
      <div className='my-10 mx-auto max-w-2xl p-5'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<NewCocktail />} />
          <Route path="cocktails/:id">
            <Route index element={< CocktailDetail />} />
            <Route path="edit" element={<h1>Edit</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
