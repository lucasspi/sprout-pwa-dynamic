import {
    STORAGE_TOKEN,

} from '../actionsTypes.js';

export const storageToken = value => ({
  type: STORAGE_TOKEN,
  token: value
});

