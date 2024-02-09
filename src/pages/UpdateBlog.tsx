import React from 'react'
import { useParams } from 'react-router-dom'
import BlogForm from '../components/forms/BlogForm'

const UpdateBlog = () => {

    const { blogId } = useParams()

    return (
        <section className='container flex-center pt-14 mb-10'>
            <BlogForm blogId={blogId} formTitle="Edit Blog"/>
        </section>
    )
}

export default UpdateBlog