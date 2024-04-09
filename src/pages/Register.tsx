import { joiResolver } from '@hookform/resolvers/joi';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Joi from 'joi';
import { FieldError, useForm } from 'react-hook-form';
import Dialog from '../components/Dialog';

const Register = () => {
    const schema = Joi.object({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
        password: Joi.string().required().min(6),
        confirmPassword: Joi.string().required().min(6),
        name: Joi.string().required().min(3).max(30),
        avatar: Joi.string().uri()
    });

    function handleUserLoginClick() {
        const dialog = document.querySelector('.dialog');
        if (dialog) {
            dialog.style.display = 'flex'; 
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: joiResolver(schema)
    });

    const { mutate } = useMutation({
        mutationFn: async (formData) => {
            const { data } = await axios.post('http://localhost:8080/api/v1/auth/register', formData)
            return data;
        },
        onSuccess: () => {
            alert("Đăng ký thành công");
            handleUserLoginClick();
        },
        onError: (error) => console.log(error.message)
    });

    const onSubmit = (formData: any) => {
        mutate(formData);
    }

    return (
        <>
            <section className="form-wrap">
                <form className="form" onSubmit={handleSubmit(onSubmit)}>
                    <span className="form-heading">Register</span>
                    <div className="form-name">
                        <div className="form-info">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-input" id="email" {...register('email')} />
                            {errors.email && <p>{(errors.email as FieldError)?.message}</p>}
                        </div>
                    </div>
                    <div className="form-info">
                        <label htmlFor="password" className="form-label">Mật khẩu</label>
                        <input type="password" className="form-input" id="password" {...register('password')} />
                        {errors.password && <p>{(errors.password as FieldError)?.message}</p>}
                    </div>
                    <div className="form-info">
                        <label htmlFor="confirmPassword" className="form-label">Xác nhận mật khẩu</label>
                        <input type="password" className="form-input" id="confirmPassword" {...register('confirmPassword')} />
                        {errors.confirmPassword && <p>{(errors.confirmPassword as FieldError)?.message}</p>}
                    </div>
                    <div className="form-info">
                        <label htmlFor="name" className="form-label">Tên</label>
                        <input type="text" className="form-input" id="name" {...register('name')} />
                        {errors.name && <p>{(errors.name as FieldError)?.message}</p>}
                    </div>
                    <div className="form-info">
                        <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                        <input type="text" className="form-input" id="avatar" {...register('avatar')} />
                        {errors.avatar && <p>{(errors.avatar as FieldError)?.message}</p>}
                    </div>
                    <div className="form-login">
                        <button className="btn form-login__btn" type="submit">Submit</button>
                    </div>
                </form>
            </section>
            <Dialog />
        </>
    );
}

export default Register;
