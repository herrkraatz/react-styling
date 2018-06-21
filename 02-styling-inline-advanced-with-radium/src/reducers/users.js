// FETCH_USERS will get all users from the users reducer
import { FETCH_USERS } from '../actions/types';

export default function(state = [], action){
  switch(action.type) {
      case FETCH_USERS:
          console.log(action.payload);
          // return existing list of users with new list of users
          return [ ...state, ...action.payload.data ];
  }
  return state;
};