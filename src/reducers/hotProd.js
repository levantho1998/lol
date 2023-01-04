import * as Types from "../constants/ActionTypes";

let initialstate = [];

const hotProd = (state = initialstate, actions) => {
  switch (actions.type) {
    case Types.GET_HOT_PROD:
      state = actions.hotProd;
      return state;
    default:
      return state;
  }
};

export default hotProd;
