import { useContext, useCallback, useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "../../../api/axios"
import { AuthContext } from "../../../context/AuthContext"
import Moment from "react-moment"

import Spinner from "../../layout/Spinner"

const Reservations = () => {

    const { user, token } = useContext(AuthContext);

    const [reservations, setReservations] = useState(null);
    const [deletetime, setDeletetime] = useState();

    const getAllReservations = useCallback( async () => {

        try{

            const response = await axios.get('hotel-reservations',
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.data);
            setReservations(response.data.data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [token]);


    const deleteReservation = async (reserve_id) => {

        if(window.confirm('Are you sure you want to cancel this reservation')){

            try{

                const response = await axios.delete(`hotel-reservations/${reserve_id}`,
                    {
                        headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                    }
                );
                
                console.log(response.data);
                alert('Reservation successfully deleted!');
                setDeletetime(Date.now());
    
    
            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else {
                    console.log(err.response.data);
                }
            }
        }
    }

    useEffect(() => {

        getAllReservations();
    }, [getAllReservations, deletetime])


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Reservations</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Reservations</li>
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
                                                                <input type="text" className="form-control border-0 dash-filter-picker shadow" data-provider="flatpickr" data-range-date="true" data-date-format="d M, Y" data-deafult-date="01 Jan 2022 to 31 Jan 2022" placeholder="Search" />
                                                                <div className="input-group-text bg-primary border-primary text-white">
                                                                    <i className="ri-calendar-2-line"></i>
                                                                </div>
                                                            </div>
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
                                    <h5 className="card-title mb-0">List of Reservations</h5>
                                </div>
                                <div className="card-body">           
                                    {reservations === null ? <Spinner /> : (
                                        <table id="model-datatables" className="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>Customer</th>
                                                    <th>Mobile No.</th>
                                                    <th>Hotel</th>
                                                    <th>Price</th>
                                                    <th>Check in Date</th>
                                                    <th>Duration</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reservations.length === 0 ? <tr><td colSpan={7}><span className="text text-danger">No reservation record found yet!</span></td></tr> :
                                                    (reservations.map(reserve => {
                                                        return (
                                                            <tr key={reserve.id}>
                                                                <td>{reserve.user_name}</td>
                                                                <td>{reserve.user_phone}</td>
                                                                <td>{reserve.hotel_name}</td>
                                                                <td>&#8358;{reserve.price}</td>
                                                                <td><Moment format='MMMM Do YYYY'>{reserve.check_in_date}</Moment></td>
                                                                <td>{reserve.check_in_duration} days</td>
                                                                <td>
                                                                    <button 
                                                                        className="btn btn-link text-decoration-none"
                                                                        onClick={(e) => deleteReservation(reserve.id)}
                                                                    >
                                                                        <i className="ri-delete-bin-fill align-bottom me-2 text-danger"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        )   
                                                    }))
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

export default Reservations