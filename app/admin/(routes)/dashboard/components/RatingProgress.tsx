import * as React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

type RatingProgressType = {
    stars: number,
    value: number,
}

export function RatingProgress({ stars, value }: RatingProgressType) {
    return (
        <div className='flex gap-2 items-center'>
            <div className='text-xs w-2/12  sm:w-1/12 md:w-2/12 xl:w-2/12 lg:text-sm flex items-center justify-center'>
                {stars} Star
            </div>
            <div className='w-8/12 sm:w-10/12 md:w-10/12 xl:w-7/12'>
                <LinearProgress
                    variant="determinate"
                    value={value}
                    color={'primary'}
                    sx={{
                        height: 8, borderRadius: 5,
                        backgroundColor: '#e5e7eb', // Track color
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: '#7fad39', // Custom bar color (orange in this case)
                        }
                    }}
                />
            </div>
            <div className='w-2/12 sm:w-1/12 md:w-2/12 xl:w-2/12 flex justify-center items-center' >
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(value)}%`}
                </Typography>
            </div>
        </div>
    );
}
