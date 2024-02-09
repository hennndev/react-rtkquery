import React from 'react'
import Blogs from '../components/blogs/Blogs'
import SearchInput from '../components/SearchInput'
import Categories from '../components/Categories'

const BlogsPage = () => {
    return (
        <div className='container px-4 mt-10'>
            <div className="flex-center flex-col mb-7">
                <SearchInput/>
                <Categories/>
            </div>
            <Blogs/>
        </div>
    )
}

export default BlogsPage