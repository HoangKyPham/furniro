import React, { useContext } from 'react'
import Service from '../components/Service'
import Banner from '../components/Banner'
import { IProduct } from '../interfaces/product'
import { Link } from 'react-router-dom'
import useProductQuery from '../hooks/useProductQuery'

const Shop = () => {
    const { data } = useProductQuery();
    console.log(data);
    return (
        <>
            <Banner />
            {/* <!-- filter --> */}
            <div>
                <section className="filter">
                    <div className="container">
                        <div className="filter-wrap">
                            <div className="filter-left">
                                <ul className="filter-left__list">
                                    <li className="filter-left__list-item">
                                        <img src="./public/icons/filter.svg" alt="" className="filter-left__icon" />
                                        <span className="filter-left__item-title">Filter</span>
                                    </li>
                                    <li className="filter-left__list-item">
                                        <img src="./public/icons/dot-filter.svg" alt="" className="filter-left__icon" />
                                    </li>
                                    <li className="filter-left__list-item">
                                        <img src="./public/icons/list-filter.svg" alt="" className="filter-left__icon" />
                                    </li>
                                </ul>
                                <div className="saperate" />
                                <span className="filter-left__title">Showing 1–16 of 32 results</span>
                            </div>
                            <div className="filter-right">
                                <div className="filter-result">
                                    <div className="filter-result__block">
                                        <span className="filter-result__block-title">Show</span>
                                        <span className="filter-result__block-info">16</span>
                                    </div>
                                    <div className="filter-result__block">
                                        <span className="filter-result__block-title">Short by</span>
                                        <span className="filter-result__block-info default">Default</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* {/* Product */}
                <section className="products">
                    <div className="container">
                        <div className="section-body">
                            <div className="product-list">
                                {data?.data?.map((product: IProduct, index: number) => (
                                    <div className="product-item" key={index}>
                                        <div className="product-image">
                                            <img src={product.image} alt="" className="product__thumbnail" />
                                            <span className="product-sale">30%</span>
                                        </div>
                                        <div className="product-info">
                                            <h3 className="product__name">
                                                <a href="" className="product__link">{product.name}</a>
                                            </h3>
                                            <a href="" className="product__category">Stylish cafe chair</a>
                                            <div className="product-price">
                                                <span className="product-price__new">{product.price}$</span>
                                                <span className="product-price__old">$300</span>
                                            </div>
                                        </div>
                                        <div className="product-actions">
                                            <button className="btn product-action__quickview"><Link to={`/product-detail/${product.id}`}>Quick View</Link></button>
                                            <button className="btn product-action__addtocart">Add To Cart</button>
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
                        </div>
                    </div>
                </section>
                {/* End products */}
                <section className="action">
                    <div className="action-list">
                        <button className="action-item active">1</button>
                        <button className="action-item">2</button>
                        <button className="action-item">3</button>
                        <button className="action-item">Next</button>
                    </div>
                </section>
            </div>
            <Service />


        </>
    )
}

export default Shop