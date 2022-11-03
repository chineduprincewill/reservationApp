import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
  } from 'mdb-react-ui-kit';
import axios from "../../../api/axios"

import { AuthContext } from "../../../context/AuthContext"
import Spinner from "../../layout/Spinner"
import ProductRecord from "./ProductRecord"

const Products = () => {

    const { user, token } = useContext(AuthContext);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setBasicModal(!basicModal);
    }

    const [products, setProducts] = useState(null);
    const [createStat, setCreateStat] = useState();

    const [name, setName] = useState();
    const [category, setCategory] = useState();
    const [categories, setCategories] = useState(null);
    const [description, setDescription] = useState();
    const [quantity, setQuantity] = useState();
    const [small_image, setSmall_image] = useState([]);
    const [large_image, setLarge_image] = useState([]);
    const [type, setType] = useState();
    const [price, setPrice] = useState();
    const [attributes, setAttributes] = useState({});

    setAttributes();

    const [submit, setSubmit] = useState('Submit');


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


    const allCategories = useCallback(async () => {

        try{
            const response = await axios.get('categories',
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.message.data);
            setCategories(response.data.message.data);
            //setPaging(response.data.message);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [token])


    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            setSubmit('Submitting...');
            
            let data = new FormData();

            data.append('name', name);
            data.append('category', category);
            data.append('description', description);
            data.append('quantity', quantity);
            data.append('small_image', small_image);
            data.append('large_image', large_image);
            data.append('type', type);
            data.append('price', price);
            data.append('attributes', JSON.stringify(attributes));

            console.log(data);

            const response = await axios.post('products',
            data,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Product successfully created!');
            setCreateStat(Date.now());
            setBasicModal(!basicModal);

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setSubmit('Submit');
    }


    useEffect(() => {

        allProducts();
    }, [allProducts, createStat])

    useEffect(() => {

        allCategories();
    }, [allCategories])


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Category</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Products</li>
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
                                                            <MDBBtn 
                                                                onClick={toggleShow}    
                                                                className="btn btn-soft-success"
                                                                style={{ height : 37, width : 150 }}
                                                            >
                                                                <i className="ri-add-circle-line align-middle me-1"></i> New Product
                                                            </MDBBtn>

                                                            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                                                                <MDBModalDialog>
                                                                    <MDBModalContent>
                                                                        <MDBModalHeader>
                                                                        <MDBModalTitle>Add Product</MDBModalTitle>
                                                                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                                                                        </MDBModalHeader>
                                                                        <MDBModalBody>
                                                                            <div className="row px-2 pb-2">
                                                                                <label htmlFor="name" className="form-label">Name</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={name}
                                                                                    className="form-control"
                                                                                    placeholder="Enter Name..."
                                                                                    onChange={(e) => setName(e.target.value)}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="row px-2 pb-2">
                                                                                <label htmlFor="name" className="form-label">Category</label>
                                                                                <select
                                                                                    className="form-control"
                                                                                    onChange={(e) => setCategory(e.target.value)}
                                                                                >
                                                                                    <option>Select category</option>
                                                                                    {categories !== null && (
                                                                                        categories.map( cat => {
                                                                                            return (
                                                                                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                                                                            )
                                                                                        })
                                                                                    )}
                                                                                </select>
                                                                            </div>
                                                                            <div className="row px-2 pb-2">
                                                                                <label htmlFor="name" className="form-label">Description</label>
                                                                                <textarea
                                                                                    className="form-control"
                                                                                    value={description}
                                                                                    onChange={(e) => setDescription(e.target.value)}
                                                                                >

                                                                                </textarea>
                                                                            </div>
                                                                            <div className="row p-2">
                                                                                <label htmlFor="duration" className="form-label">Quantity</label>
                                                                                <input 
                                                                                    type="number"
                                                                                    value={quantity}
                                                                                    className="form-control"
                                                                                    placeholder="Enter quantity..."
                                                                                    onChange={(e) => setQuantity(e.target.value)}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="row p-2">
                                                                                <label htmlFor="small-image" className="form-label">Small image</label>
                                                                                <input 
                                                                                    className="form-control" 
                                                                                    type="file" 
                                                                                    id="formFile" 
                                                                                    onChange={(e) => setSmall_image(e.target.files[0])}
                                                                                />
                                                                            </div>
                                                                            <div className="row p-2">
                                                                                <label htmlFor="large-image" className="form-label">Large image</label>
                                                                                <input 
                                                                                    className="form-control" 
                                                                                    type="file" 
                                                                                    id="formFile" 
                                                                                    onChange={(e) => setLarge_image(e.target.files[0])}
                                                                                />
                                                                            </div>
                                                                            <div className="row p-2">
                                                                                <label htmlFor="type" className="form-label">Type</label>
                                                                                <input 
                                                                                    type="text"
                                                                                    value={type}
                                                                                    className="form-control"
                                                                                    placeholder="Enter type..."
                                                                                    onChange={(e) => setType(e.target.value)}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            <div className="row p-2">
                                                                                <label htmlFor="duration" className="form-label">Price</label>
                                                                                <input 
                                                                                    type="number"
                                                                                    value={price}
                                                                                    className="form-control"
                                                                                    placeholder="Enter price..."
                                                                                    onChange={(e) => setPrice(e.target.value)}
                                                                                    required
                                                                                />
                                                                            </div>
                                                                            
                                                                        </MDBModalBody>

                                                                        <MDBModalFooter>
                                                                        <MDBBtn
                                                                            style={{ height : 37 }}
                                                                            className="btn btn-soft-primary w-100"
                                                                            onClick={handleSubmit}
                                                                        >
                                                                            {submit}
                                                                        </MDBBtn>
                                                                        </MDBModalFooter>
                                                                    </MDBModalContent>
                                                                </MDBModalDialog>
                                                            </MDBModal>

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
                        <div className="col-lg-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">All products</h5>
                                </div>
                                <div className="card-body">
                                    {products === null ? <Spinner /> : (
                                        <table id="model-datatables" className="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Name</th>
                                                    <th>Price</th>
                                                    <th>Type</th>
                                                    <th>Category</th>
                                                    <th>Quantity</th>
                                                    <th>Attributes</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { products.length !== 0 ? 
                                                (products.map(product => {
                                                   return(
                                                      <ProductRecord key={product.id} product={product} setCreateStat={setCreateStat} categories={categories} />
                                                   )})) : 
                                                <tr>
                                                    <td colSpan={8}><span className="text text-danger p-3 w-100">No product record found yet!</span></td>
                                                </tr>
                                                }
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
    )
}

export default Products