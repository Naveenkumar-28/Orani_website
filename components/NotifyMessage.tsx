"use client";
import { RemoveNotifyMessage } from "@/app/redux/slices/NotifyMessageSlice";
import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdCheckCircle } from "react-icons/md";
import { PiWarningCircle } from "react-icons/pi";
import { useDispatch } from "react-redux";

type NotifyMessageProps = {
    Message: string;
    id: Date;
    type?: string;
    leftSide?: boolean;
};

export function NotifyMessage({ Message, id, type = "success", leftSide }: NotifyMessageProps) {
    const [isActive, setIsActive] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Delay to allow transition
        let enterTimeout = setTimeout(() => {
            setIsActive(true);
        }, 50)

        // Remove the notification after the duration
        const closeTimeout = setTimeout(() => {
            setIsActive(false);
            setTimeout(() => {
                dispatch(RemoveNotifyMessage(id));
            }, 500);
        }, 5000);

        return () => {
            clearTimeout(enterTimeout);
            clearTimeout(closeTimeout);
        };
    }, [id, dispatch]);

    const getColor = (type: string) => {
        switch (type) {
            case "success":
                return "bg-emerald-500";
            case "error":
                return "bg-red-400";
            case "info":
                return "bg-neutral-800";
            case "warning":
                return "bg-amber-400";
            default:
                return "";
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case "success":
                return <MdCheckCircle />
            case "error":
                return <PiWarningCircle />;
            case "info":
                return <MdCheckCircle />
            case "warning":
                return <PiWarningCircle />;
            default:
                return "";
        }
    };

    return (
        <div
            className={`relative overflow-hidden transform transition-all self-end ease-in-out ${isActive ? `${leftSide ? "translate-x-0" : "-translate-x-0"} opacity-100` : `${leftSide ? "-translate-x-full" : "translate-x-full"} opacity-0`
                } ${getColor(type)} duration-300 ease-in shadow-md rounded-md md:text-base text-sm text-white w-full`}
        >
            {/* Smooth timer bar at bottom */}
            <div
                className="absolute bottom-0 left-0 h-0.5 bg-white rounded-sm"
                style={{
                    animation: 'shrinkBar 5s linear forwards'
                }}
            />

            <div className="flex items-center gap-3 px-3 py-2.5">
                <div className="flex items-center gap-2 w-full">
                    <div className="text-2xl text-white">{getIcon(type)}</div>
                    <p className="text-white text-sm">{Message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsActive(false);
                        setTimeout(() => {
                            dispatch(RemoveNotifyMessage(id));
                        }, 500);
                    }}
                    className="text-xl cursor-pointer text-white"
                >
                    <IoMdClose />
                </button>
            </div>
        </div>

    );
}
