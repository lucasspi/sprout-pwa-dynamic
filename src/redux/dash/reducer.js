
import {
    STORAGE_TOKEN,
} from '../actionsTypes.js';

const initialState = {
    token: ""
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case STORAGE_TOKEN:
      return { 
        ...state, 
        token: action.token
      };
    default:
      return state;
  }
};