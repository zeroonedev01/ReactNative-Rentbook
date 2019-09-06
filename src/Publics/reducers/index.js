import {combineReducers} from 'redux';

import book from './book';
import genre from './genre';
import auth from './auth';
import borrow from './borrow';

const appReducer = combineReducers({
  book,
  genre,
  auth,
  borrow,
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
