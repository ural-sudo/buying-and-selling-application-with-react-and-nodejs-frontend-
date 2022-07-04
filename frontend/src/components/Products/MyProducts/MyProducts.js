import React, { useState, useEffect } from "react";
import "./MyProducts.css";
import MyProductsItem from "./MyProductsItem";
import MyProductsForm from "./MyProductsForm";
import { useParams } from "react-router-dom";

const MyProducts = () => {
  const params = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [products, setProducts] = useState([]);
  const onClikHandler = () => {
    setOpenForm((prevState) => {
      const state = !prevState;
      return state;
    });
  };
  const backDropClickHandler = () => {
    setOpenForm(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/product/my-products/${params.creatorId}`
      );
      const responseData = await response.json();
      setProducts(responseData);
      console.log(responseData);
    } catch (error) {
      
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productList = products.map((product) => (
    <MyProductsItem
      onClick={onClikHandler}
      key={product.id}
      id={product.id}
      title={product.title}
      price={product.price}
      imgUrl={product.imgUrl}
      description={product.description}
    />
  ));

  return (
    <React.Fragment>
      {openForm && (
        <div onClick={backDropClickHandler} className="backdrop"></div>
      )}
      {openForm && <MyProductsForm onAfterSubmit={backDropClickHandler} />}
      <ul className="product-list">
        <div className="add-new-product">
          <button onClick={onClikHandler}>ADD NEW PRODUCT </button>
        </div>
        {productList}
        {productList.length === 0 && <p>Henüz bir ürün girilmemiş</p>}
      </ul>
    </React.Fragment>
  );
};

export default MyProducts;
