import { Fragment, useContext, useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "../../api/axios"
import { AuthContext } from "../../context/AuthContext"
import hotel from './hotel.jpg'
import SpinnerSm from "../layout/SpinnerSm"


const HotelDetail = () => {

    const { user, token } = useContext(AuthContext)
    let { hotelid } = useParams();

    const [hotel, setHotel] = useState(null);

    const getHotelInfo = async () => {

        try{

            const response = await axios.get(`hotels/${hotelid}`,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            console.log(response.data.hotel_data);
            setHotel(response.data.hotel_data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }


    useEffect(() => {

        getHotelInfo();
    }, [])


    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Hotel Information</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Hotel Information</li>
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

                                                        <div className="col-auto">
                                                            <Link 
                                                                to="/edit-hotel"
                                                                state={{ hotelObject : hotel }}
                                                                className="btn btn-soft-danger"
                                                                style={{ marginRight: 10 }}
                                                            >
                                                                <i className="ri-pencil-fill align-bottom me-1"></i>Edit
                                                            </Link>
                                                           <Link to="/hotels" className="btn btn-soft-primary"> Back to Hotels</Link>
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
                        <div class="col-lg-6">
                            <div className="card">
                                <div className="card-body">
                                    {hotel === null ? <SpinnerSm /> : <img src={hotel.image_url === null ? 'https://thumbs.dreamstime.com/z/hotel-sign-15906101.jpg' : hotel.image_url} alt="hotel" style={{ width : "100%" }} />}
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Hotel Detail</h5>
                                </div>
                                <div className="card-body">
                                    {hotel === null ? <SpinnerSm /> : (
                                        <div className="row">
                                            <span className="col-sm-3 py-2"><strong>Name</strong></span><span className="col-sm-9 py-2">{hotel.hotel_name}</span>
                                            <span className="col-sm-3 py-2"><strong>Address</strong></span><span className="col-sm-9 py-2">{hotel.location}</span>
                                            <span className="col-sm-3 py-2"><strong>City</strong></span><span className="col-sm-9 py-2">{hotel.city}</span>
                                            <span className="col-sm-3 py-2"><strong>State</strong></span><span className="col-sm-9 py-2">{hotel.state}</span>
                                            <span className="col-sm-3 py-2"><strong>Detail</strong></span><span className="col-sm-9 py-2"><a href={`${hotel.hotelsNg_link}`} target='_blank'>Click here...</a></span>
                                            <span className="col-sm-3 py-2"><strong>Price</strong></span><span className="col-sm-9 py-2">&#8358; {hotel.price}</span>
                                            <span className="col-sm-3 py-2"><strong>Available slots</strong></span><span className="col-sm-9 py-2">{hotel.available_slots}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Features</h5>
                                </div>
                                <div className="card-body">
                                    {hotel === null ? <SpinnerSm /> : (
                                        <ul>
                                            {hotel.features.map((feat, index) => {
                                                return (
                                                    <li className="p-1" key={index}>{feat}</li>
                                                )
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Room types</h5>
                                </div>
                                <div className="card-body">
                                    {hotel === null ? <SpinnerSm /> : (
                                        <ul>
                                            {hotel.room_types.map(rmt => {
                                                return (
                                                    <div className="row border-bottom" key={rmt.id}>
                                                        <span className="col-sm-3 py-2"><strong>Name</strong></span><span className="col-sm-9 py-2">{rmt.name}</span>
                                                        <span className="col-sm-3 py-2"><strong>Price</strong></span><span className="col-9 py-2">&#8358; {rmt.price}</span>
                                                        <span className="col-sm-3 py-2"><strong>Available slots</strong></span><span className="col-9 py-2">{rmt.available_slots}</span>
                                                        <span className="col-sm-3 py-2"><strong>Facilities</strong></span>
                                                        <span className="col-sm-9 py-2">
                                                            {rmt.facilities.length > 0 && rmt.facilities.map((fac, index) => {return <span key={index}>{fac}, </span>} ) } 
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </ul>
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

export default HotelDetail