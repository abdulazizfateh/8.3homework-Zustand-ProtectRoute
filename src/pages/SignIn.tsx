import React, { useEffect, useState } from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { api } from '../api/api';
import { useStore } from '../zustand/store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type FieldType = {
    username?: string;
    password?: string;
};

const SignIn: React.FC = () => {
    const navigate = useNavigate();
    const { token, saveToken, saveUserID } = useStore();
    const [invalidCred, setInvalidCred] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, [token])

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        setLoading(true);
        try {
            const response = await api.post("/auth/login", values);
            if (response.data.accessToken) {
                saveToken(response.data.accessToken);
                saveUserID((response.data.id))
                navigate("/");
                setInvalidCred(false);
            }
        } catch (e) {
            if (axios.isAxiosError(e)) {
                setInvalidCred(true);
            } else {
                console.error("Unexpected error", e);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className='section_signin bg-black'>
            <div className='container mx-auto'>
                <div className="signin_wrapper w-full h-screen flex flex-col gap-5 items-center justify-center">
                    <h1 className='text-white text-2xl uppercase'>Sign in</h1>
                    <div className='w-[90%] sm:w-auto px-6 pt-8 sm:px-8 sm:pt-6 pb-0 bg-[#111] border border-[#222]'>
                        <Form
                            className='sm:w-[340px]'
                            name="signin"
                            onFinish={onFinish}
                            autoComplete="off"
                            layout='vertical'
                        >
                            <Form.Item<FieldType>
                                className='!h-[80px]'
                                label={<span className='text-white uppercase'>Username</span>}
                                name="username"
                                rules={[{ required: true, message: <p className='!text-[10px] uppercase mt-1.5'>Please input your username!</p> }]}
                            >
                                <Input className='!text-lg !font-[400] h-[42px] !text-white !border-gray-400 focus:!border-white !shadow-none bg-11 !bg-transparent !rounded-none' />
                            </Form.Item>

                            <Form.Item<FieldType>
                                className='!h-[80px]'
                                label={<span className='text-white uppercase'>Password</span>}
                                name="password"
                                rules={[{ required: true, message: <p className='!text-[10px] uppercase mt-1.5'>Please input your password!</p> }]}
                            >
                                <Input.Password className='!text-lg !font-[400] h-[42px] !text-white !border-gray-400 focus-within:!border-white focus:!border-white !shadow-none bg-11 !bg-transparent !rounded-none'
                                    iconRender={(visible) => (visible ? <GoEye style={{ cursor: "pointer" }} /> : <GoEyeClosed style={{ cursor: "pointer" }} />)}
                                />
                            </Form.Item>

                            <Form.Item label={null}>
                                <div className='flex flex-col sm:flex-row sm:items-center justify-end gap-2 sm:gap-4'>
                                    <Button type='primary' className='!bg-transparent !px-0 !shadow-none sm:!h-[40px] !rounded-none order-2 sm:order-1'>
                                        <span className='text-xs uppercase'>Create account</span>
                                    </Button>
                                    <Button type="primary" htmlType="submit" loading={loading} className={`order-1 sm:order-2 !bg-sky-600 !cursor-pointer !h-[40px] !px-8 !rounded-none border border-sky-600 ${loading ? "!border-sky-600 !bg-transparent" : ""}`}>
                                        {
                                            loading ? <span className='text-base uppercase'>Signing in</span>
                                                :
                                                <span className='text-base uppercase'>Sign in</span>
                                        }
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='h-9 flex items-center justify-center'>
                        {
                            invalidCred && <p className='text-sm text-red-500 text-center'>Password or Username is incorrect.</p>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
};

export default React.memo(SignIn);