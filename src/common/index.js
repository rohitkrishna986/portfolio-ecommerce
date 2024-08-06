const backDomain = 'https://rohit-portfolio-b69a.onrender.com'

const summaryApi = {
    register : {
        url : `${backDomain}/api/signup`,
        method : 'POST'
    },
    login : {
        url : `${backDomain}/api/signin`,
        method : "POST"
    },
    userDetails : {
        url : `${backDomain}/api/user-details`,
        method : "GET"
    },
    userLogout : {
        url : `${backDomain}/api/userLogout`,
        method : "GET"
    },
    allUsers : {
        url : `${backDomain}/api/all-user`,
        method : "GET"
    },
    updateUser : {
        url : `${backDomain}/api/update-user`,
        method : "POST"
    },
    uploadProduct : {
        url : `${backDomain}/api/upload-product`,
        method : "POST"
    },
    getAllProduct : {
        url : `${backDomain}/api/get-product`,
        method : "GET"
    },
    updateProduct : {
        url : `${backDomain}/api/update-product`,
        method : "POST"
    },
    getProduct : {
        url : `${backDomain}/api/get-category`,
        method : "GET"
    },
    categoryProduct : {
        url : `${backDomain}/api/category-product`,
        method : "POST"
    },
    productDetails : {
        url : `${backDomain}/api/product-detail`,
        method: "POST"
    },
    addToCart : {
        url : `${backDomain}/api/addtocart`,
        method : "POST"
    },
    countAddToCart : {
        url : `${backDomain}/api/countAddToCart`,
        method : "GET"
    },
    addToCartView : {
        url : `${backDomain}/api/addToCartView`,
        method : "GET"
    },
    updateAddToCart : {
        url : `${backDomain}/api/updateAddToCart`,
        method : "POST"
    },
    deleteAddToCart : {
        url : `${backDomain}/api/deleteAddToCart`,
        method : "POST"
    },
    searchProduct : {
        url : `${backDomain}/api/searchProduct`,
        method : "GET"
    },
    filterProduct : {
        url : `${backDomain}/api/filter-Product`,
        method : "POST"
    }
}

export default summaryApi;