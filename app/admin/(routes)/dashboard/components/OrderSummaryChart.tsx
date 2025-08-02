import { BarChart } from '@mui/x-charts';
import React from 'react';
import { CustomSelect } from './CustomSelect';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/redux/store';

export function OrderSummaryChart() {
    const [itemNb, setItemNb] = React.useState(6);
    const { data } = useSelector((state: RootState) => state.OverallSummary)

    const SelectHandler = (num: number) => {
        setItemNb(num);
    };

    return (
        <div className='w-full ring-1 shadow-md bg-white ring-gray-200 rounded-md px-5 py-5 gap-2 sm:gap-6 flex flex-col lg:min-h-9/12'>
            <div className='flex justify-between flex-col sm:flex-row gap-5'>
                <div className='flex flex-col gap-2 sm:w-6/12'>
                    <h1 className='font-semibold sm:text-xl text-lg'>Order History</h1>
                    <p className='lg:text-sm text-xs text-gray-500'>Monthly Revenue and average order value history</p>
                </div>
                <CustomSelect
                    width='sm:w-40 md:text-sm text-xs'
                    onChange={SelectHandler}
                    options={[
                        { data: 'Last 6 Months', value: 6 },
                        { data: 'Last 3 Months', value: 3 }
                    ]}
                />
            </div>
            <div className='h-[250px] md:h-[300px] lg:h-[380px] '>
                <BarChart
                    borderRadius={5}
                    yAxis={[{
                        disableLine: true, // Hides the axis line
                        disableTicks: true, // Hides the ticks
                        position: 'none'
                    }]}
                    xAxis={[{
                        scaleType: 'band',
                        data: data?.ordersSummaryData?.months.slice(- itemNb) || []
                    }]}
                    series={[
                        {
                            label: 'Total Revenue',
                            data: data?.ordersSummaryData?.revenueData.slice(- itemNb) || [],
                            color: '#7fad39',
                            stack: 'stack1',

                        },
                        {
                            label: 'Avg Order Value',
                            data: data?.ordersSummaryData?.avgRevenueData.slice(- itemNb) || [],
                            color: '#d1d5dc',
                            stack: 'stack2'

                        }
                    ]}

                />

            </div>
        </div>
    );
}
