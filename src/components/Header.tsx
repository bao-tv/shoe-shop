import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { DispatchType, Rootstate } from "../redux/configStore";
import { signout } from "../redux/UserReducer/userReducer";
import Offcanvas from "react-bootstrap/Offcanvas";
type Props = {};

export default function Header(props: Props) {
  const dispatch: DispatchType = useDispatch();
  const navigate = useNavigate();
  const { userProfile, userLogin } = useSelector((state: Rootstate) => state.userReducer);
  const { carts } = useSelector((state: Rootstate) => state.cartReducer);
  const numItem: number = carts.length;
  const [show, setShow] = useState<boolean>(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="header">
      <section className="logo-header d-flex px-4">
        <div className="logo">
          <NavLink className={"logo-link"} to="">
            <img
              src="https://shopvnb.com/uploads/images/tin_tuc/giay-tennnis-bitis-co-tot-khong-1-1688590125.webp"
              alt="log"
            />
          </NavLink>
        </div>
        <div className="nav-bar-icon" onClick={handleShow}>
          <i className="bi bi-list"></i>
        </div>
        <div className="nav-bar-search">
          <div className="search flex-item">
            <NavLink className={"search-link"} to={"/search"}>
              <i className="bi bi-search"></i>Search
            </NavLink>
          </div>
          <div className="carts flex-item">
            <NavLink className={"carts-link"} to={"/carts"}>
              <i className="bi bi-cart-check"></i>({numItem})
            </NavLink>
          </div>
          <div className="login flex-item">
              <NavLink className={"login-link"} to={"/login"}>
                {userLogin ? userProfile?.name : "Login"}
              </NavLink>
              {userLogin && (
                <div className="user-select position-absolute">
                  <p onClick={() => navigate("/profile")}>Profile</p>
                  <p
                    onClick={() => dispatch(signout())}
                    className={"register-link pe-auto"}
                  >
                    Đăng xuất
                  </p>
                </div>
              )}
          </div>
          <div className="register flex-item">
            <NavLink className={"register-link"} to={"/register"}>
              Register
            </NavLink>
          </div>
        </div>
      </section>
      <section className="menu d-flex align-items-center px-4">
        <nav className="nav-menu">
          <NavLink to="/" className="mx-2">
            Home
          </NavLink>
          <NavLink to="" className="mx-2">
            Men
          </NavLink>
          <NavLink to="" className="mx-2">
            Woman
          </NavLink>
          <NavLink to="" className="mx-2">
            Adidas
          </NavLink>
          <NavLink to="" className="mx-2">
            Nike
          </NavLink>
          <NavLink to="" className="mx-2">
            Van, Converse
          </NavLink>
        </nav>
      </section>
      <Offcanvas show={show} onHide={handleClose} placement={"end"}>
        <Offcanvas.Header>
          <Offcanvas.Title>Menu</Offcanvas.Title>
          <button onClick={handleClose}><i className="bi bi-x-lg"></i></button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="search flex-item" onClick={handleClose}>
            <NavLink className={"search-link"} to={"/search"}>
              <i className="bi bi-search"></i>Search
            </NavLink>
          </div>
          <div className="carts flex-item" onClick={handleClose}>
            <NavLink className={"carts-link"} to={"/carts"}>
              <i className="bi bi-cart-check"></i>({numItem})
            </NavLink>
          </div>
          <div className="login flex-item" onClick={handleClose}>
              <NavLink className={"login-link"} to={"/login"}>
                {userLogin ? userProfile?.name : "Login"}
              </NavLink>
              {userLogin && (
                <div className="user-select">
                  <p onClick={() => navigate("/profile")}>Profile</p>
                  <p
                    onClick={() => dispatch(signout())}
                    className={"register-link pe-auto"}
                  >
                    Đăng xuất
                  </p>
                </div>
              )}
          </div>
          <div className="register flex-item" onClick={handleClose}>
            <NavLink className={"register-link"} to={"/register"}>
              Register
            </NavLink>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
