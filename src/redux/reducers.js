import { combineReducers } from 'redux';
import { dashboard } from './dash/reducer';

const reducers = combineReducers({
  InfosDash: dashboard
});

export default reducers;