import React from 'react'
import Banner from '../components/Banner'
import Service from '../components/Service'
import { Link } from 'react-router-dom'
import useCart from '../hooks/useCart'

const Cart = () => {
    const { data, mutate, calculateTotal} = useCart();

    return (
        <>
            <Banner />
            <section className="cart">
                <div className="container">
                    <div className="cart-wrap">
                        <div className="cart-info">
                            <div className="cart-info__list">
                                <span className="cart-info__title" />
                                <span className="cart-info__title">Product</span>
                                <span className="cart-info__title">Price</span>
                                <span className="cart-info__title">Quantity</span>
                                <span className="cart-info__title">Subtotal</span>
                                <span className="cart-info__title" />
                            </div>
                            {data?.products?.map((product: any, index: number) => (
                                <div className="cart-info__wrap" key={index}>
                                    <div className="product-small__item">
                                        <img src="./public/images/Stuart sofa 1.png" alt="" className="product-small__img" />
                                    </div>
                                    <span className="cart-info__product">{product.name}</span>
                                    <span className="cart-info__product">{product.price}</span>
                                    <div className="product-detail__number">
                                        <button className="product-detail__number-btn" onClick={() =>mutate({action: 'DECREMENT', productId: product.productId, quantity: 1 })
                                        }>
                                            -
                                        </button>
                                        <span>{product.quantity}</span>
                                        <button className="product-detail__number-btn" onClick={() =>mutate({action: 'INCREMENT', productId: product.productId, quantity: 1 })}>
                                            +
                                        </button>
                                    </div>
                                    <span className="cart-info__product">{product.price*product.quantity}</span>
                                    <div className="cart-info__product">
                                        <button onClick={() =>mutate({action: 'REMOVE', productId: product.productId, quantity: 1 })} style={{ background: 'transparent', border: "none" }} >
                                            <img src="./public/icons/trash.svg" alt="" className="icon" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart-totals">
                            <span className="cart-totals__heading">Cart Totals</span>
                            <div className="cart-totals__sub">
                                <span className="cart-totals__sub-title">Subtotal</span>
                                <span className="cart-totals__sub-price">${calculateTotal()}</span>
                            </div>
                            <div className="cart-totals__total">
                                <span className="cart-totals__total-title">Total</span>
                                <span className="cart-totals__total-price">${calculateTotal()}</span>
                            </div>
                            <Link to={"/check-out"}><button className="cart-totals__check btn-check">Check out</button></Link>
                        </div>
                    </div>
                </div>
            </section>

            <Service />

        </>
    )
}

export default Cart