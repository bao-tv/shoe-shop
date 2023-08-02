import React from 'react';
import ReactDOM from 'react-dom/client';

import Carts from './pages/Carts/Carts';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Search from './pages/Search/Search';
import HomeTemplate from './templates/HomeTemplate';

//style
import './assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

//setup redux
import { Provider } from 'react-redux';
import { store } from './redux/configStore';
// setup react router dom
import { 
  unstable_HistoryRouter as HistoryRouter,
  BrowserRouter, 
  Routes, 
  Route, 
  Navigate, 
} from 'react-router-dom';
import { history } from './util/config';

interface CustomRouterProps {
  history: History;
  children: React.ReactNode;
}
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement 
);
root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
        <Routes>
          <Route path="" element={<HomeTemplate/>}>
            <Route index element={<Home/>}></Route>
            <Route path='login' element={<Login/>}></Route>
            <Route path='register' element={<Register/>}></Route>
            <Route path='carts' element={<Carts/>}></Route>
            <Route path='detail'>
              <Route path=':id' element={<Detail />}></Route>
            </Route>
            <Route path='profile' element={<Profile/>}></Route>
            <Route path='search' element={<Search/>}></Route>
            <Route path='*' element={<Navigate to=""/>}></Route>
          </Route>
        </Routes>
    </HistoryRouter>
  </Provider>
);
 