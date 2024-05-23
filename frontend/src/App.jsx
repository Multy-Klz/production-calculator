import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'

import HomePage from './components/HomePage'
import RecipesPage from './components/RecipesPage'
import ItemsPage from './components/ItemsPage'
import ProductPage from './components/ProductPage'

function App() {
  

  return (
    <div className='text-white'>
      <Router>
        <div className='header'>
          <p className='text-3xl p-4'>Select your service</p>
          <div className='flex flex-row justify-startp-10 gap-4 px-5'>
            <Link to="/items"><button>Items</button></Link>
            <Link  to="/recipes"><button>Recipes</button></Link>
            <Link  to="/products"><button>Products</button></Link>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/items" element={<ItemsPage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
