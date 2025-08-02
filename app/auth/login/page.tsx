"use client"
import { Button } from "@/components";
import React from "react";
import Link from "next/link";
import { useLoginHandler } from "./hooks";
import { InputField } from "../components";

export default function LoginScreen() {
    const { loginFormData, loginFormValidateHandler, isLoading } = useLoginHandler()

    return (

        <div className="ring max-w-xl ring-gray-100 2xl:w-4/12 xl:w-5/12 mx-auto md:p-6 p-4 bg-white rounded-xl shadow-md w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
            <h2 className="text-2xl font-bold mb-4 text-center uppercase text-green">Login</h2>
            <form onSubmit={loginFormValidateHandler} className="space-y-4">
                {
                    loginFormData.map((item, index) => {
                        return (
                            <InputField key={index} item={item} />
                        )
                    })
                }
                <div className="flex gap-2 font-light md:text-sm text-xs">
                    <span className="text-gray-500">you don't have a account ?</span>
                    <Link href='/auth/register' className="text-green font-medium hover:underline underline-offset-2">Register</Link>
                </div>
                <Button title="Login" loading={isLoading} disabled={isLoading} className="w-full uppercase md:text-base text-sm" />
            </form>
        </div>
    );
}
