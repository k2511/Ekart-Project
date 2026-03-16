import BreadCrums from '@/components/BreadCrums'
import ProductDescription from '@/components/ProductDescription'
import ProductImg from '@/components/ProductImg'
import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
    const params = useParams();
    const productId = params.id;
    const {products} = useSelector(store=>store.product)
    const product = products.find((item)=>item._id === productId)

  return (
    // 1. Background, full height (min-h-screen), aur responsive top padding
    <div className='min-h-screen bg-white pt-16 sm:pt-20 md:pt-24 pb-12 px-3 sm:px-6 md:px-8 lg:px-12'>
        
        {/* Main Wrapper for ultra-wide screens */}
        <div className='max-w-7xl mx-auto'>
            
            {/* 2. Breadcrumbs Container: Mobile par horizontal scroll add kiya hai taaki lamba naam screen na tode */}
            <div className="mb-5 sm:mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <BreadCrums product={product}/>
            </div>
            
            {/* 3. The Core Layout (Mobile -> Tablet -> Desktop) */}
            <div className='flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 xl:gap-20 items-start'>
                
                {/* Left Side: Image Gallery */}
                <div className="w-full flex justify-center md:justify-start">
                    {/* Yahan aapka responsive ProductImg aayega */}
                    <ProductImg images={product?.productImg} />
                </div>
                
                {/* Right Side: Product Details */}
                {/* 4. PRO FEATURE: md:sticky md:top-28 lagaya hai. 
                    Desktop/Tablet par image scroll hogi, par details wahi 'chipki' rahengi! */}
                <div className="w-full md:sticky md:top-28">
                    <ProductDescription product={product}/>
                </div>

            </div>
        </div>
    </div>
  )
}

export default SingleProduct