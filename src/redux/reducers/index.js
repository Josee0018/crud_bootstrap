import { combineReducers } from "redux";
import personReducer from "./person/person.reducer";

const rootReducers = combineReducers({
  personReducer,
});

export default rootReducers;
