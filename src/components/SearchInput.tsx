import { ChangeEvent, FormEvent, useState } from 'react'
import queryString from 'query-string'
import {DebounceInput} from 'react-debounce-input'
import { MdOutlineSearch, MdClose } from "react-icons/md"
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'

const SearchInput = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryStr = queryString.parse(location.search)
    const [searchTerm, setSearchTerm] = useState<string>(queryStr.q as string || '')
    const [_, setSearchParams] = useSearchParams()
    const newQueryParams: URLSearchParams = new URLSearchParams()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if(location.pathname !== '/') {
            return
        }
        if(!searchTerm) {
            return
        }
        navigate(`/blogs?q=${searchTerm}`)  
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if(location.pathname === '/') {
            setSearchTerm(value)
        } else {
            setSearchTerm(value)
            const queries = Object.keys(queryStr).map(key => ({
                key: key,
                value: queryStr[key]
            }))
            queries.forEach(query => {
                newQueryParams.set(query.key, query.value as string)
            })
            if(value) {
                newQueryParams.set('q', value)
            } else {
                newQueryParams.delete('q')
            }
            setSearchParams(newQueryParams)
        }   
    }

    const clear = () => {
        setSearchTerm('')
        const queries = Object.keys(queryStr).map(key => ({
            key: key,
            value: queryStr[key]
        }))
        queries.forEach(query => {
            newQueryParams.set(query.key, query.value as string)
        })
        newQueryParams.delete('q')
        setSearchParams(newQueryParams)
    }

    return (
        <form onSubmit={handleSubmit} className='flexx border border-gray-300 px-3 rounded-md w-[400px]'>
            <div className="flexx flex-1">
                <MdOutlineSearch className='text-xl mr-3 text-gray-600' onClick={(e) => location.pathname === '/' && handleSubmit(e)}/>
                <DebounceInput debounceTimeout={location.pathname === '/' ? 1 : 300} type="text" placeholder='Type to search blogs' className='flex-1 py-2 border-none outline-none bg-transparent text-gray-600' value={searchTerm} onChange={handleChange}/>
            </div>
            {searchTerm && <MdClose className='text-xl ml-3 text-gray-600 cursor-pointer' onClick={clear}/>}
        </form>
    )
}

export default SearchInput