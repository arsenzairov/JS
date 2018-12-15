export const NEWS_FETCHED_FULFILLED = "[FETCHING NEWS] SUCCESS";
export const FETCHING_NEWS = "[FETCHING NEWS]";
export const NEWS_FETCH_FAILED = "[FETCHING_NEWS] FAILED";

// news action creator
export const fetchNews = () => async dispatch => {
  dispatch({ type: FETCHING_NEWS });
  try {
    // await response of fetch call
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?q=stock&apiKey=152e18c8838e4203af64bd2229b62b7d"
    );
    // only proceed once promise is resolved
    const data = await response.json();
    dispatch({ type: NEWS_FETCHED_FULFILLED, payload: data.articles });
  } catch (err) {
    dispatch({ type: NEWS_FETCH_FAILED, payload: err.message });
  }
};
