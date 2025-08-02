import { createSlice } from "@reduxjs/toolkit"
import { fetchAddresses } from "../api/fetchAddresses"
import { editAddress, removeAddress, uploadAddressThunk } from "../api"
import { AddressFormType, AddressType } from "../../types"
import { ADDRESS_TYPE } from "../../constants"

type cacheType = {
    totalPage: number,
    addresses: AddressType[]
}

type initialStateType = {
    isSkeletonLoading: boolean,
    isLoading: boolean,
    addresses: AddressType[],
    isError: string | null,
    addNewAddress: AddressFormType,
    page: number,
    totalPage: number,
    cache: Record<string, cacheType>
}

const addNewAddress = {
    firstName: '',
    lastName: '',
    country: 'india',
    city: '',
    postcode: '',
    mobileNumber: '',
    street: '',
}

const initialState: initialStateType = {
    isSkeletonLoading: false,
    isLoading: false,
    addresses: [] as AddressType[],
    isError: null as string | null,
    addNewAddress,
    page: 1,
    totalPage: 0,
    cache: {} as Record<string, cacheType>
}

const AddressSlice = createSlice({
    initialState, name: "addresses",
    reducers: {
        setAddress: (state, { payload }) => {
            switch (payload.type) {
                case ADDRESS_TYPE.FIRSTNAME:
                    state.addNewAddress = { ...state.addNewAddress, firstName: payload.payload };
                    break;
                case ADDRESS_TYPE.LASTNAME:
                    state.addNewAddress = { ...state.addNewAddress, lastName: payload.payload };
                    break;
                case ADDRESS_TYPE.COUNTRY:
                    state.addNewAddress = { ...state.addNewAddress, country: payload.payload };
                    break;
                case ADDRESS_TYPE.CITY:
                    state.addNewAddress = { ...state.addNewAddress, city: payload.payload };
                    break;
                case ADDRESS_TYPE.POSTCODE:
                    state.addNewAddress = { ...state.addNewAddress, postcode: payload.payload };
                    break;
                case ADDRESS_TYPE.STREET:
                    state.addNewAddress = { ...state.addNewAddress, street: payload.payload };
                    break;
                case ADDRESS_TYPE.MOBILENUMBER:
                    state.addNewAddress = { ...state.addNewAddress, mobileNumber: payload.payload };
                    break;
            }
        },
        resetAddresses: (state) => {
            state.isSkeletonLoading = false
            state.isLoading = false
            state.addresses = []
            state.isError = null
            state.addNewAddress = addNewAddress
            state.totalPage = 0
        },
        setEditAddress: (state, action) => {
            const matchAddress = state.addresses.find((item) => item._id == action.payload._id)
            if (!matchAddress) return;
            const { firstName, lastName, country, city, postcode, mobileNumber, street } = matchAddress

            state.addNewAddress = { firstName, lastName, country, city, postcode, mobileNumber, street }
        },
        resetAddNewAddress: (state) => {
            state.addNewAddress = addNewAddress
        },
        setDefaultAddress: (state, action) => {
            const { id } = action.payload
            state.addresses = state.addresses.map((item) => {
                if (item._id == id) {
                    return {
                        ...item,
                        isChecked: true
                    }
                } else {
                    return {
                        ...item,
                        isChecked: false
                    }
                }

            })
        }
    },
    extraReducers(builder) {
        builder
            // fetch addresses
            .addCase(fetchAddresses.pending, (state, action) => {
                const { firstTimeLoading } = action.meta.arg
                state.isSkeletonLoading = firstTimeLoading ? true : false
                state.isLoading = firstTimeLoading ? false : true
                state.isError = null
                state.totalPage = 0
            })
            .addCase(fetchAddresses.fulfilled, (state, action) => {
                const { page } = action.meta.arg
                const { addresses, totalPage, cacheKey } = action.payload
                state.cache[cacheKey] = { addresses, totalPage }
                state.isLoading = false
                state.isSkeletonLoading = false
                const result = (page == 1 ? addresses : [...state.addresses, ...addresses]) as AddressType[]
                state.addresses = markCheckedFirstOnly(result)
                state.totalPage = totalPage
                state.page = page || 1
            })
            .addCase(fetchAddresses.rejected, (state, action) => {
                state.isSkeletonLoading = false
                state.isLoading = false
                state.isError = action.payload as string
            })
            // Upload Address
            .addCase(uploadAddressThunk.pending, (state, action) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(uploadAddressThunk.fulfilled, (state, action) => {
                state.isLoading = false
                state.addNewAddress = addNewAddress
            })
            .addCase(uploadAddressThunk.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload as string
            })
            // Edit Address
            .addCase(editAddress.pending, (state, action) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(editAddress.fulfilled, (state, action) => {
                const { address } = action.payload
                state.isLoading = false
                const updatedAddress = state.addresses.map((item) => item._id == address._id ? address : item)
                state.addresses = markCheckedFirstOnly(updatedAddress)

                // Update in all cached pages
                Object.keys(state.cache)
                    .forEach((cacheKey) => {
                        const cached = state.cache[cacheKey];
                        if (cached?.addresses) {
                            cached.addresses = cached.addresses.map((item) =>
                                item._id === address._id ? address : item
                            );
                        }
                    });

                state.addNewAddress = addNewAddress
            })
            .addCase(editAddress.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload as string
            })
            // Remove address
            .addCase(removeAddress.pending, (state, action) => {
                state.isLoading = true
                state.isError = null
            })
            .addCase(removeAddress.fulfilled, (state, action) => {
                state.isLoading = false
            })
            .addCase(removeAddress.rejected, (state, action) => {
                state.isLoading = false
                state.isError = action.payload as string
            })
    },
})

function markCheckedFirstOnly(list: AddressType[]): AddressType[] {
    return list.map((item, index) => ({ ...item, isChecked: index === 0 }));
}


export const { setDefaultAddress, setAddress, resetAddresses, resetAddNewAddress, setEditAddress } = AddressSlice.actions
export const AddressReducer = AddressSlice.reducer