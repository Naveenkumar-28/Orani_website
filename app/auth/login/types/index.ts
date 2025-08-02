import { Ref } from "react";

export type loginFieldsType = "email" | "password";
export type loginFormType = Record<loginFieldsType, React.RefObject<HTMLInputElement | null>>
export type LoginFormValidationPropsFieldsType = {
    email: string,
    password: string
}

export type InputPropsType = {
    item: loginDataType;
}

export type loginDataType = {
    labelName: string,
    type: string,
    placeHolder: string,
    error: string,
    ref: Ref<HTMLInputElement>
}