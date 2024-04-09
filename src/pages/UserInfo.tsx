import React from 'react'
import useOderQuery from '../hooks/useOderQuery';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useStorage';
import Service from '../components/Service';
import Banner from '../components/Banner';

const UserInfo = () => {
  const [user] = useLocalStorage("user", {});
  const userId = user?.user?._id;
  const role = user?.user?.role;
  const data = useOderQuery(role, userId);
  console.log(data);
  return (
    <>
      <Banner />
      <div className="oder-wrap" style={{ marginBottom: "60px" }}>
        <div className='container'>
          <div className="admin-heading">
            <h1 className="h2">Đơn hàng của bạn</h1>
          </div>
          <div className="table-responsive small">
            <table className="table table-striped table-sm" style={{ width: "90%", border: "none" }} >
              <thead style={{ background: "#B88E2F", borderRadius: "20px" }}>
                <tr >
                  <th style={{ borderRadius: "4px 0px 0px 0px" }} scope="col">#</th>
                  <th scope="col">Số sản phẩm</th>
                  <th scope="col">Tổng tiền</th>
                  <th style={{ borderRadius: "0px 4px 0px 0px" }} scope="col">Trạng thái</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.map((oder: any, index: number) => (
                  <tr key={index}>
                    <td>
                      <h3>{index + 1}</h3>
                    </td>
                    <td>
                      <span>{oder.items.length}</span>
                    </td>
                    <td>
                      <span>{oder.totalPrice}</span>
                    </td>
                    <td>
                      <span>{oder.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Service />
    </>
  )
}

export default UserInfo