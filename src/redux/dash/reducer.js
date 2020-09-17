
import {
    STORAGE_TOKEN,
    STORAGE_CID,
    STORAGE_PHONE,
    STORAGE_USER,
    STORAGE_INTERESTS,
    STORAGE_POINTS,
    STORAGE_BUSINESS_INDEX,
    STORAGE_WALLET_SETUP
} from '../actionsTypes.js';

const initialState = {
    token: "",
    cid: "",
    phone: "",
    user: {},
    interests: "",
    points: "",
    businessIndex: 0,
    walletSetup: {}
};

export const dashboard = (state = initialState, action) => {
  switch (action.type) {
    case STORAGE_TOKEN:
      return { 
        ...state, 
        token: action.token
      };
    case STORAGE_CID:
      return { 
        ...state, 
        cid: action.cid
      };
    case STORAGE_PHONE:
      return { 
        ...state, 
        phone: action.phone
      };
    case STORAGE_USER:
      return { 
        ...state, 
        user: action.user
      };
    case STORAGE_INTERESTS:
      return { 
        ...state, 
        interests: action.interests
      };
    case STORAGE_POINTS:
      return { 
        ...state, 
        points: action.points
      };
    case STORAGE_BUSINESS_INDEX:
      return { 
        ...state, 
        businessIndex: action.businessIndex
      };
    case STORAGE_WALLET_SETUP:
        return {
            ...state,
            walletSetup: action.walletSetup
        };
    default:
      return state;
  }
};