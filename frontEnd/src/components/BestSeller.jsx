import { useContext } from 'react'
import ProductCard from './ProductCard'
import { AppContext } from '../context/AppContext'

const BestSeller = () => {
  
  const {products} = useContext(AppContext)

  return (
    <div className='mt-16'>
        <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6'>
          {products.filter((product) => product.inStock).slice(0,5).map((product,i) => 
            <ProductCard key={i} product={product}/>
          )}
        </div>
    </div>
  )
}

export default BestSeller
