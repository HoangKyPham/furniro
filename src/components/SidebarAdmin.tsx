import axios from 'axios';
import React, { useEffect, useState } from 'react'
// import { menuList } from '../api/menu';
import { Link, NavLink } from 'react-router-dom';


const Sidebar = () => {

    return (

        <div className="sidebar">
            <div className="logo-details">
                <Link to={"/admin"}>
                    <span className="logo_name"> Furniro</span>
                </Link>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to={"/admin"}>
                        <i className="bx bx-box" />
                        <span className="links_name">Product</span>
                    </Link>
                </li>
                
                <li>
                    <Link to={"orders"}>
                        <i className="bx bx-box" />
                        <span className="links_name">Oder</span>
                    </Link>
                </li>
              
                <li className="log_out">
                    <a href="=log_out">
                        <i className="bx bx-log-out" />
                        <span className="links_name">Log out</span>
                    </a>
                </li>
            </ul>
        </div>




    )
}

export default Sidebar