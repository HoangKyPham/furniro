import React, { useContext } from 'react'
import { IProduct } from '../interfaces/product';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllProducts } from '../services/product';
import useCart from '../hooks/useCart';

type ProductListProps = {
    featured ?: boolean
}

const ProductList = ({featured }: ProductListProps) => {
    const {mutate} = useCart();
    const { data } = useQuery({
        queryKey: ["PRODUCT_KEY"],
        queryFn: getAllProducts,
    });
    
    const filterProducts = featured 
    ? data?.data?.filter((product : IProduct) => product?.featured == featured)
    : data
    return (
        <>
            <div className="product-list">
                {filterProducts?.map((product: IProduct, index: number) => (
                    <div className="product-item" key={index}>
                        <div className="product-image">
                            <img src={product.image} alt="" className="product__thumbnail" />
                            <span className="product-sale">{product.discount}%</span>
                        </div>
                        <div className="product-info">
                            <h3 className="product__name">
                                <a href="" className="product__link">{product.name}</a>
                            </h3>
                            <a href="" className="product__category">Stylish cafe chair</a>
                            <div className="product-price">
                                <span className="product-price__old">{product.price}$</span>
                                <span className="product-price__new">{product.price - product.price * (product.discount / 100)}$</span>
                            </div>
                        </div>
                        <div className="product-actions">
                            <button className="btn product-action__quickview"><Link to={`product-detail/${product._id}`}>Quick View</Link></button>
                            <button className="btn product-action__addtocart" onClick={() => mutate({action : "ADD", productId: product._id, quantity: 1 })} >Add To Cart</button>
                            <div className="product-actions-more">
                                <a className="product-actions-more__share">
                                    <img src="./public/icons/share.svg" className="product-action__share-icon" alt="" srcSet="" />
                                    Share
                                </a>
                                <a className="product-actions-more__compare">
                                    <img src="./public/icons/swap.svg" className="product-action__share-icon" alt="" srcSet="" />
                                </a>
                                <a className="product-actions__like">
                                    <img src="./public/icons/like.svg" className="product-action__share-icon" alt="" srcSet="" />
                                    Like
                                </a>
                            </div>
                        </div>
                    </div>


                )
                )}

            </div>
        </>

    )
}

export default ProductList