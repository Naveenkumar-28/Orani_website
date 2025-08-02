export type RegisterFieldsType = "name" | "email" | "password";
export type RegisterFormType = Record<RegisterFieldsType, React.RefObject<HTMLInputElement | null>>

export type InputPropsType = {
    item: registerDataType;
    inputRef: React.RefObject<HTMLInputElement | null>;
    setPasswordVisiable: (e: boolean) => void;
    inputOuterRef: React.RefObject<HTMLInputElement | null>;
    passwordVisiable: boolean;
}
export type registerDataType = {
    labelName: string,
    type: string,
    placeHolder: string,
}

export type RegisterFormValidationPropsFieldsType = {
    name: string;
    email: string;
    password: string;
}

export type NotifyMessageType = {
    message: string;
    type?: 'success' | 'error' | 'info'; // Add other types if needed
}