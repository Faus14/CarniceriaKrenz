import { useContext, useState } from 'react';
// Router
import { Link } from 'react-router-dom';
// Toasts
import { logoutToast } from 'utils/toasts';
// Logo
import logoWhite from 'assets/img/logo/logo-white.png';
// Icons
import { ReactComponent as HamburguerIcon } from 'assets/icons/hamburguer-menu.svg';
import { ReactComponent as LoginIcon } from 'assets/icons/login.svg';
import { ReactComponent as UserIcon } from 'assets/icons/user.svg';
import { ReactComponent as DropdownItemIcon } from 'assets/icons/arrow-right-circle.svg';
// Components
import { HamburguerMenuCanvas } from './components/HamburguerMenuCanvas/HamburguerMenuCanvas';
import { CartWidget } from './components/cartWidget/CartWidget';
import { UserInfo } from './components/userInfo/UserInfo';
// Auth
// Styles
import './NavBar.css';
import { LSModalContext } from 'contexts/LSModalContext';


export const NavBar = () => {

    // State that represents if the hamburguer menu is open or not.
    const [hamburguerMenuOpen, sethamburguerMenuOpen] = useState<boolean>(false);
    const openHamburguerMenu = () => sethamburguerMenuOpen(true);
    const closeHamburguerMenu = () => sethamburguerMenuOpen(false);

    // State that represents if the categories dropdown is open or not.
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const openDropdown = () => setDropdownOpen(true);
    const closeDropdown = () => setDropdownOpen(false);

    // Function openModal() from LSModalContext.
    const { openModal } = useContext(LSModalContext);

    // State that represents if the user info modal is open or not.
    const [userInfoOpen, setUserInfoOpen] = useState<boolean>(false);
    const toggleUserInfo = () => setUserInfoOpen(!userInfoOpen);
    const closeUserInfo = () => setUserInfoOpen(false);

    /* Login/Signup */

    // Get the user from AuthContext
    // logout() sets an empty user as logged user and closes de user info.
    const handleLogout = () => {
        closeUserInfo();
        logoutToast();
    };
    
    return (
        <>
            {/* Hamburguer Menu Canvas */}
            <HamburguerMenuCanvas hamburguerMenuOpen={hamburguerMenuOpen} closeHamburguerMenu={closeHamburguerMenu} />



            {/* Navbar */}
            <header className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <div className="nc-left">

                    </div>

                    {/* Navigation */}
                    <nav className="nc-right">
                        <Link className="navbar-link nbl-section" to='/'> Home </Link>
                        <Link className="navbar-link nbl-section" to='/shop'> Nosotros </Link>



   

                        {/* Hamburguer Menu */}
                        <button 
                            className="navbar-link hamburguer-menu" 
                            onClick={ () => openHamburguerMenu() }
                        >
                           <HamburguerIcon className="hamburguer-icon" />
                        </button>


                        {/* If there is a logged user => show the user button
                            Otherwise => show the login button */}

                       

                    
                    </nav>
                </div>
            </header>
        </>
    )
}
