import { QrCode, Search } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React from 'react'

export default function Nav() {
    return (
        <nav style={{
            background: '#5D5E6C',
        }} className='d-flex flex-wrap px-5 py-3 mb-3 mb-lg-0 container-fluid align-items-center justify-content-between align-items-center'>

            <div className='text-center m-auto m-lg-0'>
                <img src='/logoSolana.png' alt='logo' />
            </div>
            <div className='d-flex m-auto m-lg-0 align-items-center justify-lg-content-center g-2'>
                <span>
                    <Search sx={{ height: 24, marginRight: 5, }} />
                </span>
                <span>
                    <QrCode sx={{ height: 24, marginRight: 5, }} />
                </span>
                <Avatar sx={{ height: 40, width: 40, border: '1px solid white' }} src='/logo.png' alt="Profile Picture" />
            </div>
        </nav>
    )
}
