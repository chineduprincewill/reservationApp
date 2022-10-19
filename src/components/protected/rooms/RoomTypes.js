import { useCallback, useContext, useEffect, useState } from "react"
import { useLocation, Link } from "react-router-dom"
import axios from "../../../api/axios"
import { AuthContext } from "../../../context/AuthContext"
import SpinnerSm from "../../layout/SpinnerSm"

const ADD_ROOMTYPE_API = 'hotel-room-types';

const RoomTypes = () => {

    const h_location = useLocation();
    const { user, token } = useContext(AuthContext);

    const { id, hotel_name, location, city, state, price, available_slots, image_url } = h_location.state?.hotelObject;

    const [fname, setFname] = useState('');
    const [fprice, setFprice] = useState();
    const [fslots, setFslots] = useState();
    const [facility, setFacility] = useState('');
    const [roomtypes, setRoomtypes] = useState(null);
    const [roomtype, setRoomtype] = useState(null);
    const [fac, setFac] = useState([]);
    const [createstatus, setCreatestatus] = useState('Create');

    const [edit, setEdit] = useState();
    const [avail_slots, setAvail_slots] = useState();

    const [deleterm, setDeleterm] = useState('');
    const [update, setUpdate] = useState('Update');
    const [updatemsg, setUpdatemsg] = useState('');
    const [roomtypeid, setRoomtypeid] = useState();


    const handleAddFacility = (e) => {

        e.preventDefault();

        setFac(fac => [
            ...fac,
            facility
        ]);

        setFacility('');

    }


    const removeFacility = (e, facitem) => {

        if(window.confirm(`Are you sure you want to remove ${facitem} from the room type?`)){

            let filteredArray = fac.filter(item => item !== facitem)
            setFac(filteredArray);
            //setFac(fac.filter((fc => fc.index !== index)));
        }
    }


    const createRoomtype = async (e) => {

        e.preventDefault();

        setCreatestatus('Creating...');

        try{

            const body = {
                hid : id,
                name : fname,
                price : fprice,
                available_slots : fslots,
                facilities : fac
            }

            console.log(body);

            const response = await axios.post(ADD_ROOMTYPE_API,
                body,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );

            console.log(response.data)
            alert('Room type Created Successfully!');
            //window.location.reload();
            setRoomtype(response.data.room_data);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setCreatestatus('Create');
        setFname('');
        setFprice('');
        setFslots('');
        setFac([]);

    }


    const getRoomtypes = useCallback( async () => {

        try{

            const response = await axios.get(`hotels/${id}`,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );
            
            setRoomtypes(response.data.hotel_data.room_types);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }
    }, [id, token]);


    const editRoomtype = (typid) => {

        setEdit(typid);
        setRoomtypeid(typid);
    }


    const handleRoomtypeEdit = async (e) => {

        e.preventDefault();

        setUpdate('Updating...');

        try{

            const body = {
                available_slots : avail_slots
            }

            const response = await axios.put(`hotel-room-types/${roomtypeid}`,
                body,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );

            alert(response.data.message)
            //alert('Room type Created Successfully!');
            //window.location.reload();
            setUpdatemsg(response.data.message+roomtypeid);


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setUpdate('Update');
        setAvail_slots('');
        setRoomtypeid('');
    }

    const deleteRoomtype = async (id, rmName) => {

        if(window.confirm(`Are your sure you want to delete ${rmName} room type?`)){

            setDeleterm(`Deleting ${rmName} ...`);

            try{

                const response = await axios.delete(`hotel-room-types/${id}`,
                    {
                        headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                    }
                );
                
                alert(response.data.message);

                setRoomtypes(roomtypes.filter((rmtype => rmtype.id !== id)));


            } catch (err) {
                if (!err?.response) {
                    console.log('No Server Response');
                } else {
                    console.log(err.response.data);
                }
            }

            setDeleterm('');
        }
    }

    useEffect(()=> {
    
        getRoomtypes();

    }, [roomtype, updatemsg, getRoomtypes]);

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Room types</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Room types</li>
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
                                                            <Link to={`/hotel-detail/${h_location.state?.hotelObject.id}`} className="btn btn-soft-success" style={{ marginRight : 10 }}>
                                                            <i className="ri-search-eye-line align-bottom me-1"></i>View
                                                            </Link>
                                                            <Link
                                                                to="/edit-hotel"
                                                                state={{ hotelObject : h_location.state?.hotelObject }}
                                                                className="btn btn-soft-danger"
                                                                style={{ marginRight : 10 }}
                                                            >
                                                                <i className="ri-pencil-fill align-bottom me-2"></i> Edit Hotel
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
                        <div className="col-lg-5">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Hotel Detail</h5>
                                </div>
                                <div className="card-body">
                                    <img src={image_url === null ? 'https://thumbs.dreamstime.com/z/hotel-sign-15906101.jpg' : image_url} alt="hotel" style={{ width : "100%" }} />
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <span className="col-sm-3 py-2"><strong>Name</strong></span><span className="col-sm-9 py-2">{hotel_name}</span>
                                        <span className="col-sm-3 py-2"><strong>Address</strong></span><span className="col-sm-9 py-2">{location}</span>
                                        <span className="col-sm-3 py-2"><strong>City</strong></span><span className="col-sm-9 py-2">{city}</span>
                                        <span className="col-sm-3 py-2"><strong>State</strong></span><span className="col-sm-9 py-2">{state}</span>
                                        <span className="col-sm-3 py-2"><strong>Price</strong></span><span className="col-sm-9 py-2">&#8358; {price}</span>
                                        <span className="col-sm-3 py-2"><strong>Available slots</strong></span><span className="col-sm-9 py-2">{available_slots}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Create Room type</h5>
                                </div>
                                <div className="card-body">
                                    
                                        <div className="row">
                                            <div className="col-lg-5">
                                                <form onSubmit={createRoomtype}>
                                                    <div className="input-group py-2">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            aria-label="Sizing example input" 
                                                            aria-describedby="inputGroup-sizing-default" 
                                                            value={fname}
                                                            onChange={(e) => setFname(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="input-group py-2">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Price</span>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            aria-label="Sizing example input" 
                                                            aria-describedby="inputGroup-sizing-default" 
                                                            value={fprice}
                                                            onChange={(e) => setFprice(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="input-group py-2">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Available slots</span>
                                                        <input 
                                                            type="number" 
                                                            className="form-control" 
                                                            aria-label="Sizing example input" 
                                                            aria-describedby="inputGroup-sizing-default" 
                                                            value={fslots}
                                                            onChange={(e) => setFslots(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <button className="btn btn-info w-100" style={{ marginTop : 10 }}>
                                                        {createstatus}
                                                    </button>
                                                </form>
                                            </div>
                                            <div className="col-lg-7">
                                                <form onSubmit={handleAddFacility}>
                                                    <div className="input-group py-2">
                                                        <span className="input-group-text" id="inputGroup-sizing-default">Facilities</span>
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            aria-label="Sizing example input" 
                                                            aria-describedby="inputGroup-sizing-default"
                                                            required
                                                            value={facility}
                                                            onChange={(e) => setFacility(e.target.value)} 
                                                        />
                                                    </div>
                                                    <button 
                                                        type="submit"
                                                        className="btn btn-soft-info w-100"
                                                    >
                                                        <i className="ri-add-line align-middle me-2 text-muted"></i> 
                                                    </button>
                                                    <div className="p-3">
                                                       
                                                        {fac.length === 0 ? <span className="text-warning">No facility currently in room type about to be created. Enter facility in the field provided and click button above to add</span> : (
                                                            
                                                            fac.map((fc, index) => {
                                                                
                                                                 return (<span style={{ marginRight : 7, lineHeight : 3, background : '#e1eff4', padding : 7 }} key={index} onClick={(e) => removeFacility(e,fc)}>{fc}</span>)
                                                                
                                                            })
                                                        )}
                                                        {fac.length !== 0 ? <p className="text text-danger py-3">Click on any of the faciliy you added to delete it</p> : ''}
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Available Room types</h5>
                                </div>
                                <div className="card-body">
                                    {deleterm !== '' && <span className="text text-danger p-3">{deleterm}</span>}
                                    {roomtypes === null ? <SpinnerSm /> : (
                                        <ul>
                                            {roomtypes.length === 0 ? <li style={{ listStyle : 'none' }}><span className="text-danger">No Room type available in this hotel</span></li> : (roomtypes.map(rmt => {
                                                return (
                                                    <li className="border-bottom" style={{ listStyle : 'none' }} key={rmt.id}>
                                                        <div className="row">
                                                            <span className="col-sm-3 text-info py-1">Name</span><span className="col-sm-3 py-1">{rmt.name}</span>
                                                            <span className="col-sm-3 text-info py-1">Price</span><span className="col-3 py-1">&#8358; {rmt.price}</span>
                                                        </div>
                                                        <div className="row">
                                                            <span className="col-sm-3 text-info py-1">Available slots</span><span className="col-sm-3 py-1">{rmt.available_slots}</span>
                                                            <span className="col-sm-3 text-info py-1">Facilities</span>
                                                            <span className="col-sm-3 py-1">
                                                                {rmt.facilities.length > 0 && rmt.facilities.map((fac, index) => {return <span key={index}>{`${fac}, `}</span>} ) } 
                                                            </span>
                                                        </div>
                                                        <div className="row py-3">
                                                            <div className="col-sm-7">
                                                                {edit === rmt.id && (
                                                                    <form onSubmit={handleRoomtypeEdit}>
                                                                        <div className="input-group py-2" style={{ marginTop : -15 }}>
                                                                            <span className="input-group-text" id="inputGroup-sizing-default">Available slots</span>
                                                                            <input 
                                                                                type="number" 
                                                                                className="form-control form-control-xs" 
                                                                                aria-label="Sizing example input" 
                                                                                aria-describedby="inputGroup-sizing-default"
                                                                                required
                                                                                value={avail_slots}
                                                                                onChange={(e) => setAvail_slots(e.target.value)} 
                                                                            />
                                                                            <button className="btn btn-info">{update}</button>
                                                                            <button 
                                                                                className="btn btn-link text-danger" 
                                                                                style={{ textDecoration : 'none' }}
                                                                                onClick={(e) => setEdit('')}
                                                                            >
                                                                                <i className="ri-close-circle-fill align-middle me-2"></i>
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                )}
                                                            </div>
                                                            <div className="col-sm-3"></div>
                                                            <div className="col-sm-2">
                                                                <span 
                                                                    className="text-info"
                                                                    onClick={(e) => editRoomtype(rmt.id)}
                                                                >
                                                                    <i className="ri-pencil-fill align-middle me-2"></i>
                                                                </span>
                                                                <span 
                                                                    className="text-danger"
                                                                    onClick={(e) => deleteRoomtype(rmt.id, rmt.name)}
                                                                >
                                                                    <i className="ri-delete-bin-fill align-middle me-2"></i>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            }))}
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

export default RoomTypes