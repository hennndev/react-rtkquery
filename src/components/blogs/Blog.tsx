import React from 'react'
import { useNavigate } from 'react-router-dom'

type PropsTypes = {
    blog: BlogTypes
}

const Blog = ({blog}: PropsTypes) => {
    const navigate = useNavigate()
    
    return (
        <div className='max-h-[450px] group shadow-md rounded-md'>
            <div className='h-[220px]'>
                <img src={blog.image} alt={blog.title} className='object-full w-full h-full rounded-t-md'/>
            </div>
            <div className='pt-2 pb-5 px-5 flex flex-col text-gray-600'>
                <div className='flex-between mb-2'>
                    <p className='text-sm capitalize font-medium'>{blog.category.includes('-') ? blog.category.replace('-', ' ') : blog.category}</p>
                    <p className='text-sm'>{blog.createdAt}</p>
                </div>
                <h1 className='group-hover:underline cursor-pointer text-gray-600 font-bold line-clamp-1 text-xl mb-1' onClick={() => navigate(`/blogs/${blog.id}`)}>{blog.title}</h1>
                <p className='line-clamp-4 text-gray-500'>{blog.content}</p>
            </div>
        </div>
    )
}
export default Blog