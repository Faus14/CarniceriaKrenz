import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Components
import { ItemListContainer } from 'components/common/itemListContainer/ItemListContainer';
// Css
import './Shop.css';

export const Shop = () => {

    /* Obtain the category parameter from the
    url with useParams() hook. */
    const { category } = useParams();

    /* Hook to navigate to another path. */
    const navigate = useNavigate();

    /* Function that navigates to a category path in
    order to load his products. */
    const handleClickCategory = (category: string) => {
        navigate(`/shop/${category}`);
    }

    /* If the url param category isn't recognized => navigate to
    /shop/all. */
    useEffect(() => {
        (category !== 'all' && category !== 'wagyu' && category !== 'feedlot' && category !== 'standard' && category !== 'other') && navigate('/shop/all');
    }, [category, navigate])

    /* Scroll to top when the component
    is rendered for the first time. */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className="shop">

            {/* Shop Banner */}
            <div className="shop-banner"></div>

            {/* Nosotros Section */}
            <section className="shop-main">

                <div className="sm-header">
                    <div className="smh-line"></div>
                    <h1>Nosotros</h1>
                    <div className="smh-line"></div>
                </div>

                <div className="about-description">
                    <p>
                        En <strong>Carnicería Los Krenz</strong> nos apasiona brindar productos cárnicos de la más alta calidad.
                        Con más de 20 años de experiencia, nuestro compromiso es ofrecer cortes frescos y seleccionados cuidadosamente para satisfacer a todos nuestros clientes.
                    </p>
                    <p>
                        Nuestra prioridad es la excelencia en el servicio, la confianza y el trato cercano. Ya sea que busques cortes premium como Wagyu, carnes feedlot, estándar o productos especiales, aquí encontrarás la mejor selección.
                    </p>
                    <p>
                        Nos esforzamos día a día para que cada visita sea una experiencia única, garantizando frescura, sabor y calidad en cada pieza.
                    </p>
                </div>

<div className="contact-info">
    <h2>Contacto</h2>
    <p>
        <strong>Dirección:</strong>{' '}
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Av.+San+Martín+1234,+Rosario,+Santa+Fe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contact-link"
        >
          Av. San Martín 1234, Rosario, Santa Fe
        </a>
    </p>
    <p>
        <strong>Teléfono:</strong>{' '}
        <a 
          href="https://wa.me/543411234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="contact-link"
        >
          +54 341 123 4567
        </a>
    </p>
    <p>
        <strong>Email:</strong> contacto@carnicerialoskrenz.com
    </p>
</div>


                {/* Aquí podrías ocultar o quitar el catálogo si solo quieres mostrar 'Nosotros' */}
                <ItemListContainer category={category as string} limit={false} />

            </section>

        </div>
    )
}
