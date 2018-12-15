import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import reducer from "./reducers/reducer";

export const store = createStore(reducer, applyMiddleware(thunk));

// store.subscribe(() => {
//   console.log(store.getState().users);
// });
