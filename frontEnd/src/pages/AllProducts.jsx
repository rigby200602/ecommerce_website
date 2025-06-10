import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { dummyProducts } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    
    const {products} = useContext(AppContext)
   

    return (
    <div className='mt-16 flex flex-col'> 
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>

        {/* Product list */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6'>
            {dummyProducts.map((product,i) => (
                <ProductCard product={product} key={i}/>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AllProducts
