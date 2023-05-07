import { combineReducers } from 'redux';
import reducer from './componentTransferReducer';
import componentTransferReducer from './componentTransferReducer';

const rootReducer = combineReducers({
  transfer: componentTransferReducer
});

export default rootReducer;