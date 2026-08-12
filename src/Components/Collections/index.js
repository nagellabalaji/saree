import "./Collections.css";
import { useNavigate } from "react-router-dom";
import wedding from "../images/wedding.jpg"
import festival from "../images/festival.webp"
import designer from "../images/designer.webp"
import silk from "../images/silk.png"
import cotton from "../images/cotton.webp"
import office from "../images/office.jpg"

const Collections = () => {

    const navigate = useNavigate();

    const collections = [

        {
            id:1,
            name:"Wedding Collection",
            image: wedding,
            slug:"wedding"
        },

        {
            id:2,
            name:"Festival Collection",
            image: festival,
            slug:"festival"
        },

        {
            id:3,
            name:"Designer Sarees",
            image: designer,
            slug:"designer"
        },

        {
            id:4,
            name:"Silk Sarees",
            image: silk,
            slug:"silk"
        },

        {
            id:5,
            name:"Cotton Sarees",
            image: cotton,
            slug:"cotton"
        },

        {
            id:6,
            name:"Office Wear",
            image: office,
            slug:"office"
        }

    ];

    const openCollection = (slug) => {

        navigate(`/products?collection=${slug}`);

    };

    return (

        <section className="collections">

            <div className="collection-title">

                <h1>Shop By Collection</h1>

                <p>
                    Explore our exclusive collections for every occasion.
                </p>

            </div>

            <div className="collection-grid">

                {

                    collections.map((item)=>(

                        <div
                        key={item.id}
                        className="collection-card"
                        onClick={()=>openCollection(item.slug)}
                        >

                            <img
                            src={item.image}
                            alt={item.name}
                            />

                            <div className="collection-overlay">

                                <h2>{item.name}</h2>

                            </div>

                        </div>

                    ))

                }

            </div>

        </section>

    );

};

export default Collections;