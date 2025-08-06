export const OrderCardSkeleton = () => {
    return (
        <div className='flex py-3 items-center gap-5 xl:text-sm lg:text-[0.7em] text-xs hover:bg-gray-100 rounded-lg animate-pulse'>
            <div className='w-3/12 text-center'>
                <div className='mx-auto h-4 w-24 bg-gray-300 rounded' />
            </div>
            <div className='w-2/12 text-center'>
                <div className='mx-auto h-4 w-20 bg-gray-300 rounded' />
            </div>
            <div className='w-3/12 flex justify-center'>
                <div className='h-6 w-20 bg-gray-300 rounded-full' />
            </div>
            <div className='w-2/12 text-center'>
                <div className='mx-auto h-4 w-16 bg-gray-300 rounded' />
            </div>
            <div className='w-2/12 flex justify-center'>
                <div className='h-8 w-24 bg-gray-300 rounded-full' />
            </div>
        </div>
    );
};

