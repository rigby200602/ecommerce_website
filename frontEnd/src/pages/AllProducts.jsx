import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard'

const AllProducts = () => {
    
    const {products, searchQuery } = useContext(AppContext)
    const [filteredProducts, setFilteredProducts] = useState([])

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter(
                product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
            ))} else {
                setFilteredProducts(products)
            }
    }, [products, searchQuery])

    return (
    <div className='mt-16 flex flex-col'> 
      <div className='flex flex-col items-end w-max'>
        <p className='text-2xl font-medium uppercase'>All products</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>
      {/* Product list */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6'>
            {filteredProducts.filter((product) => product.inStock).map((product,i) => (
                <ProductCard product={product} key={i}/>
            ))}
        </div>
    </div>
  )
}

export default AllProducts
