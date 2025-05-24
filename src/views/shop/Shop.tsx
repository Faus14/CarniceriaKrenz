import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Images
import aboutUsImg from 'assets/img/others/aside.webp';

// CSS
import './Shop.css';

export const Shop = () => {
    const { category } = useParams();
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState({
        hero: false,
        about: false,
        values: false,
        contact: false,
        products: false
    });

    const heroRef = useRef<HTMLElement>(null);
    const aboutRef = useRef<HTMLElement>(null);
    const valuesRef = useRef<HTMLElement>(null);
    const contactRef = useRef<HTMLElement>(null);
    const productsRef = useRef<HTMLElement>(null);

    // Observador de intersección para animaciones al hacer scroll
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
            { threshold: 0.2 }
        );

        const refs = [heroRef, aboutRef, valuesRef, contactRef, productsRef];
        refs.forEach(ref => {
            if (ref.current) observer.observe(ref.current);
        });

        return () => observer.disconnect();
    }, []);

    // Redirección si la categoría no es válida
    useEffect(() => {
        const validCategories = ['all', 'wagyu', 'feedlot', 'standard', 'other'];
        if (category && !validCategories.includes(category)) {
            navigate('/shop/all');
        }
    }, [category, navigate]);

    // Scroll al top al renderizar
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    // Títulos de categoría
    const categoryTitles = {
        all: 'Todos los Productos',
        wagyu: 'Carnes Wagyu Premium',
        feedlot: 'Carnes Feedlot',
        standard: 'Cortes Tradicionales',
        other: 'Otros Productos'
    };

    const getCurrentCategoryTitle = () => {
        return categoryTitles[category as keyof typeof categoryTitles] || 'Nuestros Productos';
    };

    return (
        <div className="shop">
            {/* Sección Hero */}
            <section
                ref={heroRef}
                data-section="hero"
                className={`shop-hero ${isVisible.hero ? 'animate-in' : ''}`}
            >
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <div className="hero-badge">
                        <span>Calidad Garantizada</span>
                    </div>
                    <h1 className="hero-title">
                        <span className="title-line">Carnicería</span>
                        <span className="title-line title-highlight">Los Krenz</span>
                    </h1>
                    <p className="hero-subtitle">
                        Tradición familiar, sabores auténticos y la mejor selección de carnes premium
                    </p>
                </div>
            </section>

                    <div className="aus-container">
                        <div className="aus-grid">
                            <div className="aus-image-container">
                                <img src={aboutUsImg} alt="Sobre nosotros" className="aus-image" />
                                <div className="image-overlay"></div>
                            </div>

                            <div className="aus-info">
                                <div className="aus-header">
                                    <span className="section-tag">Nuestra Historia</span>
                                    <h2 className="aus-title">Sobre Nosotros</h2>
                                </div>
                                
                                <div className="aus-content">
                                    <p className="aus-text">
                                        Nos <strong>apasiona brindar productos frescos y de calidad</strong> a nuestra 
                                        comunidad. Cada corte, cada elaboración y cada servicio está pensado 
                                        con amor y dedicación.
                                    </p>
                                    
                                    <p className="aus-text">
                                        Trabajamos día a día para ofrecerte lo mejor, porque creemos que 
                                        todos merecen una buena comida. <strong>¡Gracias por elegirnos!</strong>
                                    </p>
                                    
                                    <div className="aus-stats">
                                        <div className="stat-item">
                                            <span className="stat-number">10+</span>
                                            <span className="stat-label">Años de experiencia</span>
                                        </div>
                                        <div className="stat-divider"></div>
                                        <div className="stat-item">
                                            <span className="stat-number">100%</span>
                                            <span className="stat-label">Productos frescos</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

        
        </div>
    );
};
