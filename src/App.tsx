import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Outlet } from 'react-router-dom'
// pages
import AddBlog from './pages/AddBlog'
import Homepage from './pages/Homepage'
import BlogsPage from './pages/BlogsPage'
import Dashboard from './pages/Dashboard'
import BlogDetail from './pages/BlogDetail'
import UpdateBlog from './pages/UpdateBlog'

const App = () => {
    return (
        <Routes>
            <Route element={<MainLayout/>}>
                <Route path='/' element={<Homepage/>}/>
                <Route path='/blogs' element={<BlogsPage/>}/>
                <Route path='/blogs/:blogId' element={<BlogDetail/>}/>
                <Route path='/add-blog' element={<AddBlog/>}/>
                <Route path='/update-blog/:blogId' element={<UpdateBlog/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
            </Route>
        </Routes>
    )
}

const MainLayout = () => {
    return (
        <>
            <Navbar/>
            <main>
                <Outlet/>
            </main>
        </>
    )
}


export default App