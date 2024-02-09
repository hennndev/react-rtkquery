import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header className='container flex-between py-2 px-4 text-gray-600'>
            <h1 className='text-2xl font-medium text-gray-600'>Blogify</h1>
            <nav className='flexx space-x-4'>
                <Link to='/' className='hover:underline'>Homepage</Link>
                <Link to='/dashboard' className='hover:underline'>Dashboard</Link>
                <Link to='/add-blog' className='hover:underline'>Add Blog</Link>
            </nav>
        </header>
    )
}
export default Navbar