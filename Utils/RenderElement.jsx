"use client"
import Input from "@/components/AdminPage/Input";
import Dropdown from '@/components/Dropdown';

// Function to render different input elements based on the type
export const renderElement = (Element, props) => {
    switch (Element) {
        case "input":
            return <Input {...props} />
        case "textarea":
            return (
                <div className='flex flex-col gap-1'>
                    <label className='font-medium'>{props.labelName}</label>
                    <textarea value={props.value} onChange={props.onChange} placeholder={props.placeholder} className="border-2 rounded-sm py-5 text-sm font-light text-gray-600 outline focus:border-green outline-transparent px-5 border-gray-200 w-full h-32" name="description" />
                </div>
            )
        case "select":
            return (
                <div className='flex flex-col gap-1'>
                    <label className='font-medium'>Category :</label>
                    <Dropdown dropdownOuterDiv='border-2 border-gray-200 ' dropdownOuterWidth='py-1' className='text-gray-500 text-sm' onClick={props.onChange} renderItems={["oranges", "juice", "vegetables", "fruits"]} status={props.value} />
                </div>
            )
        default:
            return null
    }
}