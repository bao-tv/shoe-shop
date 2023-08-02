import { useFormik, Field, Form } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { DispatchType, Rootstate } from '../../redux/configStore'
import { getProfileAsynApi } from '../../redux/UserReducer/userReducer';
import OrderHistory from './OrderHistory/OrderHistory';
import * as yub from 'yup';
import { http } from '../../util/config';
import Swal from 'sweetalert2';

export interface UserUpdateResult {
  statusCode: number;
  content:    string;
  dateTime:   Date;
}

export type UserProfileModel = {
  email: string,
  password: string,
  name: string,
  gender: boolean | string,
  phone: string
}
type Props = {}

export default function Profile({}: Props) {
  const {userProfile} = useSelector((state:Rootstate) => state.userReducer);  
  // console.log('userProfile: ', userProfile);
  
  const frmUserProfile = useFormik<UserProfileModel>({
    initialValues: {
      email:  '',
      password:  '',
      name:  '',
      gender:  '',
      phone:  '',
    },
    onSubmit: async (value:UserProfileModel):Promise<UserUpdateResult> => {
      try {
        const response = await http.post('/api/Users/updateProfile', value);
        if(response.data.statusCode === 200) {
          Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: 'Update!',
                icon:'success',
                timer: 1500
              }).then(() => window.location.reload());
            }
          })
        }
        
        return response.data;
      } catch (error) {
        // console.log(error);
        Swal.fire({
          title: 'Update error!',
          icon:'error',
          timer: 1500
        });
        throw(error);
      }
    },
  });

  useEffect(() => {
    frmUserProfile.setValues({
      email: userProfile?.email || '',
      password: userProfile?.password || '',
      name: userProfile?.name || '',
      gender: userProfile?.gender || (frmUserProfile.values.gender ==="true" ? true : false),
      phone: userProfile?.phone || '',
    })
  },[userProfile]);

  console.log(frmUserProfile.values);
  
  

  const dispatch:DispatchType = useDispatch();
  useEffect(() => {
    //gọi api get profile
    const actionThunk = getProfileAsynApi();
    dispatch(actionThunk);
  },[]);
  
  return (
    <div className="profile">
      <h3 className='py-3'>Profile</h3>
      <div className='container'>
        <div className='row border-bottom pb-5'>
          <div className="col-lg-4 col-12 left">
            <img src={userProfile?.avatar} alt="..." className='rounded-circle '/>
          </div>
          <div className="col-lg-8 col-12 right">
            <form action="" onSubmit={frmUserProfile.handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <p>Email</p>
                    <input className="form-control" name='email' disabled={true}
                      value={frmUserProfile.values.email} 
                      onChange={frmUserProfile.handleChange}
                      onBlur={frmUserProfile.handleBlur}/>
                  </div>
                  <div className="form-group">
                    <p>Phone</p>
                    <input className="form-control" name='phone'
                    value={frmUserProfile.values.phone} 
                    onChange={frmUserProfile.handleChange}
                    onBlur={frmUserProfile.handleBlur}/>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <p>Name</p>
                    <input className="form-control" name='name'
                    value={frmUserProfile.values.name} 
                    onChange={frmUserProfile.handleChange}
                    onBlur={frmUserProfile.handleBlur}/>
                  </div>
                  <div className="form-group">
                    <p>Password</p>
                    <input className="form-control" type='password'name='password'
                      value={frmUserProfile.values.password} 
                      onChange={frmUserProfile.handleChange}
                      onBlur={frmUserProfile.handleBlur}/>
                  </div>
                  <div className="form-group">
                    <p>Gender</p>
                    <div role="group" aria-labelledby="my-radio-group" className='gender'>
                        <input name="gender" type="radio" 
                          checked={frmUserProfile.values.gender ? String(frmUserProfile.values.gender) === 'true' : userProfile?.gender} 
                          onChange={frmUserProfile.handleChange}
                          onBlur={frmUserProfile.handleBlur}
                          value="true"
                          />Male
                      {/* <label>
                          </label> */}
                          <input name="gender" type="radio"
                            checked={frmUserProfile.values.gender ? String(frmUserProfile.values.gender) === 'false' : !userProfile?.gender} 
                            onChange={frmUserProfile.handleChange}
                            onBlur={frmUserProfile.handleBlur}
                            value="false"
                        />Female
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary mt-3'>Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      <div className="orders_history d-none">
        <span>Order history</span>
        <OrderHistory ordersHistory={userProfile?.ordersHistory} />
      </div>
      </div>
    </div>
  )
}