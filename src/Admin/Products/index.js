import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch
} from "react-icons/fa";

import Sidebar from "../Components/Sidebar";
import "./Products.css";

import { BASE_URL, headers } from "../../api/Supabase";
import ConfirmModal from "../Components/ConfirmModal";
import { toast } from "react-toastify";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  // ======================================
// DELETE MODAL
// ======================================

const [showModal, setShowModal] = useState(false);

const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

        console.log("BASE URL:", BASE_URL);

        const res = await axios.get(
            `${BASE_URL}/products?select=*`,
            {
                headers
            }
        );

        console.log("PRODUCT RESPONSE:", res.data);

        console.log("PRODUCT COUNT:", res.data.length);

        setProducts(res.data);

    } catch (error) {

        console.log("PRODUCT ERROR:", error);

        console.log("STATUS:", error.response?.status);

        console.log("ERROR DATA:", error.response?.data);

    }

};

  const filteredProducts = products.filter(

    (product)=>

      product.title

      .toLowerCase()

      .includes(

        search.toLowerCase()

      )

  );
// ======================================
// OPEN DELETE MODAL
// ======================================

const deleteProduct = (product) => {

    setSelectedProduct(product);

    setShowModal(true);

};

// ======================================
// CONFIRM DELETE
// ======================================

const confirmDelete = async () => {

    try{

        const res = await axios.delete(
    `${BASE_URL}/products?id=eq.${selectedProduct.id}`,
    {
        headers
    }
);

console.log("DELETE RESPONSE:", res);
await fetchProducts();

        setProducts(

            products.filter(

                item => item.id !== selectedProduct.id

            )

        );

        toast.success("Product Deleted Successfully");

    }

    catch (error) {

    console.log(error);

    console.log(error.response);

    console.log(error.response?.status);

    console.log(error.response?.data);

    toast.error("Unable to Delete Product");

}

    finally{

        setShowModal(false);

        setSelectedProduct(null);

    }

};

  return(

    <div className="admin-layout">

      <Sidebar/>

      <div className="admin-products">

        <div className="products-header">

          <h1>Manage Products</h1>

          <Link
            to="/admin/add-product"
            className="add-product-btn"
          >

            <FaPlus/>

            Add Product

          </Link>

        </div>

        <div className="search-box-admin">

          <FaSearch/>

          <input

            type="text"

            placeholder="Search Products..."

            value={search}

            onChange={(e)=>setSearch(e.target.value)}

          />

        </div>

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Image</th>

              <th>Title</th>

              <th>Price</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredProducts.map(product=>(

                <tr key={product.id}>

                  <td>{product.id}</td>

                  <td>

                    <img

                      src={product.image}

                      alt=""

                    />

                  </td>

                  <td>{product.title}</td>

                  <td>₹{product.price}</td>

                  <td>

                    <button className="edit-btn">

                      <FaEdit/>

                    </button>

                    <button
    className="delete-btn"
    onClick={() => deleteProduct(product)}
>
    <FaTrash/>
</button>
                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

        <ConfirmModal

    isOpen={showModal}

    title="Delete Product"

    message={
        selectedProduct
        ?
        `Are you sure you want to delete "${selectedProduct.title}"? This action cannot be undone.`
        :
        ""
    }

    onCancel={() => {

        setShowModal(false);

        setSelectedProduct(null);

    }}

    onConfirm={confirmDelete}

/>

      </div>

    </div>

  );

};

export default AdminProducts;