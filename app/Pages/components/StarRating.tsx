import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = ({ initialValue, className = 'text-lg' }: { className?: string, initialValue: number }) => {
    const [rating, setRating] = useState(0);
    useEffect(() => {
        setRating(initialValue)
    }, [initialValue])

    return (
        <div className={`${className} flex gap-1 justify-center items-center overflow-hidden`}>
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                    <FaStar
                        key={index}
                        className={` cursor-pointer transition ${starValue <= rating ? "text-yellow-500" : "text-gray-400"
                            }`}
                    />

                );
            })}
        </div>
    );
};

