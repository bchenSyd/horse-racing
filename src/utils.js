const getMaxVal = (val1, val2) => {
    if (typeof val1 === 'undefined' && typeof val2 === 'undefined'){
        return undefined
    } 

    let result = undefined
    if (typeof val1 === 'undefined') {
        result = val2
    }
    if (typeof val2 === 'undefined') {
        result = val1
    }
    result= val1 > val2 ? val1 : val2
    return result
}

export {
    getMaxVal
}