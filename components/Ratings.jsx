import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ initialValue }) => {
    const [rating, setRating] = useState(0);
    useEffect(() => {
        setRating(initialValue)
    }, [initialValue])

    return (
        <div className="flex gap-1 justify-center items-center">
            {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (


                    <FaStar

                        key={index}
                        size={18}
                        className={`cursor-pointer transition ${starValue <= rating ? "text-yellow-500" : "text-gray-400"
                            }`}
                    />

                );
            })}
        </div>
    );
};

export default StarRating;
