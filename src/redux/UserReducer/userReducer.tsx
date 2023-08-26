import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserLoginModel } from '../../pages/Login/Login';
import { ACCESS_TOKEN, history, http, settings, USER_LOGIN } from '../../util/config';

//user profile
export interface UserProfile {
    ordersHistory: OrdersHistory[];
    email:         string;
    name:          string;
    password:      string;
    gender:        boolean;
    phone:         string;
    facebookId:    string;
    deleted:       boolean;
    avatar:        string;
    image:         string;
}

export interface OrdersHistory {
    orderDetail: OrderDetail[];
    id:          number;
    date:        string;
    status:      null;
    email:       string;
    alias:       string;
}

export interface OrderDetail {
    name:             string;
    alias:            string;
    shortDescription: string;
    quantity:         number;
    price:            number;
    image:            string;
    description:      string;
}
//=======================
//user Login
export interface UserLoginResult {
    email: string,
    accessToken: string
}

export interface UserState {
    userLogin: UserLoginResult | null;
    userProfile: UserProfile | null;
}


const initialState:UserState = {
    userLogin: settings.getStorageJson(USER_LOGIN) ? settings.getStorageJson(USER_LOGIN) : null,
    userProfile: null
}

const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    signout: (state:UserState) => {
        settings.eraseCookie(USER_LOGIN);
        settings.eraseStorage(USER_LOGIN);
        settings.eraseStorage(ACCESS_TOKEN);
        settings.eraseCookie(ACCESS_TOKEN);
        history.push('/');
        return {...state, userLogin: null, userProfile: null}
    }
  },
  extraReducers(builder) {
      builder.addCase(loginAsynApi.fulfilled, (state:UserState, action:PayloadAction<UserLoginResult>) => {
        state.userLogin = action.payload;
        settings.setStorageJson(USER_LOGIN, action.payload);
        settings.setCookieJson(USER_LOGIN, action.payload, 30);
        settings.setStorage(ACCESS_TOKEN, action.payload.accessToken);
        settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30);
        history.push('/profile');
      });

    //   xử lý profile
    builder.addCase(getProfileAsynApi.fulfilled, (state:UserState, action:PayloadAction<UserProfile>) => {
        // console.log(action.payload);
        
        // state.userProfile = action.payload;
        return {...state, userProfile : action.payload}
    });

    builder.addCase(loginFacebookApi.fulfilled , (state:UserState, action:PayloadAction<UserLoginResult>) => {
        state.userLogin = action.payload;
        settings.setStorageJson(USER_LOGIN, action.payload);
        settings.setCookieJson(USER_LOGIN, action.payload, 30);
        settings.setStorage(ACCESS_TOKEN, action.payload.accessToken);
        settings.setCookie(ACCESS_TOKEN, action.payload.accessToken, 30);
        history.push('/profile');
    });
  },
});

export const { signout} = userReducer.actions;

export default userReducer.reducer;

export const loginAsynApi = createAsyncThunk(
    'userReducer/LoginAsynApi',
    async (userLogin: UserLoginModel):Promise<UserLoginResult>=> {
        const response = await http.post('/api/Users/signin', userLogin)
        return response.data.content; 
    }
)

export const getProfileAsynApi = createAsyncThunk(
    'userReducer/getProfileAsynApi',
    async ():Promise<UserProfile>=> {
        const response = await http.post('/api/Users/getProfile')
        return response.data.content; 
    }
)

export type FacebookDataLogin = {
    facebookToken: string
}

export const loginFacebookApi = createAsyncThunk(
    'userReducer/loginFacebookApi',
    async (facebookToken: string):Promise<UserLoginResult>=> {
        let data:FacebookDataLogin =  {facebookToken}
        const response = await http.post('/api/Users/facebooklogin', data)
        return response.data.content; 
    }
)