import axios from "axios";
import { createBrowserHistory } from "@remix-run/router";
export const DOMAIN = 'https://shop.cyberlearn.vn';

export const history = createBrowserHistory({ v5Compat: true });
export const http = axios.create({
    baseURL: DOMAIN,
    timeout: 30000
});

// cấu hình lưu hàm get set storage cũng như cookie
export const settings = {
  setStorageJson: (name: string, data: any):void => {
    data = JSON.stringify(data);
    localStorage.setItem(name,data);
  },
  setStorage: (name:string, data:string):void => {
    localStorage.setItem(name, data)
  },
  getStorageJson: (name:string): any | undefined => {
    if(localStorage.getItem(name)) {
      const dataStore: string | undefined | null = localStorage.getItem(name);      
      if(typeof dataStore == 'string' && dataStore !== 'undefined') {
        const data = JSON.parse(dataStore);
        return data;
      }
      return undefined;
    }
    return;
  },
  getStore: (name:string): string | null | undefined | any => {
    if(localStorage.getItem(name)) {
      const data:string | null | undefined = localStorage.getItem(name);
      return data;
    }
    return;
  },
  setCookieJson: (name:string, value:string | any, days:number):void => {
    var expires = "";
    if(days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 *60 *1000));
      expires = "; expires" + date.toUTCString();
    }
    value = JSON.stringify(value);
    document.cookie = name + "=" + ((value) || "") + expires + "; path=/";
  },
  getCookieJson: (name:string):any => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i< ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(nameEQ.length, c.length);
      if(c.indexOf(nameEQ) == 0) return JSON.parse(c.substring(nameEQ.length, c.length));
    }
    return null;
  },
  setCookie: (name:string, value:string, days:number):void => {
    var expires = "";
    if(days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 *60 *1000));
      expires = "; expires" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },
  getCookie: (name:string): string | null => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i< ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(nameEQ.length, c.length);
      if(c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  eraseCookie: (name:string):void => {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  },
  eraseStorage: (name:string):void => {
    localStorage.removeItem(name);
  }
} 

export const ACCESS_TOKEN:string = 'accessToken';
export const USER_LOGIN:string = 'userLogin'

//cấu hình all request gửi đi
http.interceptors.request.use((config) => {
  // config.headers = {...config.headers, Authorization: settings.getStore(ACCESS_TOKEN)}
  const token = settings.getStore(ACCESS_TOKEN);
  
  config.headers.Authorization = token ? 'Bearer ' +token : '';
  // console.log('Bearer ' +token);
  return config;
},(error) => {
  return Promise.reject(error)
})




//cấu hình all response
http.interceptors.response.use((response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response?.status === 400 || error.response?.status === 404) {
      history.push('/')
      
    }
  
    if(error.response?.status === 401 || error.response?.status === 403) {
      history.push('/login');
    }
    return Promise.reject(error);
  });


