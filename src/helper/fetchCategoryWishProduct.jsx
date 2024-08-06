import summaryApi from '../common/index.js'

const fetchCategoryWiseProduct = async(category) => {
    const response = await fetch(summaryApi.categoryProduct.url, {
        method : summaryApi.categoryProduct.method,
        headers : {
            "content-type" : "application/json"
        },
        body : JSON.stringify({
            category : category
        })
    })

    const dataResponse = await response.json();

    return dataResponse;
}

export default fetchCategoryWiseProduct;