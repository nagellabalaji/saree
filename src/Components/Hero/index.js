import { useEffect, useState } from "react";
import "./Hero.css";

import hero1 from "../images/hero1.avif";
import hero2 from "../images/hero2.avif";
import hero3 from "../images/hero3.jpg";

const slides = [
  {
    image: hero1,
    title: "Best Seller Sarees",
    subtitle: "Timeless elegance. Loved by thousands."
  },
  {
    image: hero2,
    title: "Wedding Collection",
    subtitle: "Premium Silk Sarees For Every Occasion."
  },
  {
    image: hero3,
    title: "New Arrival",
    subtitle: "Exclusive Collection Just For You."
  }
];

const Hero = () => {

  const [current,setCurrent]=useState(0);

  useEffect(()=>{

    const interval=setInterval(()=>{

      setCurrent((prev)=>
        prev===slides.length-1 ? 0 : prev+1
      );

    },4000);

    return ()=>clearInterval(interval);

  },[]);

  const previousSlide=()=>{

    setCurrent(
      current===0 ? slides.length-1 : current-1
    );

  }

  const nextSlide=()=>{

    setCurrent(
      current===slides.length-1 ? 0 : current+1
    );

  }

  return(

    <section className="hero">

      <img
      src={slides[current].image}
      alt=""
      className="hero-image"
      />

      <div className="overlay"></div>

      <div className="hero-content">

        <h4>{slides[current].subtitle}</h4>

        <h1>{slides[current].title}</h1>

        <button>SHOP NOW</button>

      </div>

      <button
      className="left-arrow"
      onClick={previousSlide}
      >
      ❮
      </button>

      <button
      className="right-arrow"
      onClick={nextSlide}
      >
      ❯
      </button>

      <div className="dots">

        {slides.map((_,index)=>(

          <span
          key={index}
          className={
            current===index
            ?
            "dot active"
            :
            "dot"
          }
          onClick={()=>setCurrent(index)}
          ></span>

        ))}

      </div>

    </section>

  )

}

export default Hero;