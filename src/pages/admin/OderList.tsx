import React from 'react'
import useOderQuery from '../../hooks/useOderQuery'
import { useLocalStorage } from '../../hooks/useStorage';
import { Link } from 'react-router-dom';
import { countBy } from 'lodash';
import { IOrder } from '../../interfaces/order';

const OderList = () => {
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const role = user?.user?.role;

    const { data } = useOderQuery(role, userId);

    return (
        <>
            <div className="admin-heading">
                <h1 className="h2">Quản lý đơn hàng</h1>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Email</th>
                            <th scope="col">Số sản phẩm</th>
                            <th scope="col">Tổng tiền</th>
                            <th scope="col">Trạng thái</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((order: IOrder, index: number) => (
                            <tr key={index}>
                                <td>
                                    <h3>{index + 1}</h3>
                                </td>
                                <td>
                                    <h4>{order.customerInfo.email}</h4>
                                </td>
                                <td>
                                    <span>{order.items.length}</span>
                                </td>
                                <td>
                                    <span>{order.totalPrice}$</span>
                                </td>
                                <td>
                                    <span>{order.status}</span>
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <Link to={`/admin/orders/detail/${order._id}`} style={{ marginLeft: "10px" }} className='btn btn-primary'>Chi tiết</Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default OderList