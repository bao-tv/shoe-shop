import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Rootstate, DispatchType } from '../../redux/configStore'; 
import { getProductApi, ProductModel } from '../../redux/ProductReducer/productReducer';

type Props = {}

export default function Home({}: Props) {
  const {arrProduct} = useSelector((state:Rootstate) => state.productReducer);
  const dispatch:DispatchType = useDispatch();
  const getAllProduct = () => {
    //call api và đưa lên redux
    const actionAsync = getProductApi('');    
    dispatch(actionAsync);
  }

  useEffect(() => {
    getAllProduct();
  },[]);
  
  return (
    <div className='home'>
      <h3>Product Feature</h3>
      <div className='container-fluid'>
        <div className="row mb-2">
          {arrProduct.map((prod:ProductModel, index:number) => {
            return <div className='col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center' key={index}>
              <ProductCard prod={prod}/>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}