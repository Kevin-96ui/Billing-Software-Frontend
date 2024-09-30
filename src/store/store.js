// store.js

import { createStore } from 'redux';
import userReducer from './userReducer'; // Path to your reducer

const store = createStore(userReducer); // Create Redux store with your reducer

export default store;
