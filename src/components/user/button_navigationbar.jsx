import {PagesRoute} from "../../routes.jsx";
import {BiMessageSquareAdd, BiSearchAlt} from "react-icons/bi";
import {Link} from "react-router-dom";
import {TbReportAnalytics} from "react-icons/tb";
import {AiOutlineFileDone} from "react-icons/ai";

export const ButtonNavigationBar = () => {
    return (
        <div className="btm-nav">
            <Link to={PagesRoute.search}>
                <button>
                    <BiSearchAlt size={26}/>
                </button>
            </Link>
            <Link to={PagesRoute.create}>
                <button>
                    <BiMessageSquareAdd size={26}/>
                </button>
            </Link>
            <Link to={PagesRoute.user}>
                <button>
                    <TbReportAnalytics size={26}/>
                </button>
            </Link>
            <Link to={PagesRoute.done}>
                <button>
                    <AiOutlineFileDone size={26}/>
                </button>
            </Link>
        </div>
    );
}