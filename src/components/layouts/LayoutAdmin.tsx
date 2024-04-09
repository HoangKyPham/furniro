import React from 'react'
import HeaderAdmin from '../HeaderAdmin'
import SidebarAdmin from '../SidebarAdmin'
import { Outlet } from 'react-router-dom'
import "../../assets/scss/admin.scss"

const LayoutAdmin = () => {
    return (
        <>
            <SidebarAdmin />
            <HeaderAdmin />
        </>
    )
}

export default LayoutAdmin