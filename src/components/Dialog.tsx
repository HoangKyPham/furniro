import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import Joi from 'joi'
import { useLocalStorage } from '../hooks/useStorage'
import { Link, useNavigate } from 'react-router-dom'

const signinSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(3)
        .required(),
    password: Joi.string().min(6).required()
})

const Dialog = () => {
    const navigate = useNavigate();
    const [user, setUser] = useLocalStorage('user', {})
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(signinSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { mutate } = useMutation({
        mutationFn: async (formData: { email: string; password: any }) => {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/login', formData)
            return data
        },
        onSuccess: (data) => {
            setUser(data);
            alert("dang nhap thanh cong");
            setTimeout(() => {
                window.location.reload();
            }, 500)
        },
        onError: (error) => console.log(error)
    })

    const onSubmit = (formData: { email: string; password: any }) => {
        mutate(formData)
    }

    function handleCloseButtonClick() {
        const dialog = document.querySelector('.dialog');
        if (dialog) {
            dialog.style.display = 'none';
        }
    };
    return (
        <div className="dialog" style={{ display: 'none' }}>
            <div className="dialog__content">
                <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
                    <span className="form-login__heading">Billing details</span>
                    <div className="form-login__control">
                        <label htmlFor="company" className="form-login__control-label">Email:</label>
                        <input type="text" {...register('email', { required: true, minLength: 3 })} className="form-login__control-input" id="company" />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className="form-login__control">
                        <label htmlFor="password" className="form-login__control-label">Password:</label>
                        <input type='password' {...register('password', { required: true, minLength: 6 })} className="form-login__control-input" id="password" />
                        {errors.password && <p>{errors.password.message}</p>}
                    </div>
                    <div className="form-login__btn">
                        <button className="btn" type="submit">Login</button>
                        <Link to={"/register"} onClick={() => handleCloseButtonClick()} ><button className="btn" type="submit">Register</button></Link>
                    </div>
                </form>
                <div className='login-option'>
                    <span className='login-option__text'>OR</span>
                </div>
                <div className="form-login__social">
                    <button className="btn-block login-fb">
                        <img src="./public/icons/fb-login.svg" alt="" srcSet="" />
                        Facebook</button>
                    <button className="btn-block login-gg">
                        <img src="./public/icons/gg-login.svg" alt="" srcSet="" />
                        Google</button>
                </div>
                <div className="dialog-close">
                    <button onClick={() => handleCloseButtonClick()} className="dialog-close__btn">
                        <img src="../public/icons/close.svg" alt="" srcSet="" />
                    </button>
                </div>
            </div>
            <div className="dialog__overlay" />
        </div>
    )
}

export default Dialog