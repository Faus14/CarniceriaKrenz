// Router
import { Link } from 'react-router-dom';
// Icons
import { ReactComponent as GithubIcon } from 'assets/icons/github.svg';
// Logo
import logoWhite from 'assets/img/logo/logo-white.png';
// Styles
import './Footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Footer Developed By */}
                <div className="footer-developed-by">
                    <p>Desarrollado por Fausto Saludas</p>
                    <a href="https://github.com/Faus14"
                       target="_blank" 
                       rel="noreferrer"
                       className="github-btn"
                    >
                        <GithubIcon className="github-icon" />
                    </a>
                </div>
            </div>
        </footer>
    )
}
