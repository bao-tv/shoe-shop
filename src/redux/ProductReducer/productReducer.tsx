import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { DOMAIN, http } from "../../util/config";
import { DispatchType } from "../configStore";

export type ProductModel = {
  id: number;
  name: string;
  alias: string;
  price: number;
  description: string;
  size: string;
  shortDescription: string;
  quantity: number;
  deleted: boolean;
  categories: string;
  relatedProducts: string;
  feature: boolean;
  image: string;
};

export interface ProductDetailModel {
    id:               number;
    name:             string;
    alias:            string;
    price:            number;
    feature:          boolean;
    description:      string;
    size:             string[];
    shortDescription: string;
    quantity:         number;
    image:            string;
    categories:       Category[];
    relatedProducts:  RelatedProduct[];
}

export interface Category {
    id:       string;
    category: string;
}

export interface RelatedProduct {
    id:               number;
    name:             string;
    alias:            string;
    feature:          boolean;
    price:            number;
    description:      string;
    shortDescription: string;
    image:            string;
}

export type ProductState = {
  arrProduct: ProductModel[];
  productDetail: ProductDetailModel | null
};

const initialState: ProductState = {
  arrProduct: [],
  productDetail: null
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state: ProductState, action: PayloadAction<ProductModel[]>) => {
        state.arrProduct = action.payload;
    }
  },
  extraReducers(builder) {
      builder.addCase(getProductDetailApi.pending, (state, action) => {

      });
      builder.addCase(getProductDetailApi.fulfilled, (state:ProductState, action:PayloadAction<ProductDetailModel>) => {
        state.productDetail = action.payload;
      });
      builder.addCase(getProductDetailApi.rejected, (state, action) => {
        
      });
  },
});

export const {setArrProductAction} = productReducer.actions;

export default productReducer.reducer;

/*------------- action API ------------------*/

export const getProductApi = (name:string) => {
    return async (dispatch: DispatchType) => {
        try {
            const result = await axios({
                url: `${DOMAIN}/api/Product?keyword=${name}`,
                method: 'GET'
            });
            const content:ProductModel[] = result.data.content;
            
            // sau khi lấy dữ liệu sẽ dispatch lên store
            const action:PayloadAction<ProductModel[]> = setArrProductAction(content);            
            dispatch(action);
            // return action;
        } catch (error) {
            console.log(error);
        }
    }
}

/*------------- cách 2 Create createAsyncThunk ------------------*/

export const getProductDetailApi = createAsyncThunk(
    'productReducer/getProductDetailApi',
    async (id: string) => {
        const response = await http.get(`/api/Product/getbyid?id=${id}`)
        return response.data.content; 
    }
)