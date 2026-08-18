import Categories from "../Categories";
import Features from "../Features";
import Footer from "../Footer";
import Hero from "../Hero";
import NewArrivals from "../NewArrivals";
import OfferBanner from "../OfferBanner";
import Subscribe from "../Subscribe";
import Testimonials from "../Testimonials";
import "./Home.css";
import HomeProducts from "./HomeProducts";


const Home = () => {
  return (
    <>
      {/* <section className="hero">

        <img
          src={dinosaur}
          alt="Banner"
          className="dinosaur-image"
        />

        <div className="hero-content">

          <h1>Discover Elegant Sarees</h1>

          <p>
            Timeless traditions blended with modern elegance.
            Shop our premium collection today.
          </p>

          <button>Shop Now</button>

        </div>

      </section> */}
        <Hero/>
        <Features/>
        <Categories/>
      {/* <section className="products-section">

        <div className="heading">

          <h1>Trending Collection</h1>

          <p>Find our latest designer sarees</p>

        </div> */}
        <HomeProducts />
        <OfferBanner/>
        <NewArrivals/>
        <Testimonials/>
        <Subscribe/>
        <Footer/>

      {/* </section> */}

    </>
  );
};

export default Home;