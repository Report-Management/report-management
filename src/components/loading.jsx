import {Spinner} from "flowbite-react";

export const Loading = () => {
    return (
        <div role="status" className="container mx-auto max-w-7xl flex justify-center items-center h-screen">
            <Spinner size="lg" />
            <span className="sr-only">Loading...</span>
        </div>
    )
}