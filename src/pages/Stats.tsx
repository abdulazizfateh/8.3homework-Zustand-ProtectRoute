import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { api } from '../api/api';
ChartJS.register(ArcElement, Tooltip);

type IProduct = {
    name: string,
    prepTimeMinutes: number,
    caloriesPerServing: number
}

const Stats = () => {
    const [statsData, setStatsData] = useState<IProduct[]>([]);
    useEffect(() => {
        const getStatsData = async () => {
            try {
                const res = await api.get("/recipes?limit=5&skip=20");
                setStatsData(res.data.recipes);
            } catch (e) {
                console.log(e);
            }
        }
        getStatsData();
    }, [])
    console.log(statsData);

    const names = statsData?.map((item) => item.name)
    const prepMinutes = statsData?.map((item) => item.prepTimeMinutes);
    const calories = statsData?.map(item => item.caloriesPerServing);

    const prepMinutesData = {
        labels: names,
        datasets: [
            {
                label: 'Preperation Minute',
                data: prepMinutes,
                backgroundColor: [
                    "#4E79A7",
                    "#F28E2B",
                    "#E15759",
                    "#76B7B2",
                    "#59A14F",
                    '#EDC948'
                ],
                borderColor: [
                ],
                borderWidth: 0,
            },
        ],
    };


    const caloriesData = {
        labels: names,
        datasets: [
            {
                label: 'Calories',
                data: calories,
                backgroundColor: [
                    "#4E79A7",
                    "#F28E2B",
                    "#E15759",
                    "#76B7B2",
                    "#59A14F",
                    '#EDC948'
                ],
                borderColor: [
                ],
                borderWidth: 0,
            },
        ],
    };

    return (
        <section className='section_stats'>
            <div className='container mx-auto'>
                <div className='stats_wrapper min-h-[90vh] py-4 sm:py-8'>
                    <h1 className='w-[85%] mx-auto text-xl mb-6 sm:mb-9 md:mb-12 text-center'>Get your favurite meals' preparation time and calories</h1>
                    <div className='grid grid-cols-1 w-[70%] mx-auto sm:w-[90%] place-content-center sm:grid-cols-2 gap-10'>
                        <div className=''>
                            <Pie data={prepMinutesData} className='cursor-pointer' />
                        </div>
                        <div className=''>
                            <Pie data={caloriesData} className='cursor-pointer' />
                        </div>
                    </div>
                    {/* <div className='pagination flex items-center justify-center gap-2 mt-12'>
                        <button>1</button>
                        <button>2</button>
                        <button>3</button>
                        <button>4</button>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default React.memo(Stats);

