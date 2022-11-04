import { useContext, useState, useCallback, useEffect } from "react"
import { useLocation, Link } from "react-router-dom";
import axios from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext"
import Spinner from "../../layout/Spinner";

const Cart = () => {

    const { user, token } = useContext(AuthContext);

    const location = useLocation();
    const { id, first_name, last_name, email, phone, gender, church_branch } = location.state?.userObject;

    const [products, setProducts] = useState(null);
    const [cart, setCart] = useState(null);

    const [cartcode, setCartcode] = useState();

    const [product, setProduct] = useState();
    const [quantity, setQuantity] = useState();

    const [add, setAdd] = useState('add');
    const [remove, setRemove] = useState('remove');
    const [checkout, setCheckout] = useState('Checkout');

    const [createStat, setCreateStat] = useState();


    const allProducts = useCallback( async () => {

        try{
            const response = await axios.get('products',
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.products.data);
            setProducts(response.data.products.data);
            //setPaging(response.data.message);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [token]);


    const userCart = useCallback( async () => {

        const data = {
            user_id : id
        }

        try{
            const response = await axios.post('cart/get-user-cart',
                data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.cart);
            setCart(response.data.cart);
            setCartcode(response.data.status_code);

            console.log(cartcode);
            //setPaging(response.data.message);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [token, id, cartcode]);


    const addToCart = async () => {

        try{
            setAdd('adding...');

            const data = {
                user_id : id,
                product_id : product,
                quantity : quantity,
                action : "add",
                attributes : {}
            }

            //console.log(data);

            const response = await axios.post('cart',
            data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Product successfully added to cart!');
            setCreateStat(Date.now());

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setAdd('add');
    }


    const removeFromCart = async () => {

        try{
            setRemove('removing...');

            const data = {
                user_id : id,
                product_id : product,
                quantity : quantity,
                action : "remove",
                attributes : {}
            }

            //console.log(data);

            const response = await axios.post('cart',
            data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Product successfully removed from cart!');
            setCreateStat(Date.now());

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setRemove('remove');
    }


    const checkoutCart = async (cartid) => {

        try{
            setCheckout('Checking out...');

            const data = {
                user_id : id,
                cart_id : cartid,
                is_ordered : 1
            }

            const response = await axios.post('cart/checkout',
            data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Checkout successful!');
            setCreateStat(Date.now());

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setCheckout('Checkout');
        window.location.reload();
    }


    useEffect(() => {

        allProducts();
    }, [allProducts])


    useEffect(() => {

        userCart();
    }, [userCart, createStat])

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Users</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Cart</li>
                                    </ol>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">

                            <div className="h-100">
                                <div className="row mb-3 pb-1">
                                    <div className="col-12">
                                        <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                                            <div className="flex-grow-1">
                                                <h4 className="fs-16 mb-1">Good Day, {user === null ? '' : `${user.first_name} ${user.last_name}`}!</h4>
                                                <p className="text-muted mb-0">What's happening with you today?</p>
                                            </div>
                                            <div className="mt-3 mt-lg-0">
                                                <form >
                                                    <div className="row g-3 mb-0 align-items-center">
                                                        <div className="col-sm-auto">
                                                            
                                                        </div>
                                                        <div className="col-auto">
                                                            
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link 
                                                                className="btn btn-danger"
                                                                to='/users'
                                                            >
                                                                Back
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> User Information</h5>
                                </div>
                                <div className="card-body">
                                    <h4 className="text-info pb-1">{first_name} {last_name}</h4>
                                    <p>{email}</p>
                                    <p>{phone}</p>
                                    <p>{gender}</p>
                                    <p>{church_branch} Branch</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">

                           <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> Add product to cart</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-4">
                                                <div className="row p-2">
                                                    <select
                                                        className="form-control"
                                                        value={product}
                                                        onChange={(e) => setProduct(e.target.value)}
                                                        required
                                                    >
                                                        <option>Select product</option>
                                                        {products !== null && (
                                                            products.map( product => {
                                                                return (
                                                                    <option key={product.id} value={product.id}>{product.name}</option>
                                                                )
                                                            })
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="row p-2">
                                                    <input 
                                                        type="number"
                                                        value={quantity}
                                                        className="form-control"
                                                        placeholder="Enter quantity..."
                                                        onChange={(e) => setQuantity(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="row p-2">
                                                    <button 
                                                        className="btn btn-soft-info"
                                                        onClick={(e) => addToCart()}
                                                    >
                                                        {add}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-lg-2">
                                                <div className="row p-2">
                                                    <button 
                                                        className="btn btn-soft-danger"
                                                        onClick={(e) => removeFromCart()}
                                                    >
                                                        {remove}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           </div> 

                           <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> Your cart</h5>
                                    </div>
                                    <div className="card-body">
                                        {cart === null ? <Spinner /> : (
                                            <table id="model-datatables" className="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                                <thead>
                                                    <tr>
                                                        <th>Product</th>
                                                        <th>Category</th>
                                                        <th>Price</th>
                                                        <th>Quantity</th>
                                                        <th>Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartcode === 404 ? <tr><td colSpan={5}>Cart is empty!</td></tr> : (
                                                        cart.cart_products.map(item => {
                                                            return (
                                                                <tr key={item.id}>
                                                                    <td>{item.product.name}</td>
                                                                    <td>{item.product.category}</td>
                                                                    <td>&#8358; {item.product.price}</td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>&#8358; {item.quantity * item.product.price}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    )}

                                                    {cart.cart_products.length !== 0 && (

                                                        <tr>
                                                            <td colSpan={5}>
                                                                <button 
                                                                    className="btn btn-success mt-2 py-2"
                                                                    onClick={(e) => checkoutCart(cart.id)}
                                                                >
                                                                    {checkout}
                                                                </button>
                                                            </td>
                                                        </tr>

                                                    )}
                        
                                                </tbody>
                                            </table>
                                        )}

                                        
                                    </div>
                                </div>
                           </div> 

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart