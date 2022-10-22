import { useContext, useState, useEffect, Fragment, useCallback } from "react"
import { useLocation, Link } from 'react-router-dom';
import axios from "../../../api/axios"

import { AuthContext } from "../../../context/AuthContext"

const RESERVE_API = 'hotel-reservations';

const ReserveRoom = () => {
    
    const location = useLocation();
    const { user, token } = useContext(AuthContext)
    const { id, first_name, last_name, email, phone, gender, church_branch } = location.state?.userObject;
    
    const [roomtype, setRoomtype] = useState();
    const [hotelid, setHotelid] = useState();
    const [checkin, setCheckin] = useState();
    const [duration, setDuration] = useState();
    const [hotels, setHotels] = useState(null);
    const [hotel, setHotel] = useState(null);
    const [rsv, setRsv] = useState('Reserve');
    const [successmsg, setSuccessmsg] = useState(null);


    const getAllHotels = useCallback( async () => {

        try{

            const data = {
                search_term : null
            }

            const response = await axios.post('hotels/search',
                data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            setHotels(response.data.message);
            //console.log(response.data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [token]);


    const fetchRoomtypes = async (val) => {

        setHotelid(val);

        try{

            const response = await axios.get(`hotels/${val}`,
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

    const handleReserve = async (e) => {
        e.preventDefault();

        setRsv('Reserving...');

        try{

            const data = {
                hotel_id : hotelid,
                hotel_room_type_id : roomtype,
                user_id : id,
                check_in_date : checkin,
                check_in_duration : duration
            }

            console.log(data);

            const response = await axios.post(RESERVE_API,
                data,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            alert(response.data.message);
            setSuccessmsg(response.data.message);
            //setHotel(response.data.hotel_data);

        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                alert(err.response.data.errors.hotel[0]);
            }
        }
        

        setRsv('Reserve');

    }


    useEffect(() => {

        getAllHotels();
    }, [getAllHotels])




    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Reserve Room</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Reserve Room</li>
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
                                                            <Link to='/reservations' className="btn btn-soft-success"><i className="ri-add-circle-line align-middle me-1"></i> Reservations</Link>
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

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> Room Information</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleReserve}>
                                        <div className="input-group py-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Hotel</label>
                                            <select 
                                                className="form-select" 
                                                id="inputGroupSelect01"
                                                value={hotelid}
                                                onChange={(e) => fetchRoomtypes(e.target.value)}
                                                required
                                            >
                                                <option>Choose...</option>
                                                {hotels === null ? '' : (
                                                    hotels.map(hotel => {
                                                        return(
                                                            <option key={hotel.id} value={hotel.id}>{hotel.hotel_name}</option>
                                                        )
                                                    })
                                                )}
                                            </select>
                                        </div>

                                        {hotel === null ? <span className="text text-warning">No hotel selected yet!</span> : (
                                            hotel.room_types.length > 0 ? (
                                                <ul className="pt-3">
                                                    {hotel.room_types.map(rmt => {
                                                        return (
                                                            <li style={{ listStyle: 'none' }} className="py-1" key={rmt.id}>
                                                                <div className="form-check mb-2">
                                                                    <input 
                                                                        className="form-check-input" 
                                                                        type="radio" 
                                                                        name="flexRadioDefault" 
                                                                        id="flexRadioDefault1" 
                                                                        value={rmt.id}
                                                                        onChange={(e) => setRoomtype(e.target.value)}
                                                                    />
                                                                    <label className="form-check-label text-grey" htmlFor="flexRadioDefault1">
                                                                        {rmt.name} @ &#8358;{rmt.price} with {rmt.available_slots} available slots
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        )
                                                    })}
                                                </ul>
                                            ) : <span className="text text-danger">No available room type for the selected hotel yet!</span>
                                        )}

                                        <div className="input-group py-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Check in Date</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={checkin}
                                                onChange={(e) => setCheckin(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="input-group py-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Duration</label>
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                placeholder="No. of days"
                                                value={duration}
                                                onChange={(e) => setDuration(e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="input-group py-2">
                                            <button type="submit" className="btn btn-soft-success w-100">{rsv}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0"><i className="ri-add-circle-line align-middle me-1"></i> </h5>
                                </div>
                                <div className="card-body">
                                    {successmsg !== null && (
                                        <Fragment>
                                            <p className="text text-success text-center p-3">{successmsg}</p>
                                            <Link 
                                                to='/reservations' 
                                                className="btn w-100 bg-success text-white"
                                            >
                                                Click here to view Reservations
                                            </Link>
                                        </Fragment>
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

export default ReserveRoom