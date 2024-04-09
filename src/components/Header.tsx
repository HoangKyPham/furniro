import React, { useContext, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Dialog from './Dialog';
import { useLocalStorage } from '../hooks/useStorage';

const Header = () => {

    const [user] = useLocalStorage("user",{});
    let infoUser = user;

    function handleUserLoginClick() {
        const dialog = document.querySelector('.dialog');
        if (dialog) {
            dialog.style.display = 'flex';
        }
    };

    function handleCloseButtonClick() {
        const dialog = document.querySelector('.dialog');
        if (dialog) {
            dialog.style.display = 'none';
        }
    };


    return (
        <header className="header">
            <div className="container">
                <div className="header-inner">
                    <Link to={"/"} className="logo">
                        <img alt='' src="../public/images/Meubel House_Logos-05 (1).png" className="logo__icon" />
                        Furniro
                    </Link>
                    <div className="button-mobile"><button>=</button></div>
                    <nav className="main-menu">
                        <ul className="main-menu__list">
                            <li className="main-menu__item">
                                <Link to={"/"} className="main-menu__link">Home</Link>
                            </li>
                            <li className="main-menu__item">
                                <Link to={"/shop"} className="main-menu__link">Shop</Link>
                            </li>
                            <li className="main-menu__item">
                                <a href="#!" className="main-menu__link">About</a>
                            </li>
                            <li className="main-menu__item">
                                <a href="#!" className="main-menu__link">Contact</a>
                            </li>
                        </ul>
                    </nav>
                    <div className="header-items">
                        {infoUser && infoUser?.user?.role === "admin" ? (
                            <NavLink to="/admin">
                                <button type="button" className="btn btn-outline-primary btn-user__header me-2 ms-2">
                                    {infoUser.user.name}
                                </button>
                            </NavLink>
                        ) : infoUser && infoUser?.user?.role === "user" ? (
                            <NavLink to={`user-info`}>
                                <button type="button" className="btn btn-outline-primary btn-user__header me-2 ms-2">
                                    {infoUser.user.name}
                                </button>
                            </NavLink>
                        ) : (
                            <div className="header-item-user">
                                <button onClick={() => handleUserLoginClick()} className="user-login">
                                    <img alt='' src="../public/icons/user.svg" />
                                </button>
                            </div>
                        )}
                        <div className="header-item-user">
                            <span><img alt='' src="../public/icons/search.svg" /></span>
                        </div>
                        <div className="header-item-user">
                            <span><img alt='' src="../public/icons/favourite.svg" /></span>
                        </div>
                        <div className="header-item-user">
                            <Link to={"cart"}><img alt='' src="../public/icons/cart.svg" /></Link>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog />

        </header >

    )
}

export default Header