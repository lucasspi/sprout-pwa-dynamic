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

export const storageToken = value => ({
  type: STORAGE_TOKEN,
  token: value
});

export const storageCid = value => ({
  type: STORAGE_CID,
  cid: value
});

export const storagePhone = value => ({
  type: STORAGE_PHONE,
  phone: value
});

export const storageUser = value => ({
  type: STORAGE_USER,
  user: value
});

export const storageInterests = value => ({
  type: STORAGE_INTERESTS,
  interests: value
});

export const storagePoints = value => ({
  type: STORAGE_POINTS,
  points: value
});

export const storageBusinessIndex = value => ({
  type: STORAGE_BUSINESS_INDEX,
  businessIndex: value
});

export const storageWalletSetup = value => ({
  type: STORAGE_WALLET_SETUP,
  walletSetup: value
});

