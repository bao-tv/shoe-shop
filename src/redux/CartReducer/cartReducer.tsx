import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState:CartState = {
    carts: [],
}
export type CartState = {
    carts: CartModel[];
}
export type CartModel = {
    id: number;
    name: string;
    price: number;
    quantityOrder: number;
    image: string;
}

const cartReducer = createSlice({
    name: 'cartReducer',
    initialState,
    reducers: {
        cart_add: (state: CartState, action: PayloadAction<CartModel>) => {
            const item = action.payload;
            const existingItem = state.carts.find((p) => p.id === item.id);

            if (existingItem) {
                const updatedCarts = state.carts.map((p) =>
                    p.id === item.id ? { ...p, quantityOrder: p.quantityOrder + item.quantityOrder } : p
                );

                return { ...state, carts: updatedCarts };
            } else {
                return { ...state, carts: [...state.carts, action.payload] };
            }
        },
        cart_update: (state: CartState, action: PayloadAction<CartModel[]>) => {
            state.carts = action.payload;
        },
        cart_remove: (state: CartState, action: PayloadAction<number>) => {
            const newCarts = state.carts.filter((item) => action.payload !== item.id);
            // if(action.payload === state.carts)
            return {...state, carts: newCarts}
        },
        cart_erase: (state: CartState) => {
            return {...state, carts: []}
        }
    }
});


export const {cart_add, cart_update, cart_remove, cart_erase} = cartReducer.actions;

export default cartReducer.reducer;