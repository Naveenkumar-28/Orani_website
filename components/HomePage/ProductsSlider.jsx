import React from 'react'
import TopProductCard from './TopProductCard'

function ProductsSlider({ ref, products = [], loadingSkeleton }) {

    return (
        <div ref={ref}
            className="w-full mt-10 grid grid-flow-col grid-rows-3 auto-cols-[calc((100%/1))] overflow-hidden gap-5 snap-mandatory snap-x scroll-smooth">
            {!loadingSkeleton ? (
                <>
                    {products.map((product, index) => {
                        return <TopProductCard key={index} product={product} />
                    })}
                </>
            ) : (
                <>
                    {
                        [...Array(3)].map((_, index) => {
                            return <div key={index} className='bg-gray-200 animate-pulse w-full h-30 rounded-sm'></div>
                        })

                    }
                </>
            )}
        </div>
    )
}

export default ProductsSlider