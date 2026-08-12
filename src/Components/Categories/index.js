import "./Categories.css";
import lehengas from "../images/lehengas.jpg"
import kurti from "../images/kurti.webp"
import saree8 from "../images/saree8.webp"
import gowns from "../images/gowns.webp"

const categories = [
  {
    id: 1,
    name: "Sarees",
    image: saree8
  },
  {
    id: 2,
    name: "Kurtis",
    image: kurti
  },
  {
    id: 3,
    name: "lehengas",
    image: lehengas
  },
  {
    id: 4,
    name: "Gowns",
    image: gowns
  }
];

const Categories = () => {

    return(

        <section className="categories">

            <div className="category-heading">

                <h1>Shop By Category</h1>

                <p>Find Your Perfect Outfit</p>

            </div>

            <div className="category-container">

                {
                    categories.map((item)=>(
                        <div
                        className="category-card"
                        key={item.id}
                        >

                            <img
                            src={item.image}
                            alt={item.name}
                            />

                            <div className="category-overlay">

                                <h2>{item.name}</h2>

                                <button>Shop Now</button>

                            </div>

                        </div>
                    ))
                }

            </div>

        </section>

    )

}

export default Categories;