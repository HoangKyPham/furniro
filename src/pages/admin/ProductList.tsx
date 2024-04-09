import React from 'react'
import { Link } from 'react-router-dom'
import { IProduct } from '../../interfaces/product'
import { getAllProducts } from '../../services/product';
import useProductQuery from '../../hooks/useProductQuery';
import useProductMutation from '../../hooks/useProductMutation';


const ProductList = () => {
    const { data } = useProductQuery();
    const { onRemove } = useProductMutation({
        action: "DELETE",
        callback: () => {
            alert("Xoa san pham thanh cong")
        }
    })


    return (
        <>
            <div className="admin-heading">
                <h1 className="h2">Quản lý sản phẩm</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group me-2">
                        <Link to="/admin/products/add" className="btn btn-primary">Thêm</Link>
                    </div>
                </div>
            </div>
            <div className="table-responsive small">
                <table className="table table-striped table-sm">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Ảnh sản phẩm</th>
                            <th scope="col">Tên sản phẩm</th>
                            <th scope="col">Giá sản phẩm</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data?.map((product: IProduct, index: number) => (
                            <tr key={index}>
                                <td>
                                    <h3>{index + 1}</h3>
                                </td>
                                <td>
                                    <img src={product.image} alt={product.name} width={50} />
                                </td>
                                <td>
                                    <h4>{product.name}</h4>
                                </td>
                                <td>
                                    <span>{product.price}</span>
                                </td>
                                <td>
                                    <div className="d-flex">
                                        <button className='btn btn-danger' onClick={() => {
                                            window.confirm('Bạn có chắc chắn xóa không?') && onRemove(product)
                                        }} >Xóa</button>
                                        <Link to={`/admin/products/edit/${product._id}`} style={{ marginLeft: "10px" }} className='btn btn-primary'>Cập nhật</Link>
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

export default ProductList