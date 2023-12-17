import {Triangle} from "react-loader-spinner";

export const Loading = () => {
    return (
        <div role="status" className="container mx-auto max-w-full flex justify-center items-center max-h-screen h-full">
            <Triangle
                height="80"
                width="80"
                color="#713ABE"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}
            />
        </div>
    )
}