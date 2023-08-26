import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import ProductCard from '../../components/ProductCard/ProductCard'
import {cart_add, CartModel } from '../../redux/CartReducer/cartReducer';
import { DispatchType, Rootstate } from '../../redux/configStore'
import { getProductDetailApi, RelatedProduct } from '../../redux/ProductReducer/productReducer'

type Props = {}

export default function Detail({}: Props) {
  const {productDetail} = useSelector((state: Rootstate) => state.productReducer);
  
  const dispatch:DispatchType = useDispatch();
  const navigate = useNavigate();
  
  const params = useParams();

  const getProductByIdApi = () => {
    const id: string | undefined = params.id;
    const actionThunk = getProductDetailApi(id as string);
    dispatch(actionThunk);
  }

  useEffect(() => {
    getProductByIdApi();
  }, [params]);

  // add to cart get to redux
  const [numItem, setNumItem] = useState<number>(1);
  let productOder:CartModel;
  if(productDetail) {
    productOder = {
      id: productDetail?.id,
      name: productDetail?.name,
      price: productDetail?.price,
      quantityOrder: numItem,
      image: productDetail?.image
    }
  }

  const addToCart = ():void => {
    dispatch(cart_add(productOder));
    navigate('/carts');
  }
  const classBtn = `btn-buy ${numItem <=1 ? '' : 'btn-hover'}`;
  
  return (
    <div className='container detail'>
      <div className="row">
        <div className="col-lg-4 col-12 left">
          <img src={productDetail?.image} alt={productDetail?.alias}/>
        </div>
        <div className="col-lg-8 col-12 right">
          <h3>{productDetail?.name}</h3>
          <p>{productDetail?.description}</p>
          <div className='size'>
            <p>Available size</p>
            <div className="num">
              {productDetail?.size.map((item, index) => {
                return (
                  <p key={index}>{item}</p>
                )
              })}
            </div>
          </div>
          <p className="price">{productDetail?.price} $</p>
          <div className='quantity'>
            Quantity: <span>{productDetail?.quantity}</span>
          </div>
          <div className="addItem">
            <button className='btn-buy me-4 btn-hover' onClick={() => setNumItem(numItem + 1)}>+</button>
            <p className='number me-4'>{numItem}</p>
            <button className={classBtn}
              onClick={() => setNumItem(numItem - 1)} 
              disabled={numItem<=1 ? true : false}>-</button>
          </div>
          <div onClick={addToCart}><Button name={'Add to cart'} /></div>
        </div>
      </div>
      <h3>-Relate product-</h3>
      <div className="row">
        {productDetail?.relatedProducts.map((prod: RelatedProduct,index:number) => {
          return (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center" key={index}>
              <ProductCard prod={prod}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}