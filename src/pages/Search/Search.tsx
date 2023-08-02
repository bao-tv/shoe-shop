import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Rootstate } from '../../redux/configStore';
import { ProductModel } from '../../redux/ProductReducer/productReducer';
import ProductCard from '../../components/ProductCard/ProductCard';

type Props = {}

export default function Search({}: Props) {
  const [search, setSearch] = useState<string>('');
  
  const [newArrProduct, setNewArrProduct] = useState<ProductModel[]>([])
  
  const { arrProduct } = useSelector((state:Rootstate) => state.productReducer);
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  setTimeout(() => {
    if (search && arrProduct) {
      const newArr = arrProduct.filter((item: ProductModel) => {
        return item.name.toLocaleUpperCase().indexOf(search.toLocaleUpperCase()) !== -1;
      });
      setNewArrProduct(newArr);
    }
  }, 500);
  
  return (
    <div className="search">
      <div className='container'>
        <i className="bi bi-search"></i>
        <input type="text" value={search} placeholder='Product name' onChange={handleSearchChange}/>
      </div>
      <div className="">
        <h3>Product Search</h3>
        <div className='container-fluid'>
          <div className="row mb-2">
            {newArrProduct?.map((prod:ProductModel, index:number) => {
              return <div className='col-lg-4 col-md-6 col-sm-6 col-12 d-flex justify-content-center' key={index}>
                <ProductCard prod={prod}/>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}