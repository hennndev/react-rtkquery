import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ["Blogs"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3500"
    }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => `/blogs`,
            providesTags: ["Blogs"]
        }),
        getBlog: builder.query({
            query: (blogId: string) => ({
                url: `/blogs/${blogId}`,
                method: 'GET'
            })
        }),
        addBlog: builder.mutation({
            query: (blog: BlogTypes) => ({
                url: '/blogs',
                method: 'POST',
                body: blog
            }),
            invalidatesTags: ["Blogs"]
        }),
        updateBlog: builder.mutation({
            query: (blog: BlogTypes) => ({
                url: `/blogs/${blog.id}`,
                method: 'PUT',
                body: blog
            }),
            invalidatesTags: ["Blogs"]
        }),
        deleteBlog: builder.mutation({
            query: (blogId: string) => ({
                url: `/blogs/${blogId}`,
                method: 'DELETE'
            }),
            invalidatesTags: ["Blogs"]
        }),
        handleShowBlog: builder.mutation({
            query: (blog: BlogTypes) => ({
                url: `/blogs/${blog.id}`,
                method: 'PATCH',
                body: blog
            }),
            invalidatesTags: ["Blogs"]
        })
    })
})

export const { useGetBlogsQuery, useGetBlogQuery, useAddBlogMutation, useUpdateBlogMutation, useDeleteBlogMutation, useHandleShowBlogMutation } = apiSlice
