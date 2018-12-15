import { combineReducers } from "redux";

import {
  NEWS_FETCHED_FULFILLED,
  FETCHING_NEWS,
  NEWS_FETCH_FAILED
} from "../actions/newsactions";

import { ADD_USER, SET_ACTIVE_USER } from "../actions/useraction";

import {
  SEARCH_PATTERN_FULFILLED,
  ADD_STOCK,
  FETCH_STOCK_FAILURE,
  FETCH_STOCK_FULFILLED,
  FETCH_HOT_STOCKS_FULFILLED,
  SELL_STOCK,
  FETCH_HOT_STOCKS,
  FETCH_HOT_STOCKS_FAILED
} from "../actions/stockaction";

function sellStock(array = [], action) {
  return array.map((stock, index) => {
    if (stock.symbol === action.payload.symbol) {
      if (action.payload.shares >= stock.shares) {
        return [...array.slice(0, index), ...array.slice(index + 1)];
      } else {
        const shares = stock.shares - action.payload.shares;
        return { ...stock, shares: shares };
      }
    }

    return stock;
  });
}

function insertItem(array = [], action) {
  let index = array.length + 1;
  let exist = false;

  if (array.length === 0) {
    return [action.payload];
  }

  array.map(item => {
    if (item.symbol === action.payload.symbol) {
      item.shares = item.shares + action.payload.shares;
      item.currentValueOfStock += action.payload.currentValueOfStock;
      exist = true;
      return item;
    }
  });

  if (exist === false) {
    return [...array.slice(0, index), action.payload, ...array.slice(index)];
  } else {
    return [...array.slice(0, index), ...array.slice(index)];
  }
}

function updateVirtualMoney(currentAmount, action, typeofaction) {
  let val = action.payload.close * action.payload.shares;
  return typeofaction === "buy" ? currentAmount - val : currentAmount + val;
}

function updatePortfolioValue(currentValue, action, typeofaction) {
  let val = action.payload.close * action.payload.shares;
  return typeofaction === "buy" ? currentValue + val : currentValue - val;
}

function checkIfStockExists(portfolio = []) {
  return portfolio.length;
}

const singleStockInfoInitState = {
  stockInformation: [],
  symbol: "",
  loading: false,
  error: false
};

const obj = {
  pattern: [],
  hotStocks: [],
  hotStocksLoading: false,
  error: false
};

const initNewsState = {
  news: [],
  loading: false,
  error: false
};

const newsReducer = (state = initNewsState, action) => {
  switch (action.type) {
    case FETCHING_NEWS:
      return { ...state, loading: true };

    case NEWS_FETCHED_FULFILLED:
      return { ...state, news: action.payload, loading: false };

    case NEWS_FETCH_FAILED:
      return { ...state, loading: false, error: true };
    default:
      return { ...state, loading: false };
  }
};

const singleStockInfoReducer = (state = singleStockInfoInitState, action) => {
  switch (action.type) {
    case FETCH_STOCK_FULFILLED:
      return {
        ...state,
        stockInformation: action.payload,
        loading: false,
        symbol: action.symbol
      };

    case FETCH_STOCK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        symbol: "",
        stockInformation: []
      };

    default:
      return state;
  }
};

const stockReducer = (initStocks = obj, action) => {
  debugger;
  switch (action.type) {
    case SEARCH_PATTERN_FULFILLED:
      return {
        ...initStocks,
        pattern: action.payload,
        hotStocksLoading: false
      };

    case FETCH_HOT_STOCKS:
      return { ...initStocks, hotStocksLoading: true };

    case FETCH_HOT_STOCKS_FULFILLED:
      return {
        ...initStocks,
        hotStocks: action.payload,
        hotStocksLoading: false
      };

    case FETCH_HOT_STOCKS_FAILED:
      return {
        ...initStocks,
        error: true,
        hotStocks: [],
        hotStocksLoading: false
      };

    default:
      return { ...initStocks, hotStocksLoading: false };
  }
};

const userReducer = (users = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return { ...users, [action.key]: action.payload, active: action.key };

    case SET_ACTIVE_USER:
      return { ...users, active: action.key };

    case ADD_STOCK:
      return {
        ...users,
        [users.active]: {
          ...users[users.active],
          portfolio: insertItem(users[users.active].portfolio, action),
          virtualMoney: updateVirtualMoney(
            users[users.active].virtualMoney,
            action,
            "buy"
          ),
          portfolioValue: updatePortfolioValue(
            users[users.active].portfolioValue,
            action,
            "buy"
          ),
          numOfStocks: checkIfStockExists(users[users.active].portfolio)
        }
      };

    case SELL_STOCK:
      return {
        ...users,
        [users.active]: {
          ...users[users.active],
          portfolio: sellStock(users[users.active].portfolio, action),
          virtualMoney: updateVirtualMoney(
            users[users.active].virtualMoney,
            action,
            "sell"
          ),
          portfolioValue: updatePortfolioValue(
            users[users.active].portfolioValue,
            action,
            "sell"
          ),
          numOfStocks: checkIfStockExists(users[users.active].portfolio)
        }
      };
    default:
      return users;
  }
};

const reducer = combineReducers({
  newsInfo: newsReducer,
  stocks: stockReducer,
  users: userReducer,
  currentStock: singleStockInfoReducer
});

export default reducer;
