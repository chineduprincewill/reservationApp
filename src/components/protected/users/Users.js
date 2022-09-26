import { useState, useContext, useEffect } from "react"
import axios from "../../../api/axios";
import { Link } from "react-router-dom";
import Moment from "react-moment";

import { AuthContext } from "../../../context/AuthContext"
import SpinnerSm from "../../layout/SpinnerSm";

const NEW_USER_API = 'users';

const Users = () => {

    const { user, token } = useContext(AuthContext);

    const [userinfo, setUserinfo] = useState(null);
    const [users, setUsers] = useState(null);
    const [create, setCreate] = useState('Submit');
    const [delstatus, setDelstatus] = useState('');
    const [action, setAction] = useState('');
    const [update, setUpdate] = useState('Update');

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email, setEmail] = useState('');
    const [church_branch, setChurch_branch] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [userid, setUserid] = useState();


    const handleSubmit = async (e) => {

        e.preventDefault()

        setCreate('Submitting...');

        try{

            const data = {
                first_name,
                last_name,
                email,
                church_branch,
                gender,
                phone
            }

            const response = await axios.post(NEW_USER_API,
                data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            alert(response.data.message);
            setUserinfo(response.data.user);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setCreate('Submit');
        setFirst_name('');
        setLast_name('');
        setEmail('');
        setChurch_branch('');
        setGender('');
        setPhone('');
    }


    const deleteUser = async (id, firstname, lastname) => {

        if(window.confirm(`Are you sure you want to delete ${firstname} ${lastname}?`)){

            setDelstatus(<span class="text text-danger p-3">deleting user...</span>);

            try{

                const response = await axios.delete(`users/${id}`,
                    {
                        headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                    }
                );
                
                alert(response.data.message);

                setUsers(users.filter((user => user.id !== id)));


            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else {
                    console.log(err.response.data);
                }
            }

            setDelstatus('');
        }
    }


    const editUser = (user) => {

        setFirst_name(user.first_name);
        setLast_name(user.last_name);
        setEmail(user.email);
        setChurch_branch(user.church_branch);
        setGender(user.gender);
        setPhone(user.phone);
        setUserid(user.id);

        setAction('update');
    }


    const updateUser = async (e) => {

        e.preventDefault();

        setUpdate('Updating...');

        try{

            const data = {
                first_name,
                last_name,
                church_branch,
                gender,
                phone
            }

            const response = await axios.put(`users/${userid}`,
                data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            alert(response.data.message);
            setUserinfo(response.data.user);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setUpdate('Update');
        setAction('');
        setFirst_name('');
        setLast_name('');
        setEmail('');
        setChurch_branch('');
        setGender('');
        setPhone('');
        setUserid();

    }


    const getAllUsers = async () => {

        try{

            const response = await axios.get(NEW_USER_API,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            setUsers(response.data.users.data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }


    useEffect(() => {

        getAllUsers()
    }, [userinfo])


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
                                        <li className="breadcrumb-item active">Users</li>
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
                                                            <div className="input-group">
                                                                <input type="text" className="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y" data-deafult-date="01 Jan 2022 to 31 Jan 2022" />
                                                                <div className="input-group-text bg-primary border-primary text-white">
                                                                    <i className="ri-calendar-2-line"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-auto">
                                                            <button type="button" className="btn btn-soft-success"><i className="ri-add-circle-line align-middle me-1"></i> Search...</button>
                                                        </div>
                                                        <div className="col-auto">
                                                            <button type="button" className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"><i className="ri-pulse-line"></i></button>
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
                                    <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> User</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={action === '' ? handleSubmit : updateUser}>
                                        <div className="input-group py-2">
                                            <span className="input-group-text" id="inputGroup-sizing-default">First name</span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={first_name}
                                                onChange={(e) => setFirst_name(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group py-2">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Last name</span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={last_name}
                                                onChange={(e) => setLast_name(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group py-2">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
                                            <input 
                                                type="email" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div class="input-group py-2">
                                            <label class="input-group-text" htmlFor="inputGroupSelect01">Branch</label>
                                            <select 
                                                class="form-select" 
                                                id="inputGroupSelect01"
                                                value={church_branch}
                                                onChange={(e) => setChurch_branch(e.target.value)}
                                                required
                                            >
                                                <option>Choose...</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Abuja">Abuja</option>
                                                <option value="Onitsha">Onitsha</option>
                                            </select>
                                        </div>
                                        <div class="input-group py-2">
                                            <label class="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
                                            <select 
                                                class="form-select" 
                                                id="inputGroupSelect01"
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                required
                                            >
                                                <option>Choose...</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </select>
                                        </div>
                                        <div className="input-group py-2">
                                            <span className="input-group-text" id="inputGroup-sizing-default">Mobile No.</span>
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="input-group py-2">
                                            <button type="submit" className="btn btn-soft-success w-100">{action === '' ? create : update}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="card">
                            <div className="card-header">
                                    <h5 className="card-title mb-0">Users' List</h5>
                                </div>
                                <div className="card-body">
                                    {delstatus !== '' && delstatus}
                                {users === null ? <SpinnerSm /> : (
                                        <table id="model-datatables" class="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Email</th>
                                                    <th>Mobile No.</th>
                                                    <th>Branch</th>
                                                    <th>Gender</th>
                                                    <th>Added</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {users.map(user => {
                                                   return (<tr key={user.id}>
                                                        <td>{user.first_name} {user.last_name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.church_branch}</td>
                                                        <td>{user.gender}</td>
                                                        <td><Moment format='MM-DD-YYYY'>{user.created_at}</Moment></td>
                                                        <td>
                                                            <div className="dropdown d-inline-block">
                                                                <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="ri-more-fill align-middle"></i>
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li>
                                                                        <Link 
                                                                            to='/reserve-room'
                                                                            state={{ userObject : user }}
                                                                            className="dropdown-item edit-item-btn"
                                                                        >
                                                                            <i className="ri-search-eye-fill align-bottom me-2 text-muted"></i> Reserve room
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button 
                                                                            className="dropdown-item edit-item-btn"
                                                                            onClick={(e) => editUser(user)}
                                                                        >
                                                                            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <button 
                                                                            className="dropdown-item remove-item-btn"
                                                                            onClick={(e) => deleteUser(user.id, user.first_name, user.last_name)}
                                                                        >
                                                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>

                                                    </tr>)
                                                })}
                                               
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

export default Users