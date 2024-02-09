import React from 'react'
import queryString from 'query-string'
import { useLocation, useSearchParams } from 'react-router-dom'

const Categories = () => {
    const location = useLocation()
    const queryStr = queryString.parse(location.search)
    const [_, setSearchParams] = useSearchParams()
    const newQueryParams: URLSearchParams = new URLSearchParams()

    const handleCategory = (cty: string) => {
        const queries = Object.keys(queryStr).map(key => ({
            key: key,
            value: queryStr[key]
        }))
        queries.forEach(query => {
            newQueryParams.set(query.key, query.value as string)
        })
        if(cty) {
            newQueryParams.set('category', cty)
        } else {
            newQueryParams.delete('category')
        }
        setSearchParams(newQueryParams)
    }

    const isActive = (value: string) => {
        if(queryStr.category === undefined && value === 'all') {
            return 'bg-gray-800 text-white'
        }
        if(queryStr.category === value) {
            return 'bg-gray-800 text-white'
        }
    }

    console.log(queryStr)

    return (
        <div className='flex-center flex-wrap mt-5'>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('all')}`} onClick={() => handleCategory('')}>All Category</p>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('programming')}`} onClick={() => handleCategory('programming')}>Programming</p>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('graphic-design')}`} onClick={() => handleCategory('graphic-design')}>Graphic Design</p>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('blockchain')}`} onClick={() => handleCategory('blockchain')}>Blockchain</p>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('bussines')}`} onClick={() => handleCategory('bussines')}>Bussines</p>
            <p className={`py-1.5 px-3 rounded-md border border-gray-200 shadow-sm text-[15px] text-gray-600 mr-4 mb-2 cursor-pointer hover:bg-gray-800 hover:text-white ${isActive('web3')}`} onClick={() => handleCategory('web3')}>Web3</p>
        </div>
    )
}

export default Categories