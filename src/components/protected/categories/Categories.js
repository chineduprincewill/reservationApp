import { useCallback, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom";
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
import { AuthContext } from "../../../context/AuthContext"
import Spinner from "../../layout/Spinner";
import CategoryList from "./CategoryList";

const Categories = () => {

    const { user, token } = useContext(AuthContext);

    const [basicModal, setBasicModal] = useState(false);
    const toggleShow = (e) => {
        e.preventDefault();
        setBasicModal(!basicModal);
    }

    const [categories, setCategories] = useState(null);

    const [categoryName, setCategoryName] = useState('');
    const [duration, setDuration] = useState('');
    const [attribute, setAttribute] = useState('');
    const [image, setImage] = useState([]);
    const [attributes, setAttributes] = useState([]);

    const [submit, setSubmit] = useState('Submit');
    const [createStat, setCreateStat] = useState();
   // const [searchterm, setSearchterm] = useState();

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


    const handleSubmit = async (e) => {

        e.preventDefault();

        try{
            setSubmit('Submitting...');
            
            let data = new FormData();

            data.append('name', categoryName);
            data.append('due_date_duration', duration);
            data.append('image', image);
            attributes.map((attr, index) => {
                data.append('attributes[]', attr);
                return '';
            })
            

            console.log(data);

            const response = await axios.post('categories',
            data,
                {
                    headers: { 'Content-Type': 'multipart/form-data', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data);
            alert('Category successfully created!');
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

        setSubmit('Submit');
        setBasicModal(!basicModal);
    }

    useEffect(() => {

        allCategories();
    }, [allCategories, createStat])


    return(
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
                                        <li className="breadcrumb-item active">Categories</li>
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
                                                                <i className="ri-add-circle-line align-middle me-1"></i> New Category
                                                            </MDBBtn>

                                                            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                                                                <MDBModalDialog>
                                                                    <MDBModalContent>
                                                                        <MDBModalHeader>
                                                                        <MDBModalTitle>Add Category</MDBModalTitle>
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
                                    <h5 className="card-title mb-0">All categories</h5>
                                </div>
                                <div className="card-body">
                                    {categories === null ? <Spinner /> : (
                                        <table id="model-datatables" className="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Image</th>
                                                    <th>Name</th>
                                                    <th>Slug</th>
                                                    <th>Description</th>
                                                    <th>Attributes</th>
                                                    <th>Duration</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                { categories.length !== 0 ? 
                                                (categories.map(category => {
                                                   return(
                                                      <CategoryList key={category.id} category={category} setCreateStat={setCreateStat} />
                                                   )})) : 
                                                <tr>
                                                    <td colSpan={8}><span className="text text-danger p-3 w-100">No category record found yet!</span></td>
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

export default Categories