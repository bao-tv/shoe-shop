import React from 'react';
import {OrdersHistory, OrderDetail} from '../../../redux/UserReducer/userReducer'

type Props = {
    ordersHistory: OrdersHistory[] | undefined;
};

export default function OrderHistory({ordersHistory}: Props) {
    const dayjs = require('dayjs');
    
  return (
    <div className='order_history'>
        {ordersHistory?.map((item: OrdersHistory, index: number) => {           
            return (
                <div key={index}>
                    <p>Orders have been placed on {dayjs(item.date).format('DD/MM/YYYY')}</p>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>img</th>
                                <th>name</th>
                                <th>price</th>
                                <th>quantity</th>
                                <th>total</th>
                            </tr>
                        </thead>
                    {item.orderDetail.map((item_Detail:OrderDetail, index: number) => {
                        return (
                            <tbody key={index}>
                                <tr>
                                    <td>{item.id}</td>
                                    <td><img src={item_Detail.image} alt={item_Detail.alias} /></td>
                                    <td>{item_Detail.name}</td>
                                    <td>{item_Detail.price}</td>
                                    <td>{item_Detail.quantity}</td>
                                    <td>{item_Detail.price * item_Detail.quantity}</td>
                                </tr>
                            </tbody>
                        )
                    })}
                    </table>
                </div>
            )
        })}
    </div>
  )
}