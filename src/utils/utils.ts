import { ParsedQuery } from "query-string"

export const promiseTime = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 2000);
    })
}


export const handleQueries = (queryStr: ParsedQuery<string>) => {
    let currentQueriesStr = ''
    const queriesArray = Object.keys(queryStr).map(key => {
        return {
            key: key,
            value: queryStr[key]
        }
    })
    queriesArray.forEach((query, index) => {
        currentQueriesStr += `${index === 0 ? '?' : ''}${query.key}=${query.value}${queriesArray.length - 1 !== index ? '&' : ''}`
    })
    return currentQueriesStr
}