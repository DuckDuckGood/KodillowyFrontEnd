import { combineReducers, createStore } from "redux";
import { tableReducer } from "./reducers/tableReducer";
import { statusesReducer } from "./reducers/statusesReducer";

const subReducers = {
  tables: tableReducer,
  statuses: statusesReducer,
};

const reducer = combineReducers(subReducers);

const store = createStore(
  reducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;