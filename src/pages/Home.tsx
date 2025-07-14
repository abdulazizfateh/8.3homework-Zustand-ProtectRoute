import React, { useEffect, useState } from 'react'
import { api } from '../api/api';
import { useStore } from '../zustand/store';

const Home = () => {
    const { userID } = useStore();
    const [userFirstName, setUserFirstName] = useState<string>("");
    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await api.get(`users/${userID}`)
                setUserFirstName(response?.data?.firstName)
            } catch (e) {
                console.log(e);
            }
        }
        getUser();
    }, [userID])
    return (
        <>
            <section className='section_home'>
                <div className='container mx-auto'>
                    <div className='flex items-center justify-center min-h-[90vh]'>
                        <h1 className='text-xl font-light'>Welcome to your Account, <span className='h-4 block text-center'>{userFirstName}</span></h1>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(Home);