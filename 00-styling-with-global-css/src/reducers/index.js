import { combineReducers } from 'redux';
import usersReducer from './users';

const rootReducer = combineReducers({
  users: usersReducer
  // we replace our dummy reducer:
  // state: (state = {}) => state
});

export default rootReducer;
