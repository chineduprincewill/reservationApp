import { Fragment, useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../../api/axios"

import { AuthContext } from "../../context/AuthContext"
import Spinner from "../layout/Spinner";

const ALL_HOTELS_API = 'hotels';


const Hotels = () => {

    const { user, token } = useContext(AuthContext);

    const [hotels, setHotels] = useState(null);

    const getAllHotels = async () => {

        try{

            const response = await axios.get(ALL_HOTELS_API,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.message.data);
            setHotels(response.data.message.data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }


    const deleteHotel = async (id, hotelname) => {

        if(window.confirm(`Are you sure you want to delete ${hotelname}?`)){


            try{

                const response = await axios.delete(`hotels/${id}`,
                    {
                        headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                    }
                );
                
                alert(response.data.message);

                setHotels(hotels.filter((htl => htl.id !== id)));


            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else {
                    console.log(err.response.data);
                }
            }

            //setDelstatus('');
        }
    }


    useEffect(() => {

        getAllHotels();
    }, [])

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Hotels</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Hotels</li>
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
                                                            <button type="button" className="btn btn-soft-success"><i className="ri-search-eye-fill align-middle me-1"></i> Search...</button>
                                                        </div>
                                                        <div className="col-auto">
                                                            <Link to='/create-hotel' type="button" className="btn btn-soft-primary"><i className="ri-add-circle-line align-middle me-1"></i> Create</Link>
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
                                    <h5 className="card-title mb-0">List of all Hotels</h5>
                                </div>
                                <div className="card-body">           
                                    {hotels === null ? <Spinner /> : (
                                        <table id="model-datatables" className="table table-bordered nowrap table-striped align-middle" style={{ width:"100%" }}>
                                            <thead>
                                                <tr>
                                                    <th>S/No</th>
                                                    <th>Name</th>
                                                    <th>Location</th>
                                                    <th>City</th>
                                                    <th>State</th>
                                                    <th>Detail</th>
                                                    <th>Price</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {hotels.map(hotel => {
                                                   return (<tr key={hotel.id}>
                                                        <td>{hotel.id}</td>
                                                        <td>{hotel.hotel_name}</td>
                                                        <td>{hotel.location}</td>
                                                        <td>{hotel.city}</td>
                                                        <td>{hotel.state}</td>
                                                        <td><a href={`${hotel.hotelsNg_link}`} target="_blank" >more info...</a></td>
                                                        <td>&#8358; {hotel.price}</td>
                                                        <td>
                                                            <div className="dropdown d-inline-block">
                                                                <button className="btn btn-soft-secondary btn-sm dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                    <i className="ri-more-fill align-middle"></i>
                                                                </button>
                                                                <ul className="dropdown-menu dropdown-menu-end">
                                                                    <li>
                                                                        <button data-bs-toggle="modal" data-bs-target={`#modal-${hotel.id}`} className="dropdown-item">
                                                                            <i className="ri-eye-fill align-bottom me-2 text-muted"></i> Features
                                                                        </button>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/hotel-detail/${hotel.id}`} className="dropdown-item edit-item-btn">
                                                                            <i className="ri-search-eye-fill align-bottom me-2 text-muted"></i> View
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link 
                                                                            to="/edit-hotel"
                                                                            state={{ hotelObject : hotel }}
                                                                            className="dropdown-item edit-item-btn"
                                                                        >
                                                                            <i className="ri-pencil-fill align-bottom me-2 text-muted"></i> Edit
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link 
                                                                            to='/room-types' 
                                                                            className="dropdown-item edit-item-btn"
                                                                            state={{ hotelObject : hotel }}
                                                                        >
                                                                            <i className="ri-add-circle-line align-bottom me-2 text-muted"></i> Room types
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <button 
                                                                            className="dropdown-item remove-item-btn"
                                                                            onClick={(e) => deleteHotel(hotel.id, hotel.hotel_name)}
                                                                        >
                                                                            <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i> Delete
                                                                        </button>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </td>
                                                        <Fragment>
                                                            <div className="modal fade" id={`modal-${hotel.id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                                <div className="modal-dialog">
                                                                    <div className="modal-content">
                                                                        <div className="modal-header">
                                                                            <h4 className="modal-title" id="exampleModalLabel">{hotel.hotel_name}</h4>
                                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                        </div>
                                                                        <div className="modal-body">
                                                                            <h5>Features</h5>
                                                                            {hotel.features.length > 0 && (
                                                                                <ul>
                                                                                    {hotel.features.map((feature, index) => {
                                                                                        return <li className="p-1" key={index}>{feature}</li>
                                                                                    })}
                                                                                </ul>
                                                                                
                                                                            )}
                                                                        </div>
                                                                        <div className="modal-footer">
                                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Fragment>
                                                            
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

export default Hotels