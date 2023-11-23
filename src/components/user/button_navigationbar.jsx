import {PagesRoute} from "../../routes.jsx";
import {BiMessageSquareAdd, BiSearchAlt} from "react-icons/bi";
import {Link} from "react-router-dom";
import {TbReportAnalytics} from "react-icons/tb";
import {AiOutlineFileDone} from "react-icons/ai";

export const ButtonNavigationBar = () => {
    return (
        <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600 pt-2">
            <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                <Link to={PagesRoute.search}>
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <BiSearchAlt size={26}/>
                        <span
                            className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Search
                    </span>
                    </button>
                </Link>
                <Link
                    to={PagesRoute.create}>
                    <button type="button" className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <BiMessageSquareAdd size={26}/>
                        <span
                            className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Create
                    </span>
                    </button>
                </Link>
                <Link
                    to={PagesRoute.user}
                >
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group"
                    >
                        <AiOutlineFileDone size={26}/>
                        <span
                            className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Reports
                    </span>
                    </button>
                </Link>
                <Link
                    to={PagesRoute.done}
                >
                    <button type="button"
                            className="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                        <TbReportAnalytics size={26}/>
                        <span
                            className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                        Done
                    </span>
                    </button>
                </Link>
            </div>
        </div>
    );
}