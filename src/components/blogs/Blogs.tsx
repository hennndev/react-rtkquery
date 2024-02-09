import React from 'react'
import Blog from './Blog'
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'
import { handleQueries } from '../../utils/utils'
import { useGetBlogsQuery } from '../../store/api/apiSlice'

const Blogs = () => {
    const location = useLocation()
    const queryStr = queryString.parse(location.search)
    const queries = handleQueries(queryStr)
    const { data: blogsData, isLoading } = useGetBlogsQuery(1)

    if(!blogsData && !isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className='grid grid-cols-cards gap-10'>
            {blogsData && blogsData.filter((blog: BlogTypes) => {
                if(queryStr.q) {
                    queryStr.q = queryStr.q as string
                    return blog.title.toLowerCase().includes(queryStr.q.toLowerCase() as string)
                } else if(queryStr.category) {
                    return blog.category === queryStr.category as string
                } else {
                    return blog
                }
            }).filter((blog: BlogTypes) => blog.isShow).map((blog: BlogTypes) => (
                <Blog key={blog.id} blog={blog}/>
            ))}
        </div>
    )
}

export default Blogs