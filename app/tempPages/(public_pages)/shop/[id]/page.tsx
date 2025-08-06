"use client"
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { MenuSection } from '@/components'
import { RelatedProduct, RelatedProductsSectionSkeleton, SpecificProduct, SpecificProductSkeleton } from './components'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/redux/store'
import { fetchSpecificProduct } from './redux'
import { createSendMessage } from '@/utils'


const page = () => {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const sendMessage = createSendMessage()

    const { isError, isLoading, relatedProducts, specificProduct } = useSelector((state: RootState) => state.specificProduct)


    if (isError) {
        sendMessage.error("Network error !")
    }

    useEffect(() => {
        dispatch(fetchSpecificProduct({ id: params.id as string }))
    }, [])

    return (

        <>
            <MenuSection name={'Single Product'} />

            {/* Specific Product section  */}
            {!isLoading ? (
                <>
                    {specificProduct !== null && (
                        <>
                            {/* <!--Specific Product  --> */}
                            <SpecificProduct product={specificProduct} />
                        </>
                    )}
                </>
            ) : (
                <SpecificProductSkeleton />
            )
            }


            {/* <!-- Related Products Section  --> */}
            {!isLoading ? (
                <>
                    {relatedProducts?.length > 0 && (

                        <section className="mediaQuary lg:mb-50 mb-20">
                            <div className="flex justify-center flex-col items-center lg:gap-5 gap-3">
                                <h6 className="text-green font-medium italic xl:text-xl lg:text-lg text-base">Products</h6>
                                <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-2xl font-semibold text-gray-700">Related <span className='text-green'>Products</span></h1>
                                <p className="text-gray-400 lg:text-base text-xs  line-clamp-2 font-light">Far far away, behind the word mountains, far from the
                                    countries Vokalia and
                                    Consonantia</p>
                            </div>

                            <div
                                className="flex pt-10 pb-5 select-none gap-5 overflow-x-auto snap-x snap-mandatory w-full">

                                {relatedProducts?.map((product, index) => {
                                    return (
                                        <RelatedProduct key={index} product={product} />
                                    )
                                })}
                            </div>

                        </section>
                    )}
                </>
            ) : (
                <RelatedProductsSectionSkeleton />
            )
            }
        </>
    )
}

export default page