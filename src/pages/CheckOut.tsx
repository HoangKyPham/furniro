import React from 'react'
import Banner from '../components/Banner'
import Service from '../components/Service'
import { useForm } from 'react-hook-form';
import { useLocalStorage } from '../hooks/useStorage';
import useCart from '../hooks/useCart';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { IProduct } from '../interfaces/product';


const CheckOut = () => {
    const form = useForm();
    const [user] = useLocalStorage("user", {});
    const userId = user?.user?._id;
    const { data, calculateTotal } = useCart();
    const { mutate } = useMutation({
        mutationFn: async (order: {
            userId: string;
            items: [];
            totalPrice: number;
            customerInfo: object;
        }) => {
            const { data } = await axios.post(
                "http://localhost:8080/api/v1/orders",
                order,
            );
            return data;
        },
        onSuccess: () => {
            // navigate("/thankyou")
            alert("Đặt hàng thành công");
        },
    });

    const onSubmit = (formData: object) => {
        mutate({
            userId,
            items: data?.products,
            totalPrice: calculateTotal(),
            customerInfo: formData,
        });
    };


    return (
        <>
            <Banner />
            <section className="checkout">
                <div className="container">
                    <div className="checkout-wrap">
                        <form className="form" id='form' onSubmit={form.handleSubmit(onSubmit)}>
                            <span className="form-heading">Billing details</span>
                            <div className="form-info">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-input" id="name" {...form.register("name", { required: true })} />
                                {form.formState.errors.name && <p className="error-message">Name is required</p>}
                            </div>
                            <div className="form-info">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-input" id="email" {...form.register("email", { required: true })} />
                                {form.formState.errors.email && <p className="error-message">Email is required</p>}
                            </div>
                            <div className="form-info">
                                <label htmlFor="phone" className="form-label">Phone</label>
                                <input type="text" className="form-input" id="phone" {...form.register("phone")} />
                            </div>
                            <div className="form-info">
                                <label htmlFor="city" className="form-label">City</label>
                                <input type="text" className="form-input" id="city" {...form.register("city")} />
                            </div>
                        </form>

                        <div className="checkout-bill">
                            <div className="checkout-bill__title">
                                <span className="checkout-bill__title-heading">Product</span>
                                <span className="checkout-bill__title-heading">Subtotal</span>
                            </div>
                            {data?.products?.map((item: IProduct, index : number) => (
                                <div className="checkout-bill__title" key={index}>
                                    <span className="checkout-bill__title-product">{item.name}</span>
                                    <span className="checkout-bill__title-price">{item.price}</span>
                                </div>
                            ))}
                            <div className="checkout-bill__title">
                                <span className="checkout-bill__title-sub">Subtotal</span>
                                <span className="checkout-bill__title-price"> {calculateTotal()}</span>
                            </div>
                            <div className="checkout-bill__title">
                                <span className="checkout-bill__title-sub">Total</span>
                                <span className="checkout-bill__title-priceTotal"> {calculateTotal()}</span>
                            </div>
                            <div className="saperate" />
                            <div className="checkout-bill__desc">
                                <div className="checkout-bill__block">
                                    <div className="dot-black" />
                                    <span className="checkout-bill__block-heading">Direct Bank Transfer</span>
                                </div>
                                <p className="checkout-bill__desc-tranfer">Make your payment directly into our bank account. Please
                                    use your Order ID as the payment reference. Your order will not be shipped until the funds
                                    have cleared in our account.</p>
                                <div className="checkout-bill__block">
                                    <div className="dot-white" />
                                    <span className="checkout-bill__block-tranfer">Direct Bank Transfer</span>
                                </div>
                                <div className="checkout-bill__block">
                                    <div className="dot-white" />
                                    <span className="checkout-bill__block-tranfer">Cash On Delivery</span>
                                </div>
                                <p className="checkout-bill__privacy">Your personal data will be used to support your experience
                                    throughout this website, to manage access to your account, and for other purposes described
                                    in our <strong>privacy policy.</strong></p>
                                <div className="wrap-btn">
                                    <button form="form" className="checkout-bill__btn">Place order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Service />
        </>
    )
}

export default CheckOut