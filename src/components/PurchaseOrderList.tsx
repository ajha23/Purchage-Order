import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import { RootState } from '../store';
import { fetchPurchaseOrders } from '../store/slices/purchaseOrderSlice';

const PurchaseOrderList: React.FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state: RootState) => state.purchaseOrders);

  useEffect(() => {
    dispatch(fetchPurchaseOrders());
  }, [dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom>
        Purchase Orders
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{/* Add date */}</TableCell>
                <TableCell>{/* Add status */}</TableCell>
                <TableCell>{/* Add total */}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default PurchaseOrderList; 