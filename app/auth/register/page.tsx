"use client"
import { Button } from "@/components";
import React from "react";
import Link from "next/link";
import { useRegisterHandler } from "./hooks";
import { InputField, } from "../components";
import { EmailVerification } from "./components";


export default function RegisterScreen() {

    const { registerFormvalidation, registerFormData, email, isLoading, emailVerificationPending } = useRegisterHandler()


    return (
        <>
            {!emailVerificationPending ? (<div className="ring max-w-xl ring-gray-100 2xl:w-4/12 xl:w-5/12 mx-auto p-6 bg-white rounded-xl shadow-md w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12">
                <h2 className="text-2xl font-bold mb-4 text-center uppercase text-green">Register</h2>
                <form onSubmit={registerFormvalidation} className="space-y-4">
                    {
                        registerFormData.map((item, index) => {
                            return (
                                <InputField item={item} key={index} />
                            )
                        })
                    }
                    <div className="flex gap-2 font-light md:text-sm text-xs">
                        <span className="text-gray-500">you have already a account ?</span>
                        <Link href='/auth/login' className="text-green font-medium hover:underline underline-offset-2">Login</Link>
                    </div>
                    <Button title="Register" loading={isLoading} disabled={isLoading} className="w-full md:text-base text-sm uppercase" />

                </form>
            </div>) : (
                <EmailVerification email={email} />
            )}
        </>
    );
}
