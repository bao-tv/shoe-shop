import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartReducer/cartReducer';
import productReducer from './ProductReducer/productReducer';
import userReducer from './UserReducer/userReducer';

export const store = configureStore({
    reducer:{
        productReducer,
        userReducer,
        cartReducer,
    }
});

export type Rootstate = ReturnType<typeof store.getState>;

export type DispatchType = typeof store.dispatch;
