import * as Types from "../constants/ActionTypes";
import callApi from "../utils/apiCaller";

export const actOpenCartItem = () => {
  return {
    type: Types.OPEN_CARTITEM,
  };
};

export const actCloseCartItem = () => {
  return {
    type: Types.CLOSE_CARTITEM,
  };
};

export const actOpenFormSignUp = () => {
  return {
    type: Types.OPEN_FORM_SIGNUP,
  };
};

export const actOpenFormSignIn = () => {
  return {
    type: Types.OPEN_FORM_SIGNIN,
  };
};

export const actFilterCategoryRequest = (category) => {
  return async (dispatch) => {
    const res = await callApi(`api/product?category=${category}`, "GET", null);
    let products = res.data;
    console.log(products);
    dispatch(actFilterCategory(products));
  };
};

export const actFilterCategory = (products) => {
  return {
    type: Types.FILTER_CATEGORY,
    products,
  };
};

export const actGetAllProductRequest = () => {
  return async (dispatch) => {
    const res = await callApi("api/product", "GET", null);
    let products = res.data;
    dispatch(actGetAllProduct(products));
  };
};

export const actGetAllProduct = (products) => {
  return {
    type: Types.GET_ALL_PRODUCT,
    products,
  };
};

export const actFindProductRequest = (name) => {
  return async (dispatch) => {
    const res = await callApi(`api/product?name=${name}`);
    let product = res.data;
    dispatch(actFindProduct(product));
  };
};

export const actFindProduct = (product) => {
  return {
    type: Types.FIND_PRODUCT,
    product,
  };
};

export const actAddToCart = (product, quantity) => {
  return {
    type: Types.ADD_TO_CART,
    product,
    quantity,
  };
};

export const actDecreaseCart = (product, quantity) => {
  return {
    type: Types.DECREASE_CART,
    product,
    quantity,
  };
};

export const actDeleteCart = (product) => {
  return {
    type: Types.DELETE_CART,
    product,
  };
};

export const actRemoveAllCart = () => {
  return {
    type: Types.REMOVE_ALL_CART,
  };
};

export const actGetOneProduct = (id) => {
  return {
    type: Types.GET_ONE_PRODUCT,
    id,
  };
};

export const actCartBtnClick = () => {
  return {
    type: Types.CARTBTN_CLICK,
  };
};

export const actToggleProfileForm = () => {
  return {
    type: Types.TOGGLE_PROFILE_FORM,
  };
};

export const actLoginRequest = (account) => {
  return (dispatch) => {
    callApi("api/auth/sign-in", "POST", account)
      .then((res) => {
        dispatch(actLogin(res.data)); // res.data = user
      })
      .catch((error) => console.log(error.response.data.message));
  };
};

export const actLogin = (user) => {
  return {
    type: Types.LOGIN,
    user,
  };
};

export const actLogout = () => {
  return {
    type: Types.LOGOUT,
  };
};

export const actCreateOrder = (order) => {
  return {
    type: Types.CREATE_ORDER,
    order,
  };
};

export const actGetAllOrderRequest = (user) => {
  return async (dispatch) => {
    console.log(user.email);
    const res = await callApi(`api/order?email=${user.email}`, "GET", null);
    let orders = res.data;
    console.log(orders);
    dispatch(actGetAllOrder(orders));
  };
};

export const actGetAllOrder = (orders) => {
  return {
    type: Types.GET_ALL_ORDER,
    orders,
  };
};

export const actGetAllOrderRequestAdmin = (user) => {
  return async (dispatch) => {
    const res = await callApi(`api/order`, "GET", null);
    let orders = res.data;
    console.log(orders);
    dispatch(actGetAllOrderAdmin(orders));
  };
};

export const actGetAllOrderAdmin = (orders) => {
  return {
    type: Types.GET_ALL_ORDER_ADMIN,
    orders,
  };
};

export const actUpdateUserRequest = (newUserInfo) => {
  return async (dispatch) => {
    const res = await callApi("api/auth/update-user", "PUT", newUserInfo);
    let oldUser = JSON.parse(localStorage.getItem("user"));
    let token = oldUser.accessToken;
    let userUpdated = res.data;
    userUpdated.accessToken = token;
    dispatch(actUpdateUser(userUpdated));
  };
};

export const actUpdateUser = (user) => {
  return {
    type: Types.UPDATE_USERPROFILE,
    user,
  };
};

export const actCheckoutClick = () => {
  return {
    type: Types.CHECKOUT_CLICK,
  };
};

export const actGetAllCustomersRequest = () => {
  return async (dispatch) => {
    const res = await callApi("api/auth", "GET", null);
    const customers = res.data;
    console.log(customers);
    dispatch(actGetAllCustomers(customers));
  };
};

export const actGetAllCustomers = (customers) => {
  return {
    type: Types.GET_ALL_CUSTOMERS,
    customers,
  };
};

export const actFilterProductsAdminRequest = (keyword, category, priceType) => {
  console.log(keyword, category, priceType);
  return async (dispatch) => {
    const res = await callApi(
      `api/product?name=${keyword}&category=${category}&sortBy=${
        priceType && priceType !== "Price" ? "price" : ""
      }&sort=${priceType && priceType !== "Price" ? priceType : ""}`
    );
    let products = res.data;
    dispatch(actFilterProductsAdmin(products));
  };
};

export const actFilterProductsAdmin = (products) => {
  return {
    type: Types.FILTER_PRODUCTS_ADMIN,
    products,
  };
};

export const actFilterProductByNameAdminRequest = (keyword) => {
  return async (dispatch) => {
    const res = await callApi(`api/product?name=${keyword}`);
    let products = res.data;
    dispatch(actFilterProductByNameAdmin(products));
  };
};

export const actFilterProductByNameAdmin = (products) => {
  return {
    type: Types.FILTER_PRODUCTS_BY_NAME,
    products,
  };
};

export const actFilterOrdersRequest = (payment_method, amount, email) => {
  if (payment_method === "Payment Method") {
    payment_method = "";
  }
  if (payment_method === "Online Payment") {
    payment_method = "card";
  } else {
    payment_method = "cash";
  }
  console.log(payment_method);
  return async (dispatch) => {
    const res = await callApi(
      `api/order?email=${email}&payment=${payment_method}&sortBy=${
        amount && amount !== "Amount" ? "totalPrice" : ""
      }&sort=${amount}`
    );
    let orders = res.data;
    dispatch(actFilterOrders(orders));
  };
};

export const actFilterOrders = (orders) => {
  return {
    type: Types.FILTER_ORDERS,
    orders,
  };
};

export const actFilterCustomersRequest = (name) => {
  return async (dispatch) => {
    const res = await callApi(`api/auth?name=${name}`);
    let customers = res.data;
    dispatch(actFilterCustomers(customers));
  };
};

export const actFilterCustomers = (customers) => {
  return {
    type: Types.FILTER_CUSTOMERS,
    customers,
  };
};

export const actToggleFormProduct = () => {
  return {
    type: Types.TOGGLE_FORM_PRODUCT,
  };
};

export const actGetProductUpdate = (product) => {
  return {
    type: Types.GET_PRODUCT_UPDATE,
    product,
  };
};

export const actResetProductUpdate = () => {
  return {
    type: Types.RESET_PRODUCT_UPDATE,
  };
};

export const actDeleteProductRequest = (product) => {
  return async (dispatch) => {
    let id = product._id;
    const res = await callApi(`api/product/${id}`, "DELETE", null);
    // const products = await callApi('api/product','GET',null)
    console.log(res.data);
    dispatch(actDeleteProduct(res.data));
  };
};

export const actDeleteProduct = (product) => {
  return {
    type: Types.DELETE_PRODUCT,
    product,
  };
};

export const actAddProductRequest = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await callApi("api/product", "POST", data);
    console.log(res);
    if (res) {
      dispatch(actAddProduct(res.data));
      dispatch(actToggleFormProduct());
    }
    // console.log(res.data)
  };
};

export const actAddProduct = (product) => {
  return {
    type: Types.ADD_PRODUCT,
    product,
  };
};

export const actUpdateProductRequest = (data) => {
  return async (dispatch) => {
    const res = await callApi("api/product", "PUT", data);
    if (res) {
      dispatch(actUpdateProduct(res.data));
      dispatch(actToggleFormProduct());
    }
    // console.log(res.data)
  };
};

export const actUpdateProduct = (product) => {
  return {
    type: Types.UPDATE_PRPODUCT,
    product,
  };
};

export const actToggleFormCategory = () => {
  return {
    type: Types.TOGGLE_FORM_CATEGORY,
  };
};

export const actGetAllCategoryRequest = () => {
  return async (dispatch) => {
    const res = await callApi("api/category", "GET", null);
    let category = res.data;
    console.log(category);

    dispatch(actGetAllCategory(category));
  };
};

export const actGetAllCategory = (category) => {
  return {
    type: Types.GET_ALL_CATEGORY,
    category,
  };
};

export const actAddCategoryRequest = (data) => {
  return async (dispatch) => {
    console.log(data);
    const res = await callApi("api/category", "POST", data);
    let newCategory = res.data;
    dispatch(actAddCategory(newCategory));
  };
};

export const actAddCategory = (category) => {
  return {
    type: Types.ADD_CATEGORY,
    category,
  };
};

export const actDeleteCategoryRequest = (id) => {
  return async (dispatch) => {
    const res = await callApi(`api/category/${id}`, "DELETE", null);
    // const products = await callApi('api/product','GET',null)
    console.log(res.data);
    dispatch(actDeleteCategory(res.data));
  };
};

export const actDeleteCategory = (category) => {
  return {
    type: Types.DELETE_CATEGORY,
    category,
  };
};

export const actFilterCategoryAdminRequest = (name) => {
  return async (dispatch) => {
    const res = await callApi(`api/category?name=${name}`);
    let category = res.data;
    dispatch(actFilterCategoryAdmin(category));
  };
};

export const actFilterCategoryAdmin = (category) => {
  return {
    type: Types.FILTER_CATEGORY_ADMIN,
    category,
  };
};

export const actGetHotProductsRequest = () => {
  return async (dispatch) => {
    const res = await callApi(`api/product/hotProd`);
    let hotProd = res.data;
    dispatch(actGetHotProducts(hotProd));
  };
};

export const actGetHotProducts = (hotProd) => {
  return {
    type: Types.GET_HOT_PROD,
    hotProd,
  };
};
