import { createBrowserRouter } from 'react-router-dom';
import App from '../App.jsx';
import Login from '../components/Login.jsx'
import Home from '../pages/Home.jsx';
import Register from '../components/Register.jsx';
import ForgetPassword from '../components/ForgetPassword.jsx';
import AdminPanel from '../pages/AdminPanel.jsx'
import AllProducts from '../pages/AllProducts.jsx'
import AllUsers from '../pages/AllUsers.jsx';
import CategoryProduct from '../pages/CategoryProduct.jsx'
import ProductDetails from '../pages/ProductDetails.jsx';
import Cart from '../pages/Cart.jsx'
import SearchProduct from '../pages/SearchProduct.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home />
            },
            {
                path: 'login',
                element : <Login/>
            },
            {
                path : 'register',
                element : <Register/>
            },
            {
                path : 'forgot-password',
                element : <ForgetPassword/>
            },
            {
                path : 'product-category',
                element : <CategoryProduct/>
            },{
                path : 'product/:id',
                element : <ProductDetails/>
            },
            {
                path : 'cart',
                element : <Cart/>
            },
            {
                path : 'search',
                element : <SearchProduct/>
            },
            {
                path : 'admin-panel',
                element : <AdminPanel/>,
                children : [
                    {
                        path : 'all-user',
                        element : <AllUsers/>
                    },
                    {
                        path : 'all-product',
                        element : <AllProducts/>
                    }
                ]
            },
        ]
    }
]);

export default router;
