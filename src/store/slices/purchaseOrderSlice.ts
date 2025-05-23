import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

interface PurchaseOrder {
  id: string;
  // Add other fields as needed
}

interface PurchaseOrderState {
  orders: PurchaseOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: PurchaseOrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Async thunk for fetching purchase orders
export const fetchPurchaseOrders = createAsyncThunk(
  'purchaseOrders/fetchAll',
  async () => {
    const response = await api.get('/purchase-orders');
    return response.data;
  }
);

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPurchaseOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPurchaseOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchPurchaseOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch purchase orders';
      });
  },
});

export default purchaseOrderSlice.reducer; 