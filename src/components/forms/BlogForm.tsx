import { useState, useEffect } from 'react'
import moment from 'moment'
import {useForm} from 'react-hook-form'
import { nanoid } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'
import { promiseTime } from '../../utils/utils'
import { useAddBlogMutation, useGetBlogQuery, useUpdateBlogMutation } from '../../store/api/apiSlice'

type PropsTypes = {
    formTitle: string
    blogId?: string
}

type FormTypes = {
    title: string
    author: string
    category: string
    image: string
    content: string
}

const BlogForm = ({formTitle, blogId}: PropsTypes) => {
    const [addBlog] = useAddBlogMutation()
    const [updateBlog] = useUpdateBlogMutation()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, formState: {errors}, handleSubmit, reset, setValue } = useForm<FormTypes>({
        defaultValues: {
            title: '',
            author: '',
            category: '',
            image: '',
            content: ''
        }
    })
    const { data: blogData, isError } = useGetBlogQuery(blogId as string, {skip: !Boolean(blogId as string)})
    const onSubmit = async (values: FormTypes) => {
        setIsLoading(true)
        try {
            await promiseTime()
            if(!blogId) {
                await addBlog({
                    id: nanoid(),
                    title: values.title,
                    author: values.author,
                    category: values.category,
                    image: values.image,
                    content: values.content,
                    createdAt: moment(new Date).format('L'),
                    isShow: false
                })
            } else {
                await updateBlog({
                    ...blogData,
                    title: values.title,
                    author: values.author,
                    category: values.category,
                    image: values.image,
                    content: values.content,
                })
            }
            reset()
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if(blogId && blogData) {
            setValue('title', blogData.title)
            setValue('author', blogData.author)
            setValue('category', blogData.category)
            setValue('image', blogData.image)
            setValue('content', blogData.content)
        }
    }, [blogId, blogData])

    useEffect(() => {
        if(blogId && isError) {
            navigate('/')
        }
    }, [blogId, isError])
    
    return (
        <form className='border border-gray-200 shadow-md rounded-md w-full p-8' onSubmit={handleSubmit(onSubmit)}>
            <h1 className='font-semibold text-3xl text-gray-600 text-center mb-5'>{formTitle}</h1>
            <div className="input-control">
                <label htmlFor="title">Blog title</label>
                <input 
                    type="text" 
                    id="title" 
                    {...register('title', {
                        required: 'This field is required',
                        minLength: {
                            value: 5,
                            message: 'Minimum title length is 5 character'
                        }
                    })}
                    placeholder="Type blog title here"/>
                {errors.title && <p className='text-error'>{errors.title.message}</p>}
            </div>
            <div className="input-control">
                <label htmlFor="author">Blog author</label>
                <input 
                    type="text" 
                    id="author" 
                    {...register('author', {
                        required: 'This field is required'
                    })}
                    placeholder='Type blog author here'/>
                {errors.author && <p className='text-error'>{errors.author.message}</p>}
            </div>
            <div className="input-control">
                <label htmlFor="category">Blog category</label>
                <select 
                    id="category"
                    {...register('category', {
                        required: 'This field is required'
                    })}>
                    <option value="">Choose category</option>
                    <option value="programming">Programming</option>
                    <option value="graphic-design">Graphic design</option>
                    <option value="cryptocurrency">Cryptocurrency</option>
                    <option value="bussines">Bussines</option>
                </select>
                {errors.category && <p className='text-error'>{errors.category.message}</p>}
            </div>
            <div className="input-control">
                <label htmlFor="image">Blog image</label>
                <input  
                    type="text" 
                    id="image" 
                    {...register('image', {
                        required: 'This field is required',
                        validate: (value: string) => {
                            return value.includes('.jpg') || value.includes('.jpeg') || value.includes('.png') || 'Image format must be jpg/jpeg/png'
                        }
                    })}/>
                {errors.image && <p className='text-error'>{errors.image.message}</p>}
            </div>
            <div className="input-control">
                <label htmlFor="content">Blog content</label>
                <textarea 
                    id="content" 
                    rows={8} 
                    {...register('content', {
                        required: 'This field is required',
                        validate: (value: string) => {
                            return value.split(' ').length >= 20 || 'Minimum content words is 20 words or more'
                        }
                    })}
                    placeholder='Type blog content here'/>
                {errors.content && <p className='text-error'>{errors.content.message}</p>}
            </div>
            <button type='submit' disabled={isLoading} className={`btn w-full !mt-3 ${isLoading ? 'bg-gray-500 cursor-not-allowed' : ''}`}>
                {isLoading ? 'Waiting...' : 'Submit'}
            </button>
        </form>
    )
}
export default BlogForm