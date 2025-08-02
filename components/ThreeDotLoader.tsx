import React from "react";

export const ThreeDotLoader = () => {
    return (
        <div className="flex space-x-2 ">
            <div className="size-3 bg-white  rounded-full animate-bounce [animation-delay:0s]"></div>
            <div className="size-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="size-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
    );
};
