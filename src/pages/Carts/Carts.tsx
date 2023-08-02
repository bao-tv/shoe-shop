import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/Button/Button';
import { CartModel, cart_erase, cart_remove, cart_update } from '../../redux/CartReducer/cartReducer';
import { Rootstate } from '../../redux/configStore';
import { http } from '../../util/config';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

type Props = {}

export default function Carts({}: Props) {
  const { carts } = useSelector((state:Rootstate) => state.cartReducer);
  const { userLogin } = useSelector((state:Rootstate) => state.userReducer)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const total:number = carts.reduce((acc,item) => acc + item.price * item.quantityOrder, 0)
  
  const increase = (id:number):void => {
    // console.log(id);
    const updatedCarts = carts.map((item) =>
      item.id === id ? { ...item, quantityOrder: item.quantityOrder + 1 } : item
    );
    // console.log(updatedCarts);
    dispatch(cart_update(updatedCarts));
  };

  const decrease = (id:number):void => {
    const updatedCarts = carts.map((item) =>
      item.id === id ? { ...item, quantityOrder: Math.max(0, item.quantityOrder - 1) } : item
    );
    dispatch(cart_update(updatedCarts));
  };

  interface OderModel {
    orderDetail: OrderDetail[];
    email:       string | null | undefined;
}

 interface OrderDetail {
    productId: number;
    quantity:  number;
}

  const order:OderModel = {
    email: userLogin?.email,
    orderDetail: [...carts.map((item) => ({productId: item.id,quantity: item.quantityOrder}))],
  }

  // console.log(order);
  const product_oder = async ():Promise<void> => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, order it!'
    });
    if(result.isConfirmed) {
      try {
        const {data} = await http.post('/api/Users/order', order);
        Swal.fire(
          `Order ${data.message}`,
          'Continue to shopping.',
          'success'
        ).then((result) => {
          if(result.isConfirmed) {
            dispatch(cart_erase());
            navigate('/');
          }
        })
      } catch (error:any) {
        Swal.fire(
          error?.message,
          'Please, Contact the administrator.',
          'error'
        ).then((result) => {
          if(result.isConfirmed) {
            navigate('/');
          }
        })
      };
    }
  };
  return (
    <div className='carts'>
      <h3>My Cart</h3>
      {carts.length ? (
        <div className='container '>
          {carts.map((item:CartModel, index:number) => {
            const classBtn = `btn-buy ${item.quantityOrder <=1 ? '' : 'btn-hover'}`;
            return (
              <div className="row item-cart" key={index}>
              <div className="col-4">
                <img src={item.image} alt="..."/>
              </div>
              <div className="col-6">
                <p className='name'>{item.name}</p>
                <p className='price'>{item.price} $</p>
                <div className="addItem">
                  <button className='btn-buy me-4 btn-hover' onClick={() => increase(item.id)}>+</button>
                  <p className='number me-4'>{item.quantityOrder}</p>
                  <button className={classBtn}
                    onClick={() => decrease(item.id)} 
                    disabled={item.quantityOrder<=1 ? true : false}>-</button>
                </div>
              </div>
              <div className="col-2">
                <button onClick={()=>dispatch(cart_remove(item.id))}><i className="bi bi-trash3-fill"></i></button>
              </div>
            </div>
            )
          })}
          <div className="total">Total: <span>{total} $</span></div>
          <div className='' onClick={() => product_oder()}><Button name='Order'/></div>
        </div> 
      ) : (
        <div className='cart-empty'>
          <i className="bi bi-emoji-smile"></i>
          <p>Cart empty!</p>
        </div>
      )}
    </div>
  )
}