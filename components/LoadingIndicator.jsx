const LoadingIndicator = ({ size }) => {
    return (

        <div style={{ height: size + "px", width: size + "px" }} className={`size-12 border-4 border-green border-t-transparent rounded-full animate-spin`}></div>
    );
};

export default LoadingIndicator