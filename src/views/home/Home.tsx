// Componente editado por Fausto

import { useEffect, useRef, useState } from 'react';
// Logo
import Logo from 'assets/img/logo/logo-white.png';
// Router
import { Link, useLocation } from 'react-router-dom';
// Icons
import { ReactComponent as AwardIcon } from 'assets/icons/award.svg';
import { ReactComponent as AddCartIcon } from 'assets/icons/add-cart.svg';
// Images
import provoloneCheesesImg from 'assets/img/others/provolone.webp';
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

    const aboutUs = useRef<HTMLElement>(null);

    const scrollToAboutUs = () => aboutUs?.current?.scrollIntoView();

    const location = useLocation();

    useEffect(() => {
        location.hash === '#about-us' ?
            scrollToAboutUs()
        :
            window.scrollTo(0, 0);
    }, [location])

    useEffect(() => {
        let loadingInterval = setInterval(() => {
            loadingScreen.percentage < 100 ? 
                setLoadingScreen({
                    ...loadingScreen,
                    percentage: loadingScreen.percentage++
                })
            : 
                setTimeout(() => {
                    setLoadingScreen({
                        ...loadingScreen,
                        loading: false
                    })
                    clearInterval(loadingInterval);
                }, 750)
        }, 20);

        setTimeout(() => {
            setLoadingScreen({
                ...loadingScreen,
                percentage: 0
            })
        }, 500);
    }, [])

    return (
        <>  
            <div style={loadingScreen.loading ? {} : {opacity: '0', pointerEvents: 'none'}} className="home-loading">
                <div className="home-loading-content">
                    <img src={Logo} alt="" />
                    <span>{loadingScreen.percentage}%</span>   
                </div>
            </div>

            <div className="home">

                {/* Hero Section */}
                <section 
                    style={isIOS() ? {backgroundAttachment: 'initial'} : {}}
                    className="hero-section"
                >
                    <div className="hs-greeting">
                        <h1>CARNICERIA LOS KRENZ</h1>
                        <Link className="button hsg-search-meats-btn" to='/shop/all'>Nosotros</Link>    
                    </div>
                </section>

                {/* Other Products Section */}
                <section className="other-products-section">
                    <div className="ops-products">

                        <div className="op-item">
                            <img src={provoloneCheesesImg} alt="Provolone Cheese" />
                            <div className="op-item-info">
                                <h3>Promo especial</h3>
                                <span>40% off los sábados</span>
                            </div>
                        </div> 

                        <div className="op-item">
                            <img src={sausagesImg} alt="Sausages" />
                            <div className="op-item-info">
                                <h3>Chorizos</h3>
                                <span>Desde $8.90/Kg</span>
                            </div>
                        </div>  

                        <div className="op-item">
                            <img src={breadsImg} alt="Breads" />
                            <div className="op-item-info">
                                <h3>Panificados</h3>
                                <span>Desde $10.60/Kg</span>
                            </div>
                        </div>     

                    </div>
                </section>

                {/* About Us Section */}
                <section ref={aboutUs} className="about-us-section">
                    <div className="aus-grid">
                        <img src={aboutUsImg} alt="Sobre nosotros" />

                        <div className="aus-info">
                            <h2>Sobre nosotros</h2>
                            <p>Nos apasiona brindar productos frescos y de calidad a nuestra comunidad. Cada corte, cada elaboración y cada servicio está pensado con amor y dedicación.</p>
                            <p>Trabajamos día a día para ofrecerte lo mejor, porque creemos que todos merecen una buena comida. ¡Gracias por elegirnos!</p>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}
