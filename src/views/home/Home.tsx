import { useEffect, useRef, useState } from 'react';
// Logo
import Logo from 'assets/img/logo/logo-white.png';
// Router
import { Link, useLocation } from 'react-router-dom';
// Icons
import { ReactComponent as AwardIcon } from 'assets/icons/award.svg';
import { ReactComponent as AddCartIcon } from 'assets/icons/add-cart.svg';
// Images
import promo from 'assets/img/others/promo.webp';
import sausagesImg from 'assets/img/others/sausages.webp';
import breadsImg from 'assets/img/others/breads.webp';
import aboutUsImg from 'assets/img/others/aside.webp';
// Components
import { ItemListContainer } from 'components/common/itemListContainer/ItemListContainer';
// Utils
import { isIOS } from 'utils/isIOS';
// Styles
import './Home.css';

export const Home = () => {
    const [loadingScreen, setLoadingScreen] = useState({
        loading: true,
        percentage: 0
    });
    
    const [isVisible, setIsVisible] = useState({
        hero: false,
        products: false,
        aboutUs: false
    });

    const aboutUs = useRef<HTMLElement>(null);
    const heroRef = useRef<HTMLElement>(null);
    const productsRef = useRef<HTMLElement>(null);

    const scrollToAboutUs = () => aboutUs?.current?.scrollIntoView({ behavior: 'smooth' });

    const location = useLocation();

    // Intersection Observer para animaciones
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.getAttribute('data-section');
                        if (typeof targetId === 'string') {
                            setIsVisible(prev => ({
                                ...prev,
                                [targetId]: true
                            }));
                        }
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        if (productsRef.current) observer.observe(productsRef.current);
        if (aboutUs.current) observer.observe(aboutUs.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        location.hash === '#about-us' ?
            scrollToAboutUs()
        :
            window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [location]);

    useEffect(() => {
        let loadingInterval = setInterval(() => {
            setLoadingScreen(prev => {
                if (prev.percentage < 100) {
                    return {
                        ...prev,
                        percentage: prev.percentage + 1
                    };
                } else {
                    setTimeout(() => {
                        setLoadingScreen(current => ({
                            ...current,
                            loading: false
                        }));
                        clearInterval(loadingInterval);
                    }, 750);
                    return prev;
                }
            });
        }, 20);

        setTimeout(() => {
            setLoadingScreen(prev => ({
                ...prev,
                percentage: 0
            }));
        }, 500);

        return () => clearInterval(loadingInterval);
    }, []);

    return (
        <>  
            {/* Loading Screen Mejorado */}
            <div 
                className={`home-loading ${!loadingScreen.loading ? 'fade-out' : ''}`}
                style={{
                    opacity: loadingScreen.loading ? 1 : 0,
                    pointerEvents: loadingScreen.loading ? 'auto' : 'none'
                }}
            >
                <div className="home-loading-content">
                    <div className="loading-logo-container">
                        <img src={Logo} alt="Los Krenz Logo" className="loading-logo" />
                        <div className="loading-glow"></div>
                    </div>
                    <div className="loading-progress">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill"
                                style={{ width: `${loadingScreen.percentage}%` }}
                            ></div>
                        </div>
                        <span className="loading-percentage">{loadingScreen.percentage}%</span>
                    </div>
                </div>
            </div>

            <div className="home">
                {/* Hero Section Mejorado */}
                <section 
                    ref={heroRef}
                    data-section="hero"
                    style={isIOS() ? {backgroundAttachment: 'initial'} : {}}
                    className={`hero-section ${isVisible.hero ? 'animate-in' : ''}`}
                >
                    <div className="hero-overlay"></div>
                    <div className="hero-particles"></div>
                    
                    <div className="hs-greeting">
                        <div className="hero-badge">
                            <AwardIcon className="badge-icon" />
                            <span>Calidad Premium</span>
                        </div>
                        
                        <h1 className="hero-title">
                            <span className="title-line">CARNICERÍA</span>
                            <span className="title-line title-highlight">LOS KRENZ</span>
                        </h1>
                        
                        <p className="hero-subtitle">
                            Tradición, calidad y frescura en cada corte desde hace más de 30 años
                        </p>
                        
                        <div className="hero-buttons">

                            <button className="btn btn-secondary" onClick={scrollToAboutUs}>
                                Conocenos
                            </button>
                        </div>
                    </div>
                </section>

                {/* Products Section Rediseñado */}
                <section 
                    ref={productsRef}
                    data-section="products"
                    className={`other-products-section ${isVisible.products ? 'animate-in' : ''}`}
                >
                    <div className="section-header">
                        <h2 className="section-title">Lo que nos hace únicos</h2>
                        <div className="section-divider"></div>
                    </div>
                    
                    <div className="ops-container">
                        {/* Promo Card */}
                        <div className="ops-card promo-card">
                            <div className="card-image-container">
                                <img src={promo} alt="Promoción especial" />
                                <div className="promo-badge">35% OFF</div>
                            </div>
                            <div className="ops-info">
                                <h3>Promo Especial</h3>
                                <p>Todos los sábados descuento especial</p>
                                <div className="promo-days">
                                    <span className="day-badge">Sábados</span>
                                </div>
                            </div>
                        </div>

                        {/* About Card */}
                        <div className="ops-card about-card">
                            <div className="card-header">
                                <h3>¿Quiénes somos?</h3>
                                <div className="header-decoration"></div>
                            </div>
                            
                            <div className="card-content">
                                <p>
                                    Somos <strong>mucho más que una carnicería</strong>. En Los Krenz encontrarás 
                                    también un mini supermercado con productos de almacén, panificados, 
                                    bebidas y una gran variedad de lácteos.
                                </p>
                                
                                <div className="features-grid">
                                    <div className="feature-item">
                                        <span className="feature-icon">🥩</span>
                                        <span>Carnes Premium</span>
                                    </div>
                                    <div className="feature-item">
                                        <span className="feature-icon">🥖</span>
                                        <span>Panificados</span>
                                    </div>
                                    <div className="feature-item">
                                        <span className="feature-icon">🥛</span>
                                        <span>Lácteos Frescos</span>
                                    </div>
                                    <div className="feature-item">
                                        <span className="feature-icon">🛒</span>
                                        <span>Almacén</span>
                                    </div>
                                </div>
                                
                                <div className="schedule-card">
                                    <div className="schedule-header">
                                        <span className="schedule-icon">🕒</span>
                                        <strong>Horarios de Atención</strong>
                                    </div>
                                    <div className="schedule-content">
                                        <div className="schedule-row">
                                            <span className="schedule-days">Lunes a Domingo</span>
                                            <span className="schedule-times">8:00 - 13:00 hs</span>
                                        </div>
                                        <div className="schedule-divider"></div>
                                        <div className="schedule-row">
                                            <span className="schedule-days"></span>
                                            <span className="schedule-times">16:00 - 21:00 hs</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Us Section Mejorado */}
                <section 
                    ref={aboutUs} 
                    data-section="aboutUs"
                    className={`about-us-section ${isVisible.aboutUs ? 'animate-in' : ''}`}
                >

                <div className="contact-grid">
                    {/* Ubicación */}
                    <div className="contact-card">
                        <div className="contact-icon">
                            {/* Aquí podés importar e insertar el ícono si lo tenés */}
                            {/* <LocationIcon /> */}
                        </div>
                        <div className="contact-info">
                            <h3>Ubicación</h3>
                            <a 
                                href="https://maps.app.goo.gl/255FBvBH1jPHcnds8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link"
                            >
                                Av. San Martin 397<br />
                                B2905 Gral. Rojo<br />
                                Provincia de Buenos Aires
                            </a>
                        </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="contact-card">
                        <div className="contact-icon">
                            {/* <WhatsAppIcon /> */}
                        </div>
                        <div className="contact-info">
                            <h3>WhatsApp</h3>
                            <a 
                                href="https://wa.me/5493364010459"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-link whatsapp-link"
                            >
                                +54 9 3364 01-0459
                                <span className="link-subtitle">¡Hacé tu pedido!</span>
                            </a>
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="contact-card">
                        <div className="contact-icon">
                            {/* <ClockIcon /> */}
                        </div>
                        <div className="contact-info">
                            <h3>Horarios</h3>
                            <div className="schedule-info">
                                <div className="schedule-row">
                                    <span>Lunes a Domingo</span>
                                    <span className="schedule-time">8:00 - 13:00</span>
                                </div>
                                <div className="schedule-row">
                                    <span></span>
                                    <span className="schedule-time">16:00 - 21:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </section>
            </div>
        </>
    );
};