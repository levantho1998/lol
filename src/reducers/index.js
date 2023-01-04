import { combineReducers } from "redux";
import statusCartItem from "./toggleCartitem";
import Form from "./changeForm";
import products from "./products";
import cart from "./cart";
import statusProfileForm from "./toggleProfileForm";
import user from "./user";
import order from "./order";
import isCheckout from "./isCheckout";
import customers from "./customers";
import isOpenFormProduct from "./isOpenFormProduct";
import isOpenFormCategory from "./isOpenFormCategory";
import productEditing from "./productEditing";
import category from "./category";
import hotProd from "./hotProd";

const appReducers = combineReducers({
  statusCartItem,
  Form,
  products,
  cart,
  statusProfileForm,
  user,
  order,
  isCheckout,
  customers,
  isOpenFormProduct,
  productEditing,
  isOpenFormCategory,
  category,
  hotProd,
});

export default appReducers;
