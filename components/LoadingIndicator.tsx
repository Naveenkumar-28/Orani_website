type LoadingIndicatorType = {
    size?: string,
    color?: string,
    borderWidth?: string
}

export const LoadingIndicator = ({ size = "size-12", color = "border-green", borderWidth = "border-4" }: LoadingIndicatorType) => {
    return (
        <div className={`${size} ${borderWidth} ${color}  border-t-transparent rounded-full animate-spin`}></div>
    );
};