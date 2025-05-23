import { combineReducers } from '@reduxjs/toolkit';
import purchaseOrderReducer from '../slices/purchaseOrderSlice';

// Import your reducers here
// import userReducer from './userReducer';
// import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
  // Add your reducers here
  // user: userReducer,
  // orders: ordersReducer,
  purchaseOrders: purchaseOrderReducer,
});

export default rootReducer; 