// @ts-nocheck
import { ActionTypes } from "../actions/user-action";

const initialState = {
  users: [],
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS:
      return { ...state, users: action.payload };
    case ActionTypes.FETCH_USER:
      return { ...state, currentUser: action.payload };
    case ActionTypes.CREATE_USER:
      return { ...state, users: [...state.users, action.payload] };
    case ActionTypes.EDIT_USER:
      return {
        ...state,
        users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
      };
    case ActionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;