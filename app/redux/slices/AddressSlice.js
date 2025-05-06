import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    firstName: '',
    lastName: '',
    country: 'india',
    city: '',
    postcode: '',
    mobileNumber: '',
    emailAddress: '',
    street: ''
}

const AddressSlice = createSlice({
    initialState, name: "address",
    reducers: {
        updateAddress: (state, { payload }) => {
            switch (payload.type) {
                case "FIRSTNAME":
                    return { ...state, firstName: payload.payload };
                case "LASTNAME":
                    return { ...state, lastName: payload.payload };
                case "COUNTRY":
                    return { ...state, country: payload.payload };
                case "CITY":
                    return { ...state, city: payload.payload };
                case "POSTCODE":
                    return { ...state, postcode: payload.payload };
                case "STREET":
                    return { ...state, street: payload.payload };
                case "MOBILENUMBER":
                    return { ...state, mobileNumber: payload.payload };
                case "EMAIL":
                    return { ...state, emailAddress: payload.payload };
                default:
                    return state;
            }
        }
    }
})

export const { updateAddress } = AddressSlice.actions
export default AddressSlice.reducer