import { useContext } from 'react'
import ProductCard from './ProductCard'
import { AppContext } from '../context/AppContext'

const BestSeller = () => {
  
  const {products} = useContext(AppContext)

  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
        <div>
          {/* Show 1st product */}
          <ProductCard product={products[0]}/>
        </div>
    </div>
  )
}

export default BestSeller
