export type AddressInitialStateType = {
    firstName?: string,
    lastName?: string,
    city?: string,
    postcode?: string,
    mobileNumber?: string,
    emailAddress?: string,
    street?: string,
    paymentMode?: string,
    isChecked?: string
}

export type AddressType = {
    _id: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    street: string;
    postcode: string;
    isChecked: boolean;
}

type InputChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export interface BaseField {
    title: string;
    error?: string;
    value?: string | number;
    onChange?: (e: InputChangeEvent) => void;
    placeholder?: string;
    type?: string;
    defaultValue?: string;
    readOnly?: boolean;
    defaultChecked?: boolean
}
type AddressStaticField = {
    title: string;
    defaultValue: string;
    readOnly: true;
};

export interface AddressFormData {
    firstName: BaseField;
    lastName: BaseField;
    country: AddressStaticField;
    city: BaseField;
    street: BaseField;
    postcode: BaseField;
    mobileNumber: BaseField;
}

export type AddressFormType = {
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    mobileNumber: string;
    street: string;
    postcode: string;
}
