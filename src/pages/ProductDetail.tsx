import axios from 'axios';
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { IProduct } from '../interfaces/product';
import useProductQuery from '../hooks/useProductQuery';
import { useQuery } from '@tanstack/react-query';
import useCart from '../hooks/useCart';


const ProductDetail = () => {
    const { id } = useParams();
    const { data } = useProductQuery(id);

    console.log(data)
    const { mutate } = useCart()


    const { data: relatedProduct } = useQuery({
        queryKey: ['RELATED_PRODUCT'],
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/products/${product.category}/related/${product._id}`
            )
            return data
        }
    })

    return (
        <>
            {/* <!-- breadcrumbs --> */}

            <section className="breadcrumbs">
                <div className="container">
                    <div className="breadcrumbs-wrap">
                        <div className="breadcrumbs-before">
                            <span className="breadcrumbs-before__title">Home</span>
                            <img src="../public/icons/bread-arrow.svg" alt="" className="breadcrumbs-before_arrow" />
                        </div>
                        <div className="breadcrumbs-before">
                            <span className="breadcrumbs-before__title">Shop</span>
                            <img src="../public/icons/bread-arrow.svg" alt="" className="breadcrumbs-before_arrow" />
                        </div>
                        <div className="saperate" />
                        <span className="breadcrumbs-title">{data?.name}</span>
                    </div>
                </div>
            </section>


            <section className="product">
                <div className="container">
                    <div className="product-wrap">
                        <div className="product-general">
                            <div className="product-general__list">
                                {data?.gallery.map((item: string, index: number) => (
                                    <div className="product-small__item">
                                        <img src={item} alt="" className="product-small__img" />
                                    </div>
                                ))}
                            </div>
                            <div className="product-general__large">
                                <img src={data?.image} alt="" className="product-general__large-img" />
                            </div>
                        </div>
                        <div className="product-detail">
                            <div className="product-detail__info">
                                <h1 className="product-detail__title">{data?.name}</h1>
                                <span className="product-detail__price">{data?.price}</span>
                                <div className="product-detail__review">
                                    <div className="product-detail__review-list">
                                        <img src="../public/icons/star.svg" alt="" className="product-detail__review-star" />
                                        <img src="../public/icons/star.svg" alt="" className="product-detail__review-star" />
                                        <img src="../public/icons/star.svg" alt="" className="product-detail__review-star" />
                                        <img src="../public/icons/star.svg" alt="" className="product-detail__review-star" />
                                        <img src="../public/icons/0.5-star.svg" alt="" className="product-detail__review-star" />
                                    </div>
                                    <div className="saperate" />
                                    <span className="product-detail__review-customer">5 Customer Review</span>
                                </div>
                                <p className="product-detail__desc">
                                    {data?.desc}
                                </p>
                                <div className="product-detail__size">
                                    <span className="product-detail__size-title">Size</span>
                                    <div className="product-detail__size-list">
                                        <button className="product-detail__size-btn active">L</button>
                                        <button className="product-detail__size-btn">XL</button>
                                        <button className="product-detail__size-btn">XS</button>
                                    </div>
                                </div>
                                <div className="product-detail__color">
                                    <span className="product-detail__color-title">Color</span>
                                    <div className="product-detail__color-list">
                                        <button className="product-detail__color-btn color-purple" />
                                        <button className="product-detail__color-btn color-black" />
                                        <button className="product-detail__color-btn color-brown" />
                                    </div>
                                </div>
                            </div>
                            <div className="product-detail__action">
                                <div className="product-detail__number">
                                    <button className="product-detail__number-btn">
                                        -
                                    </button>
                                    <span>1</span>
                                    <button className="product-detail__number-btn">
                                        +
                                    </button>
                                </div>
                                <button className="product-detail__action-btn" onClick={() => mutate({ action: "ADD", productId: data._id, quantity: 1 })}>Add To Cart</button>
                                <button className="product-detail__action-btn">
                                    +
                                    <span>Compare</span>
                                </button>
                            </div>
                            <div className="saperate" />
                            <div className="product-detail__other">
                                <div className="product-detail__other-list">
                                    <span className="product-detail__other-item">SKU</span>
                                    <span className="product-detail__other-item">Category</span>
                                    <span className="product-detail__other-item">Tags</span>
                                    <span className="product-detail__other-item">Share</span>
                                </div>
                                <div className="product-detail__other-list">
                                    <span className="product-detail__other-item">:</span>
                                    <span className="product-detail__other-item">:</span>
                                    <span className="product-detail__other-item">:</span>
                                    <span className="product-detail__other-item">:</span>
                                </div>
                                <div className="product-detail__other-list">
                                    <span className="product-detail__other-item">SS001</span>
                                    <span className="product-detail__other-item">Sofas</span>
                                    <span className="product-detail__other-item"></span>
                                    <div className="product-detail__other-item">
                                        <img src="../public/icons/fb.svg" alt="" className="icon" />
                                        <img src="../public/icons/lked.svg" alt="" className="icon" />
                                        <img src="../public/icons/x.svg" alt="" className="icon" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- End product --> */}

            <section className="description">
                <div className="container">
                    <div className="description-block">
                        <div className="description-block__list">
                            <span className="description-block__heading active">Description</span>
                            <span className="description-block__heading">Additional Information</span>
                            <span className="description-block__heading">Reviews [5]</span>
                        </div>
                        <div className="description-block__content">
                            <p className="description-block__content-top">Embodying the raw, wayward spirit of rock ‘n’ roll, the
                                Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall,
                                unplugs the chords, and takes the show on the road.</p>
                            <p className="description-block__content-bottom">Weighing in under 7 pounds, the Kilburn is a
                                lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers
                                in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which
                                boasts a clear midrange and extended highs for a sound that is both articulate and pronounced.
                                The analogue knobs allow you to fine tune the controls to your personal preferences while the
                                guitar-influenced leather strap enables easy and stylish travel.</p>
                        </div>
                    </div>
                    <div className="description-inner">
                        <div className="description-inner__content">
                            <img src="../public/images/Cloud sofa three seater + ottoman_1 1.png" alt="" className="description-inner__content-img" />
                        </div>
                        <div className="description-inner__content">
                            <img src="../public/images/Cloud sofa three seater + ottoman_2 1.png" alt="" className="description-inner__content-img" />
                        </div>
                    </div>
                </div>
            </section>


            {/* <!-- End desc --> */}

            <section className="related">
                <div className="container">
                    <div className="related-heading">
                        <span className="related-heading__title">Related Products</span>
                    </div>
                    <div className="product-list">
                        {relatedProduct?.map((product: IProduct, index: number) => (
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
                                    <button className="btn product-action__addtocart" onClick={() => mutate({ productId: product._id, quantity: 1 })} >Add To Cart</button>
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
                    <div className="related-more">
                        <button className="related-more__btn">SHOW MORE</button>
                    </div>
                </div>
            </section>


        </>
    )
}

export default ProductDetail