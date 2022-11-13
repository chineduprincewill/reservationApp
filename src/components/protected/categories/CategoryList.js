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
import axios from "../../../api/axios";
import { AuthContext } from "../../../context/AuthContext";

const CategoryList = ({category, setCreateStat}) => {

    const { token } = useContext(AuthContext);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = () => setBasicModal(!basicModal);

    const [categoryName, setCategoryName] = useState(category.name);
    const [duration, setDuration] = useState(category.due_date_duration);
    const [attribute, setAttribute] = useState('');
    const [image, setImage] = useState([]);
    console.log(image);
    const [attributes, setAttributes] = useState(category.attributes);

    const [update, setUpdate] = useState('Update');

    const deleteCategory = async (slug, cat_name) => {

        if(window.confirm(`Are you sure you want to delete ${cat_name}?`)){


            try{

                const response = await axios.delete(`categories/${slug}`,
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


    const addAttribute = () => {

        if(attribute === ''){
            alert('Attribute must be entered!');
        }
        else{

            setAttributes(attributes => [
                ...attributes,
                attribute
            ]);
    
            setAttribute('');  
        }

    }


    const removeAttribute = (e, attritem) => {

        if(window.confirm(`Are you sure you want to delete ${attritem} from the attributes?`)){

            let filteredArray = attributes.filter(item => item !== attritem)
            setAttributes(filteredArray);
        }
    }



    const handleUpdate = async (e) => {

        e.preventDefault();

        try{
            setUpdate('Updating...');

           /** const data = {
                name : categoryName,
                due_date_duration : duration,
                image,
                attributes
            } */
            
            let data = new FormData();

            data.append('name', categoryName);
            data.append('due_date_duration', duration);
            data.append('_method', 'PUT')
            //image !== [] && data.append('image', image);
            attributes.map((attr, index) => {
                data.append('attributes[]', attr);
                return'';
            })
            console.log(data);

            const response = await axios.post(`categories/${category.slug}`,
            data,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Category successfully updated!');
            setCreateStat(Date.now());
            //setCategories(response.data.message.data);
            //setPaging(response.data.message);


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
            <td><img src={`https://lcm.viceodev.tech${category.image}`} height="50px" /></td>
            <td>{category.name}</td>
            <td>{category.slug}</td>
            <td>{category.description}</td>
            <td>
                {category.attributes.map(
                    (attr, index) => {
                        return(
                            <span 
                                key={index} 
                                className="text-info p-1 mr-1"
                            >
                                {attr}
                            </span>
                        )
                    }
                )}
            </td>
            <td>{category.due_date_duration} days</td>
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
                                onClick={(e) => deleteCategory(category.slug, category.name)}
                            >
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                            </button>
                        </li>
                    </ul>
                </div>
            </td>

            <MDBModal show={basicModal} setShow={setBasicModal}  tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Update Category</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            
                            <div className="row px-2 pb-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input 
                                    type="text"
                                    value={categoryName}
                                    className="form-control"
                                    placeholder="Enter Name..."
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="row p-2">
                                <label htmlFor="duration" className="form-label">Due date duration</label>
                                <input 
                                    type="number"
                                    value={duration}
                                    className="form-control"
                                    placeholder="Enter duration..."
                                    onChange={(e) => setDuration(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="row p-2">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input 
                                    className="form-control" 
                                    type="file" 
                                    id="formFile" 
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>
                            <div className="col-sm-auto mt-3">
                                <label htmlFor="attributes" className="form-label mx-2">Attributes</label>
                                <div className="input-group">
                                    <input 
                                        type="text"
                                        value={attribute}
                                        className="form-control"
                                        placeholder="Enter attribute..."
                                        onChange={(e) => setAttribute(e.target.value)}
                                    />
                                    <span 
                                        onClick={(e) => addAttribute()}
                                        className="input-group-text btn-primary border-primary text-white"
                                    >
                                        <i className="ri-add-line align-middle me-1"></i> click to add
                                    </span>
                                </div>
                                
                            </div>

                            <div className="p-2">
                                {attributes.map(
                                    (attr, index) => {
                                        return(
                                            <span 
                                                key={index} 
                                                className="text-info p-1 mr-1"
                                                onClick={(e) => removeAttribute(e, attr)}
                                            >
                                                {attr}
                                            </span>
                                        )
                                    }
                                )}
                            </div>
                            <span className="text text-warning p-2">
                                click on any of the added attributes to delete
                            </span>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn
                                style={{ height : 37 }}
                                className="btn btn-soft-primary w-100"
                                onClick={handleUpdate}
                            >
                                {update}
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
                
        </tr>)
    }
export default CategoryList