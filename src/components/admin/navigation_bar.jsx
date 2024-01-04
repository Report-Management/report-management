import {Avatar, Dropdown, Navbar} from 'flowbite-react';
import logo from '../../assets/seo-report.png';
import profile from '../../assets/user.png';
import PropTypes from "prop-types";

export const AdminNavigationBar = (props) => {
    return (

        <nav className="h-1/2 w-full">
            <Navbar className="w-full px-0 md:px-6 bg-gray-50 dark:bg-gray-800">
                <div className="md:hidden">
                    <Navbar.Brand>
                        <div className="flex flex-row justify-center items-center">
                            <div className="h-10 sm:h-9">
                                <img src={logo} className="mr-3 h-10 sm:h-9 mb-3.5" alt="Report"/>
                            </div>
                            <span className="font-bold text-xl font-rubik">REPORTS</span>
                        </div>
                    </Navbar.Brand>
                </div>
                <div className="md:hidden flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar className="object-none"
                                    alt="User settings"
                                    placeholderInitials="LP"
                                    img={props.profile ?? profile}
                                    size="md"
                                    rounded bordered/>
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm"> {props.username} </span>
                            <span className="block truncate text-sm font-medium"> {props.email} </span>
                        </Dropdown.Header>
                        <Dropdown.Item>My Reports</Dropdown.Item>
                        <Dropdown.Divider/>
                        <Dropdown.Item>Sign out</Dropdown.Item>
                    </Dropdown>
                </div>
                <div className="hidden md:flex md:flex-row justify-between md:w-full items-center">
                    <div
                        className="space-y-1 font-semibold dark:text-white text-md text-start hidden md:block font-rubik">
                        <div> {props.username} </div>
                    </div>
                    <Avatar
                        className="object-none"
                        alt="User settings"
                        placeholderInitials="LP"
                        img={props.profile ?? profile}
                        size="md"
                        rounded bordered
                    >
                    </Avatar>
                </div>
            </Navbar>
        </nav>
    );
}

AdminNavigationBar.propTypes = {
    username: PropTypes.string,
    email: PropTypes.string,
    profile: PropTypes.string,
}

AdminNavigationBar.defaultProps = {
    username: 'User Name',
    email: 'name@rupp.edu.kh',
    profile: 'https://i.pinimg.com/originals/9f/c3/c2/9fc3c2d2989592e70c9464b23195a11c.jpg',
}