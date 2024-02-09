import { useState } from 'react'
import { promiseTime } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import { useGetBlogsQuery, useDeleteBlogMutation, useHandleShowBlogMutation } from '../store/api/apiSlice'

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    const [deleteBlog] = useDeleteBlogMutation()
    const [handleShow] = useHandleShowBlogMutation()
    const { data: blogsData } = useGetBlogsQuery(1)

    const handleDelete = async (blogId: string) => {
        const confirmDelete = confirm('Are you sure want to delete this blog?')
        if(!confirmDelete) {
            return
        }
        setIsLoading(true)
        try {
            await promiseTime()
            await deleteBlog(blogId)
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleShowBlog = async (blog: BlogTypes) => {
        setIsLoading(true)
        try {
            await promiseTime()
            await handleShow({
                ...blog,
                isShow: blog.isShow ? false : true
            })
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='container py-10'>
            {blogsData && blogsData.length > 0 && (
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-800 uppercase">Title</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-800 uppercase">Category</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-800 uppercase">Author</th>
                                    <th scope="col" className="px-6 py-3 text-start text-sm font-medium text-gray-800 uppercase">Created At</th>
                                    <th scope="col" className="px-6 py-3 text-end text-sm font-medium text-gray-800 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {blogsData && blogsData.map((blog: BlogTypes) => (
                                    <tr key={blog.id}>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-600 max-w-[300px]">
                                            {blog.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {blog.category}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{blog.author}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{blog.createdAt}</td>
                                        <td className="px-6 py-4 text-end text-sm font-medium space-x-3">
                                            <button type="button" disabled={isLoading} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none" onClick={() => navigate(`/update-blog/${blog.id}`)}>Edit</button>
                                            <button type="button" disabled={isLoading} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 disabled:opacity-50 disabled:pointer-events-none" onClick={() => handleDelete(blog.id)}>Delete</button>
                                            <button type="button" disabled={isLoading} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:pointer-events-none" onClick={() => handleShowBlog(blog)}>
                                                {blog.isShow ? 'Hidden' : 'Show'}
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            </table>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            {blogsData && blogsData.length < 1 && (
                <div className='flex-center flex-col'>
                    <p className='text-gray-600'>You have not blogs data currently!</p>
                    <button type="button" disabled={isLoading} className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none mt-2" onClick={() => navigate('/add-blog')}>Add blog</button>
                </div>
            )}
        </section>
    )
}

export default Dashboard