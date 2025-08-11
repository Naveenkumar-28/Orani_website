"use client"
import { useSelector } from 'react-redux'
import { NotifyMessage } from './NotifyMessage'
import { RootState } from '@/app/redux/store';

export function NotifyContainer({ leftSide = false }: { leftSide?: boolean }) {
    const notifyMessages = useSelector((state: RootState) => state.NotifyMessage) // Example structure

    return (
        <div className={`fixed px-5 ${leftSide ? "left-0" : "right-0"} sm:bottom-10 bottom-5 flex flex-col gap-4 z-[101] justify-end sm:max-w-sm max-w-[25rem] w-full`}>
            {notifyMessages?.messages?.map((msg) => (
                <NotifyMessage key={msg.id.toString()} Message={msg.message} id={msg.id} type={msg?.type} leftSide={leftSide} />
            ))}
        </div>
    )
}

