import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const HeaderAdmin = () => {
    return (
        <section className="home-section">
            <nav>
                <div className="sidebar-button">
                    <i className="bx bx-menu sidebarBtn" />
                    <span className="dashboard">Dashboard</span>
                </div>
                <div className="search-box">
                    <form >
                        <input type="text" placeholder="Search..." name="keyw" style={{ height: 48 }} required />
                        <i className="bx bx-search">
                            <button type='submit'>
                                <img src="../public/icons/search.svg" alt="" srcset="" />
                            </button>
                        </i>
                    </form>
                </div>
                <div className="profile-details">
                    <img src="../public/images/avatar-6.jpg" alt="" />
                    <span className="admin_name">Hoàng Kỳ</span>
                    <i className="bx bx-chevron-down" />
                </div>
            </nav>
            <div className="home-content">
                <Outlet />
            </div>
        </section>
    )
}

export default HeaderAdmin