import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Imágenes
import aboutUsImg from 'assets/img/others/imagen1.jpeg';
import aboutUsImg2 from 'assets/img/others/imagen2.jpeg';
import aboutUsImg3 from 'assets/img/others/imagen3.jpeg';
import aboutUsImg4 from 'assets/img/others/imagen4.jpeg';

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

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const targetId = entry.target.getAttribute('data-section');
                        if (typeof targetId === 'string') {
                            setIsVisible(prev => ({ ...prev, [targetId]: true }));
                        }
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (heroRef.current) observer.observe(heroRef.current);
        if (aboutRef.current) observer.observe(aboutRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const validCategories = ['all', 'wagyu', 'feedlot', 'standard', 'other'];
        if (category && !validCategories.includes(category)) {
            navigate('/shop/all');
        }
    }, [category, navigate]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    return (
        <div className="shop">
            {/* Hero */}
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

            {/* Sobre Nosotros */}
            <section
                ref={aboutRef}
                data-section="about"
                className={`shop-about ${isVisible.about ? 'animate-in' : ''}`}
            >
                <div className="about-images-grid">
                    {[aboutUsImg, aboutUsImg2, aboutUsImg3, aboutUsImg4].map((img, i) => (
                        <img key={i} src={img} alt={`Sobre nosotros ${i + 1}`} className="about-img" />
                    ))}
                </div>

                <div className="about-text">
                    <h2>Sobre Nosotros</h2>
                    <p>
                        En Los Krenz, combinamos experiencia, tradición y pasión para ofrecer productos frescos, de calidad
                        y con el sabor que nuestra comunidad merece. Gracias por confiar en nosotros.
                    </p>
                </div>
            </section>
        </div>
    );
};
