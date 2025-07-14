import React from 'react'
import { useRoutes } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Stats from './Stats';
import SignIn from './SignIn';
import Auth from '../components/Auth';

const AppRoutes = () => {
    return (
        useRoutes([

            {
                path: "/",
                element: <Auth />,
                children: [
                    {
                        path: "/",
                        element: <Layout />, children: [
                            {
                                path: "/",
                                element: <Home />
                            },
                            {
                                path: "/statistics",
                                element: <Stats />
                            },
                        ]
                    },
                ]
            },
            {
                path: "/sign-in",
                element: <SignIn />
            }
        ])
    )
}

export default React.memo(AppRoutes);