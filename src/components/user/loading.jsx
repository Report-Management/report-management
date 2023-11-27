import {Spinner} from "flowbite-react";
import {ColorRing, Triangle} from "react-loader-spinner";

export const Loading = () => {
    return (
        <div role="status" className="container mx-auto max-w-full flex justify-center items-center h-screen">
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