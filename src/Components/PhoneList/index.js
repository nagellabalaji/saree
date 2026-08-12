import iphone from "../images/iphone.jpg"
import samsung from "../images/samsung.jpg"
import oneplus from "../images/oneplus.webp"
import googlepixel from "../images/googlepixel.jpg"
import iqoo from "../images/iqoo.jpg"
import realme from "../images/realme.jpg"
import redmi from "../images/redmi.jpg"
import vivo from "../images/vivo.jpg"
import oppo from "../images/oppo.jpg"
import nothing from "../images/nothing.jpg"
import motorola from "../images/motorola.jpg"
import iphonefourteen from "../images/iphonefourteen.webp"
import samsunggalaxy from "../images/samsunggalaxy.jpg"
import pocopro from "../images/pocopro.jpg"
import infinix from "../images/infinix.webp"
import asus from "../images/asus.png"
import realmenew from "../images/realmenew.jpg"
import redmiax from "../images/redmiax.jpg"
import oneplusnord from "../images/oneplusnord.png"
import vivonew from "../images/vivonew.png"

import "./PhoneList.css"
const phones = [
  {
    id: 1,
    image: iphone,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Smartphone",
    price: 134999,
    colour: "Natural Titanium",
    storage: "256GB",
    ram: "8GB",
    display: "6.1-inch OLED",
    processor: "A17 Pro",
    battery: "3274mAh",
    camera: "48MP + 12MP + 12MP",
    rating: 4.9,
    reviews: 4250,
    stock: 25,
    discount: 5
  },
  {
    id: 2,
    image: samsung,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphone",
    price: 129999,
    colour: "Titanium Black",
    storage: "512GB",
    ram: "12GB",
    display: "6.8-inch AMOLED",
    processor: "Snapdragon 8 Gen 3",
    battery: "5000mAh",
    camera: "200MP + 50MP + 12MP + 10MP",
    rating: 4.8,
    reviews: 3980,
    stock: 18,
    discount: 10
  },
  {
    id: 3,
    image: oneplus,
    name: "OnePlus 12",
    brand: "OnePlus",
    category: "Smartphone",
    price: 64999,
    colour: "Silky Black",
    storage: "256GB",
    ram: "12GB",
    display: "6.82-inch AMOLED",
    processor: "Snapdragon 8 Gen 3",
    battery: "5400mAh",
    camera: "50MP + 64MP + 48MP",
    rating: 4.7,
    reviews: 2870,
    stock: 30,
    discount: 12
  },
  {
    id: 4,
    image: googlepixel,
    name: "Google Pixel 8 Pro",
    brand: "Google",
    category: "Smartphone",
    price: 106999,
    colour: "Obsidian",
    storage: "256GB",
    ram: "12GB",
    display: "6.7-inch OLED",
    processor: "Google Tensor G3",
    battery: "5050mAh",
    camera: "50MP + 48MP + 48MP",
    rating: 4.8,
    reviews: 2130,
    stock: 20,
    discount: 8
  },
  {
    id: 5,
    image: iqoo,
    name: "iQOO 12",
    brand: "iQOO",
    category: "Smartphone",
    price: 54999,
    colour: "Alpha",
    storage: "256GB",
    ram: "12GB",
    display: "6.78-inch AMOLED",
    processor: "Snapdragon 8 Gen 3",
    battery: "5000mAh",
    camera: "50MP + 64MP + 50MP",
    rating: 4.6,
    reviews: 1950,
    stock: 42,
    discount: 15
  },
  {
    id: 6,
    image: realme,
    name: "Realme GT 6",
    brand: "Realme",
    category: "Smartphone",
    price: 40999,
    colour: "Silver",
    storage: "256GB",
    ram: "12GB",
    display: "6.78-inch AMOLED",
    processor: "Snapdragon 8s Gen 3",
    battery: "5500mAh",
    camera: "50MP + 8MP + 50MP",
    rating: 4.5,
    reviews: 1650,
    stock: 35,
    discount: 18
  },
  {
    id: 7,
    image: redmi,
    name: "Redmi Note 13 Pro+",
    brand: "Xiaomi",
    category: "Smartphone",
    price: 31999,
    colour: "Purple",
    storage: "256GB",
    ram: "12GB",
    display: "6.67-inch AMOLED",
    processor: "Dimensity 7200 Ultra",
    battery: "5000mAh",
    camera: "200MP + 8MP + 2MP",
    rating: 4.4,
    reviews: 3200,
    stock: 55,
    discount: 20
  },
  {
    id: 8,
    image: vivo,
    name: "Vivo X100",
    brand: "Vivo",
    category: "Smartphone",
    price: 63999,
    colour: "Asteroid Black",
    storage: "256GB",
    ram: "12GB",
    display: "6.78-inch AMOLED",
    processor: "Dimensity 9300",
    battery: "5000mAh",
    camera: "50MP + 64MP + 50MP",
    rating: 4.7,
    reviews: 1490,
    stock: 28,
    discount: 9
  },
  {
    id: 9,
    image: oppo,
    name: "Oppo Reno 11 Pro",
    brand: "Oppo",
    category: "Smartphone",
    price: 39999,
    colour: "Pearl White",
    storage: "256GB",
    ram: "12GB",
    display: "6.7-inch AMOLED",
    processor: "Dimensity 8200",
    battery: "4600mAh",
    camera: "50MP + 32MP + 8MP",
    rating: 4.5,
    reviews: 1230,
    stock: 34,
    discount: 11
  },
  {
    id: 10,
    image: nothing,
    name: "Nothing Phone (2)",
    brand: "Nothing",
    category: "Smartphone",
    price: 44999,
    colour: "White",
    storage: "256GB",
    ram: "12GB",
    display: "6.7-inch OLED",
    processor: "Snapdragon 8+ Gen 1",
    battery: "4700mAh",
    camera: "50MP + 50MP",
    rating: 4.6,
    reviews: 1800,
    stock: 40,
    discount: 14
  },
  {
    id: 11,
    image: motorola,
    name: "Motorola Edge 50 Pro",
    brand: "Motorola",
    category: "Smartphone",
    price: 35999,
    colour: "Black Beauty",
    storage: "256GB",
    ram: "8GB",
    display: "6.7-inch pOLED",
    processor: "Snapdragon 7 Gen 3",
    battery: "4500mAh",
    camera: "50MP + 13MP + 10MP",
    rating: 4.5,
    reviews: 1100,
    stock: 45,
    discount: 16
  },
  {
    id: 12,
    image: iphonefourteen,
    name: "iPhone 14",
    brand: "Apple",
    category: "Smartphone",
    price: 69999,
    colour: "Blue",
    storage: "128GB",
    ram: "6GB",
    display: "6.1-inch OLED",
    processor: "A15 Bionic",
    battery: "3279mAh",
    camera: "12MP + 12MP",
    rating: 4.8,
    reviews: 5200,
    stock: 22,
    discount: 13
  },
  {
    id: 13,
    image: samsunggalaxy,
    name: "Samsung Galaxy A55",
    brand: "Samsung",
    category: "Smartphone",
    price: 39999,
    colour: "Ice Blue",
    storage: "256GB",
    ram: "8GB",
    display: "6.6-inch AMOLED",
    processor: "Exynos 1480",
    battery: "5000mAh",
    camera: "50MP + 12MP + 5MP",
    rating: 4.5,
    reviews: 1400,
    stock: 38,
    discount: 10
  },
  {
    id: 14,
    image: pocopro,
    name: "Poco X6 Pro",
    brand: "Poco",
    category: "Smartphone",
    price: 27999,
    colour: "Yellow",
    storage: "256GB",
    ram: "12GB",
    display: "6.67-inch AMOLED",
    processor: "Dimensity 8300 Ultra",
    battery: "5000mAh",
    camera: "64MP + 8MP + 2MP",
    rating: 4.6,
    reviews: 2500,
    stock: 60,
    discount: 22
  },
  {
    id: 15,
    image: infinix,
    name: "Infinix GT 20 Pro",
    brand: "Infinix",
    category: "Gaming Phone",
    price: 24999,
    colour: "Mecha Blue",
    storage: "256GB",
    ram: "12GB",
    display: "6.78-inch AMOLED",
    processor: "Dimensity 8200 Ultimate",
    battery: "5000mAh",
    camera: "108MP + 2MP + 2MP",
    rating: 4.4,
    reviews: 900,
    stock: 65,
    discount: 18
  },
  {
    id: 16,
    image: asus,
    name: "ASUS ROG Phone 8",
    brand: "ASUS",
    category: "Gaming Phone",
    price: 94999,
    colour: "Phantom Black",
    storage: "512GB",
    ram: "16GB",
    display: "6.78-inch AMOLED",
    processor: "Snapdragon 8 Gen 3",
    battery: "5500mAh",
    camera: "50MP + 32MP + 13MP",
    rating: 4.8,
    reviews: 800,
    stock: 12,
    discount: 7
  },
  {
    id: 17,
    image: realmenew,
    name: "Realme C67",
    brand: "Realme",
    category: "Budget Phone",
    price: 14999,
    colour: "Sunny Oasis",
    storage: "128GB",
    ram: "8GB",
    display: "6.72-inch IPS LCD",
    processor: "Snapdragon 685",
    battery: "5000mAh",
    camera: "108MP + 2MP",
    rating: 4.3,
    reviews: 1700,
    stock: 90,
    discount: 25
  },
  {
    id: 18,
    image: redmiax,
    name: "Redmi A3X",
    brand: "Xiaomi",
    category: "Budget Phone",
    price: 7499,
    colour: "Olive Green",
    storage: "64GB",
    ram: "4GB",
    display: "6.71-inch LCD",
    processor: "Unisoc T603",
    battery: "5000mAh",
    camera: "8MP",
    rating: 4.1,
    reviews: 850,
    stock: 110,
    discount: 30
  },
  {
    id: 19,
    image: oneplusnord,
    name: "OnePlus Nord CE4",
    brand: "OnePlus",
    category: "Mid Range",
    price: 24999,
    colour: "Dark Chrome",
    storage: "256GB",
    ram: "8GB",
    display: "6.7-inch AMOLED",
    processor: "Snapdragon 7 Gen 3",
    battery: "5500mAh",
    camera: "50MP + 8MP",
    rating: 4.5,
    reviews: 2150,
    stock: 58,
    discount: 17
  },
  {
    id: 20,
    image: vivonew,
    name: "Vivo T3",
    brand: "Vivo",
    category: "Mid Range",
    price: 19999,
    colour: "Crystal Blue",
    storage: "128GB",
    ram: "8GB",
    display: "6.67-inch AMOLED",
    processor: "Dimensity 7200",
    battery: "5000mAh",
    camera: "50MP + 2MP",
    rating: 4.4,
    reviews: 1600,
    stock: 72,
    discount: 20
  }
];


const PhoneList = () => {
  return (
    <div className="Phone-Container">
      {phones.map((phone) => (
        <div className="phone-card" key={phone.id}>
            
    <div className="image-container">
        <img src={phone.image} alt={phone.name} />
    </div>

    <div className="phone-details">

        <h2 className="phone-name">{phone.name}</h2>

        <p><span>Brand:</span> {phone.brand}</p>
        <p><span>Category:</span> {phone.category}</p>
        <p className="price">₹{phone.price.toLocaleString()}</p>

        <div className="extra-details">
            <p><span>Colour:</span> {phone.colour}</p>
            <p><span>Storage:</span> {phone.storage}</p>
            <p><span>Rating:</span> ⭐ {phone.rating}</p>
            <p><span>Reviews:</span> {phone.reviews}</p>
            <p><span>Stock:</span> {phone.stock}</p>
            <p><span>Discount:</span> {phone.discount}% OFF</p>
        </div>

    </div>

</div>
      ))}
    </div>
  );
};

export default PhoneList
