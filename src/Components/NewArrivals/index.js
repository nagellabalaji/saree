import "./NewArrivals.css";
import { FaHeart, FaEye, FaStar } from "react-icons/fa";
import saree4 from "../images/saree4.avif"
import saree8 from "../images/saree8.webp"
import saree3 from "../images/saree3.avif"
import saree5 from "../images/saree5.avif"

const products = [

{
id:1,
image: saree4,
name:"Designer Silk Saree",
price:5499,
rating:4.8
},

{
id:2,
image: saree8,
name:"Kanchipuram Saree",
price:6999,
rating:5.0
},

{
id:3,
image: saree3,
name:"Party Wear Saree",
price:3599,
rating:4.6
},

{
id:4,
image: saree5,
name:"Wedding Collection",
price:8999,
rating:5.0
}

];

const NewArrivals=()=>{

return(

<section className="new-arrivals">

<div className="arrival-title">

<h1>New Arrivals</h1>

<p>Fresh Collections Just Arrived</p>

</div>

<div className="arrival-grid">

{

products.map((item)=>(

<div
className="arrival-card"
key={item.id}
>

<span className="new-badge">
NEW
</span>

<div className="arrival-icons">

<FaHeart/>

<FaEye/>

</div>

<img
src={item.image}
alt={item.name}
/>

<div className="arrival-details">

<h3>{item.name}</h3>

<div className="arrival-rating">

<FaStar/>

<span>{item.rating}</span>

</div>

<h2>₹{item.price.toLocaleString()}</h2>

<button>

Add To Cart

</button>

</div>

</div>

))

}

</div>

</section>

)

}

export default NewArrivals;