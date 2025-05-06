"use client"

import { useSelector } from 'react-redux'
import NotifyMessage from './NotifyMessage'

type NotifyItem = {
    message: string;
    id: Date;
    type?: string;
};

function NotifyContainer() {
    const notifyMessages: NotifyItem[] = useSelector((state: any) => state.NotifyMessage.messages) // Example structure

    return (
        <div className="fixed top-25 right-0 flex flex-col gap-4 z-[101]">
            {notifyMessages?.map((msg) => (
                <NotifyMessage key={msg.id.toString()} Message={msg.message} id={msg.id} type={msg?.type} />
            ))}
        </div>
    )
}

export default NotifyContainer
