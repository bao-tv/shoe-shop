import React from 'react';
import { NavLink } from 'react-router-dom';
import { ProductModel, RelatedProduct } from '../../redux/ProductReducer/productReducer';
import LinesEllipsis from 'react-lines-ellipsis';

type Props = {
    prod?: ProductModel | RelatedProduct;
}

export default function ProductCard({prod}: Props) {
  return (
    <div className='card'>
        <div className="icon position-relative">
            <i className="bi bi-heart-fill position-absolute end-0 mt-2 mx-2 text-danger"></i>
        </div>
        <img 
            className='card-img-top' 
            src={prod?.image} alt={prod?.alias} />
        <div className="card-body">
            <div className='name'>
                <h2 className='cart-title'>{prod?.name}</h2>
            </div>
            <div className="descript">
                <LinesEllipsis 
                    text= {prod?.shortDescription}
                    maxLine='2'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className='shortDescription'
                />
            </div>
        </div>
        <div className="d-flex card-btn">
            <NavLink to={`/detail/${prod?.id}`} className={'btn btn-success w-50 rounded-0 buy'}>Buy now</NavLink>
            <div className="Product-price text-dark">{prod?.price.toLocaleString()} $</div>   
        </div>
    </div>
  )
}