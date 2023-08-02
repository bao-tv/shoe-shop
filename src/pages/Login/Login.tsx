import React, { useEffect } from 'react';
import { useFormik } from "formik";
import * as yub from 'yup';
import { loginAsynApi, loginFacebookApi } from '../../redux/UserReducer/userReducer';
import { DispatchType, Rootstate } from '../../redux/configStore';
import { useDispatch, useSelector } from 'react-redux';
// import FacebookLogin from 'react-facebook-login';
import FacebookLogin from '@greatsumini/react-facebook-login';
 
export type UserLoginModel = {
  email:string,
  password:string
}

type Props = {}

export default function Login({}: Props) {
  const dispatch:DispatchType = useDispatch();
  const formLogin = useFormik<UserLoginModel>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: yub.object().shape({
      email:yub.string().required('email canot be blank!').email('email is invalid'),
      password: yub.string().min(3,'password must be at least 3 to 10 characters').max(10,'password must be at least 3 to 10 characters')
    }),
    onSubmit: (values: UserLoginModel) => {
      // console.log(values);
      const actionAsyncLogin = loginAsynApi(values);
      dispatch(actionAsyncLogin);
    }
  });

  const {userLogin} = useSelector((state:Rootstate) => state.userReducer);

  const responseFacebook = (response:any) => {   
    console.log('response: ', response);
     
    if(response?.accessToken) {
      const actionThunk = loginFacebookApi(response.accessToken);
      dispatch(actionThunk);
    }
  }
  
  return (
    <form className='container' onSubmit={formLogin.handleSubmit}>
      <div className="d-flex justify-content-center align-items-center">
        <div className='w-75'>
          <h3>Login</h3>
          <div className="form-group">
            <p>email</p>
            <input type="text" className="form-control" name='email' 
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}/>
            {formLogin.errors.email && <div className='text text-danger'>{formLogin.errors.email}</div>}
          </div>
          <div className="form-group">
            <p>password</p>
            <input type="password" className="form-control" name='password' 
              onChange={formLogin.handleChange}
              onBlur={formLogin.handleBlur}/>
            {formLogin.errors.password && <div className='text text-danger'>{formLogin.errors.password}</div>}
          </div>
          <div className="form-group mt-2">
            <button className="btn btn-success" type='submit'>Login</button>
          </div>
          <div className="form-group mt-2">
            {/* <FacebookLogin
              appId="801757588088168"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="btn btn-primary"
              icon="fa-facebook"/> */}
            <FacebookLogin
              appId="1802238896925474"
              onSuccess={responseFacebook}
              onFail={(error) => {
                console.log('Login Failed!', error);
              }}
              onProfileSuccess={(response) => {
                console.log('Login onProfileSuccess!', response);}}
            />
          </div>
        </div>
      </div>
    </form>
  )
}