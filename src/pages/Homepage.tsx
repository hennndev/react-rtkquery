import React from 'react'
import Blogs from '../components/blogs/Blogs'
import SearchInput from '../components/SearchInput'

const Homepage = () => {
    return (
        <div className='container px-4 mt-10'>
            <div className="flex-center mb-7">
                <SearchInput/>
            </div>
            <Blogs/>
        </div>
    )
}

export default Homepage