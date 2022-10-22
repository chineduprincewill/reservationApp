import { useContext, useState, useEffect, Fragment, useCallback } from "react"
import { useLocation, Link } from 'react-router-dom';
import axios from "../../../api/axios"

import { AuthContext } from "../../../context/AuthContext"


const EditReservation = () => {
    
    const location = useLocation();
    const { user, token } = useContext(AuthContext)
    const { id, hotel_id, hotel_room_type_id, user_name, user_phone, hotel_name, status, check_in_date, check_in_duration } = location.state?.reserveObject;
    
    const [roomtype, setRoomtype] = useState(hotel_room_type_id);
    const [hotelid, setHotelid] = useState(hotel_id);
    const [checkin, setCheckin] = useState(check_in_date);
    const [duration, setDuration] = useState(check_in_duration);
    const [stat, setStat] = useState(status);
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


    const fetchRoomtypes = useCallback( async (val) => {

        try{
            let hotelval;
            val === undefined ? hotelval = hotel_id : hotelval = val;

            setHotelid(hotelval);

            const response = await axios.get(`hotels/${hotelval}`,
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

    }, [token, hotel_id]);

    const handleReserve = async (e) => {
        e.preventDefault();

        setRsv('Reserving...');

        try{

            const data = {
                hotel_id : hotelid,
                hotel_room_type_id : roomtype.toString(),
                check_in_date : checkin,
                check_in_duration : duration,
                status : stat
            }

            console.log(data);

            const response = await axios.put(`hotel-reservations/${id}`,
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

    useEffect(() => {

        fetchRoomtypes();
    }, [fetchRoomtypes])




    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Edit Reservation</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Edit Reservation</li>
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
                                    <h4 className="text-info pb-1">{user_name}</h4>
                                    <p>{user_phone}</p>
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
                                        <span className="text text-warning p-1">Current hotel : {hotel_name}</span>
                                        <div className="input-group py-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Hotel</label>
                                            <select 
                                                className="form-select" 
                                                id="inputGroupSelect01"
                                                value={hotelid}
                                                onChange={(e) => fetchRoomtypes(e.target.value)}
                                                required
                                            >
                                                <option>choose hotel</option>
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
                                        
                                        <p className="text text-warning p-1">Current Check In Date : {check_in_date}</p>
                                        <div className="input-group py-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Check in Date</label>
                                            <input 
                                                type="date" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default" 
                                                value={checkin}
                                                onChange={(e) => setCheckin(e.target.value)}
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
                                        
                                        <p className="text text-warning pt-1">Current status : 
                                            {status === 0 && <span className="text text-danger">Declined</span>}
                                            {status === 1 && <span className="text text-success">Paid</span>}
                                            {status === 2 && <span className="text text-warning">Pending</span>}
                                        </p>
                                        <div className="input-group pb-2">
                                            <label className="input-group-text" htmlFor="inputGroupSelect01">Payment status</label>
                                            <select 
                                                className="form-select" 
                                                id="inputGroupSelect01"
                                                value={stat}
                                                onChange={(e) => setStat(e.target.value)}
                                                required
                                            >
                                                <option>select status</option>
                                                <option value='0'>Declined</option>
                                                <option value='1'>Paid</option>
                                                <option value='2'>Pending</option>
                                            </select>
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

export default EditReservation