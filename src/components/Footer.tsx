import React from 'react'

type Props = {}

export default function Footer({}: Props) {
  return (
  <>
    <div className='container pb-3 pt-5 footer'>
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6 col-12 ps-5 border-end item">
          <h5>GET HELP</h5>
          <p>Home</p>
          <p>Nike</p>
          <p>Adidas</p>
          <p>Contact</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-12 ps-5 border-end item">
          <h5>SUPPORT</h5>
          <p>About</p>
          <p>Contact</p>
          <p>Help</p>
          <p>Phone</p>
        </div>
        <div className="col-lg-4 col-md-6 col-sm-6 col-12 ps-5">
          <h5>REGISTER</h5>
          <p>Register</p>
          <p>Login</p>
        </div>
      </div>
    </div>
    <div className='bottom'></div>
  </>
  )
}