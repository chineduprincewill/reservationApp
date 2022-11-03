import { useContext, useState } from "react";
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
import { AuthContext } from "../../../context/AuthContext";
import axios from "../../../api/axios";

const ProductRecord = ({product, setCreateStat, categories}) => {

    const { token } = useContext(AuthContext);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setBasicModal(!basicModal);
    }

    const [name, setName] = useState(product.name);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [quantity, setQuantity] = useState(product.quantity);
    const [small_image, setSmall_image] = useState(product.small_image);
    const [large_image, setLarge_image] = useState(product.large_image);
    const [type, setType] = useState(product.type);
    const [price, setPrice] = useState(product.price);

    const [update, setUpdate] = useState('Update');


    const deleteProduct = async (slug, prod_name) => {

        if(window.confirm(`Are you sure you want to delete ${prod_name}?`)){


            try{

                const response = await axios.delete(`products/${slug}`,
                    {
                        headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                    }
                );
                
                console.log(response);
                alert('Category successfully deleted!');
    
                setCreateStat(Date.now());


            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else {
                    console.log(err.response.data);
                }
            }
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            setUpdate('Updating...');
            
            let data = new FormData();

            data.append('name', name);
            data.append('category', category);
            data.append('description', description);
            data.append('quantity', quantity);
            data.append('small_image', small_image);
            data.append('large_image', large_image);
            data.append('type', type);
            data.append('price', price);
            data.append('_method', 'PUT');
            data.append('attributes', JSON.stringify(product.attributes));

            console.log(data);

            const response = await axios.post(`products/${product.slug}`,
            data,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Product successfully updated!');
            setCreateStat(Date.now());
            setBasicModal(!basicModal);

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setUpdate('Update');
    }

    return (
        <tr>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>&#8358; {product.price}</td>
            <td>{product.type}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>
            <td>
                {
                    product.attributes.length !== 0 && (
                        <ul>
                            <li>Color - <span className="text-info">{product.attributes.color}</span></li>
                            <li>Size - <span className="text-info">{product.attributes.size}</span></li> 
                        </ul>
                    )
                } 
            </td>
            <td>
                <div className="dropdown d-inline-block">
                    <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <i className="ri-more-fill align-middle"></i>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <MDBBtn 
                                onClick={toggleShow}    
                                className="dropdown-item remove-item-btn"
                            >
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
                            </MDBBtn>
                        </li>
                        <li>
                            <button 
                                className="dropdown-item remove-item-btn"
                                onClick={(e) => deleteProduct(product.slug, product.name)}
                            >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </td>

            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                        <MDBModalTitle>Update Product</MDBModalTitle>
                        <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className="row px-2 pb-2">
                                <label htmlFor="name" className="form-label text-muted">Name</label>
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
                                <label htmlFor="name" className="form-label text-muted">Category</label>
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
                                <div className="p-2 text-info">Current category is {category}</div>
                            </div>
                            <div className="row px-2 pb-2">
                                <label htmlFor="name" className="form-label text-muted">Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >

                                </textarea>
                            </div>
                            <div className="row p-2">
                                <label htmlFor="duration" className="form-label text-muted">Quantity</label>
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
                                <label htmlFor="small-image" className="form-label text-muted">Small image</label>
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    onChange={(e) => setSmall_image(e.target.files[0])}
                                />
                            </div>
                            <div className="row p-2">
                                <label htmlFor="large-image" className="form-label text-muted">Large image</label>
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    onChange={(e) => setLarge_image(e.target.files[0])}
                                />
                            </div>
                            <div className="row p-2">
                                <label htmlFor="type" className="form-label text-muted">Type</label>
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
                                <label htmlFor="duration" className="form-label text-muted">Price</label>
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
                            {update}
                        </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </tr>
    )
}

export default ProductRecord