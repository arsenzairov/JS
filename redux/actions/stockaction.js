export const FETCHING_SEARCH_PATTERN = "SEARCH PATTERN FETCING";
export const SEARCH_PATTERN_ERROR = "SEARCH PATTERN FETCH FAILED";
export const SEARCH_PATTERN_FULFILLED = "SEARCH_PATTERN_FETCH_FULFILLED";
export const ADD_STOCK = "ADD_STOCK";
export const SELL_STOCK = "SELL_STOCK";

// export const FETCH_STOCK_BEGIN = "FETCH_STOCK_START";
export const FETCH_STOCK_FULFILLED = "FETCH[SUCCESS]";
export const FETCH_STOCK_FAILURE = "FETCH STOCK FAILED";

export const FETCH_HOT_STOCKS = "FETCHING HOT STOCKS";
export const FETCH_HOT_STOCKS_FULFILLED = "FETCH HOT STOCKS SUCCESS";
export const FETCH_HOT_STOCKS_FAILED = "FETCH HOT STOCKS FAILED";

// search action creator
export const fetchPattern = pattern => async dispatch => {
  // dispatch({ type: FETCHING_SEARCH_PATTERN });
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${pattern}&apikey=L0MN67PA653GCHR8`
    );
    const data = await response.json();

    dispatch({ type: SEARCH_PATTERN_FULFILLED, payload: data.bestMatches });
  } catch (err) {
    dispatch({ type: SEARCH_PATTERN_ERROR, payload: err.message });
  }
};

export const addStock = stock => ({
  type: ADD_STOCK,
  payload: stock
});

export const sellStock = stock => ({
  type: SELL_STOCK,
  payload: stock
});

// GET INFORMATION ABOUT A SINGLE STOCK SYMBOL
export const getStockDetails = symbol => async dispatch => {
  // dispatch({ type: FETCH_STOCK_BEGIN });

  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=L0MN67PA653GCHR8`
    );

    const data = await response.json();
    const modifiedData = await data["Time Series (Daily)"];

    dispatch({
      type: FETCH_STOCK_FULFILLED,
      symbol: symbol,
      payload: modifiedData
    });
  } catch (err) {
    dispatch({ type: FETCH_STOCK_FAILURE });
  }
};

export const getHotStocks = () => async dispatch => {
  dispatch({ type: FETCH_HOT_STOCKS });

  try {
    const response = await fetch(
      "https://www.quandl.com/api/v3/datatables/ZACKS/MT.json?api_key=8BHstx6chzoaKWg2uaLm"
    );

    const data = await response.json();
    const finalResponse = data.datatable.data;

    dispatch({ type: FETCH_HOT_STOCKS_FULFILLED, payload: finalResponse });
  } catch {
    // dispatch({ type: FETCH_HOT_STOCKS_FAILED });
  }
};
