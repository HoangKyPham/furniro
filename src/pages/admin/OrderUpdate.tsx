import React from 'react'
import { useParams } from 'react-router-dom';
import useOderQuery from '../../hooks/useOderQuery';
import { useLocalStorage } from '../../hooks/useStorage';

const OrderUpdate = () => {
    const { orderId } = useParams();

    const data = useOderQuery(undefined, undefined, orderId);

    return (
        <div className='order'>
            <div className="order-wrap">
                <div className="order-info">
                    <h2>Thông tin đơn hàng</h2>
                    <p><strong>Tên khách hàng:</strong> {data?.data?.customerInfo.name}</p>
                    <p><strong>Email:</strong> {data?.data?.customerInfo.email}</p>
                    <p><strong>Số điện thoại:</strong> 0{data?.data?.customerInfo.phone}</p>
                    <p><strong>Địa chỉ:</strong> {data?.data?.customerInfo.city}</p>
                </div>
                <div className="order-product">
                    <h3 className='order-product__title'>Sản phẩm trong đơn hàng:</h3>
                    <ul className='detail-wrap'>
                        {data?.data?.items.map((item, index) => (
                            <li key={index} className='detail-list'>
                                <p><strong>Tên sản phẩm:</strong> {item.name} </p>
                                <p><strong>Giá:</strong> ${item.price}</p>
                                <p><strong>Số lượng:</strong> {item.quantity}</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="order-total">
                    <p><strong>Tổng giá:</strong> ${data?.data?.totalPrice}</p>
                    <p><strong>Trạng thái:</strong> {data?.data?.status}</p>
                </div>
            </div>
        </div>

    )
}

export default OrderUpdate