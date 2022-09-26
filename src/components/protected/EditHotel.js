import { useContext, useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import axios from "../../api/axios"
import { AuthContext } from "../../context/AuthContext"

const EditHotel = () => {

    const navigate = useNavigate();

    const h_location = useLocation();
    const { user, token } = useContext(AuthContext)

    const htObj = h_location.state?.hotelObject;

    const [hotel_name, setHotel_name] = useState(htObj.hotel_name);
    const [location, setLocation] = useState(htObj.location);
    const [city, setCity] = useState(htObj.city);
    const [state, setState] = useState(htObj.state);
    const [hotelsNg_link, setHotelsNg_link] = useState(htObj.hotelsNg_link);
    const [price, setPrice] = useState(htObj.price);
    const [available_slots, setAvailable_slots] = useState(htObj.available_slots);
    const [live, setLive] = useState(htObj.live);
    const [coordinates, setCoordinates] = useState(htObj.coordinates);
    const [features, setFeatures] = useState(htObj.features);
    const [image_url, setImage_url] = useState(htObj.image_url);

    const [newfeature, setNewfeature] = useState('');

    const [update, setUpdate] = useState('Update');

    const handleSubmit = async (e) => {

        e.preventDefault();

        setUpdate('Updating...');

        try{

            const body = {
                hotel_name,
                location,
                city,
                state,
                hotelsNg_link,
                live,
                coordinates,
                features,
                available_slots,
                price,
                image_url
            }

            console.log(body);

            const response = await axios.put(`hotels/${htObj.id}`,
                body,
                {
                    headers: { 'Accept' : 'application/json', 'Authorization' : `Bearer ${token}` }
                }
            );

            console.log(response.data)
            alert('Hotel updated Successfully!');
            navigate(`/hotel-detail/${htObj.id}`)
            //window.location.reload();
            


        } catch (err) {
            if (!err?.response) {
                console.log('No Server Response');
            } else {
                console.log(err.response.data);
            }
        }

        setUpdate('Update');

    }

    const handleAddFeature = (e) => {

        e.preventDefault();

        setFeatures(features => [
            ...features,
            newfeature
        ]);

        setNewfeature('');
    }

    const removeFeature = (e, feat) => {
        if(window.confirm(`Are you sure you want to remove ${feat} from the hotel features?`)){

            let filteredArray = features.filter(item => item !== feat)
            setFeatures(filteredArray);
            //setFac(fac.filter((fc => fc.index !== index)));
        }
    }

    return (
        <div className="main-content">
            <div className="page-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                                <h4 className="mb-sm-0">Edit Hotel</h4>

                                <div className="page-title-right">
                                    <ol className="breadcrumb m-0">
                                        <li className="breadcrumb-item"><Link to="/dashboard">Dashboards</Link></li>
                                        <li className="breadcrumb-item active">Edit Hotel</li>
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
                                                           <Link to={`/hotel-detail/${htObj.id}`} className="btn btn-soft-success" style={{ marginRight : 10 }}>
                                                                <i className="ri-search-eye-line align-bottom me-1"></i>View
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
                        <div className="col-lg-6">
                           
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Hotel Detail</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row">
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Name</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default"
                                                    value={hotel_name}
                                                    onChange={(e) => setHotel_name(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Location</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">City</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div class="input-group py-2">
                                                <label class="input-group-text" htmlFor="inputGroupSelect01">State</label>
                                                <select 
                                                    class="form-select" 
                                                    id="inputGroupSelect01"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    required
                                                >
                                                    <option value={state}>{state}</option>
                                                    <option value="Lagos">Lagos</option>
                                                    <option value="Abuja">Abuja</option>
                                                </select>
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Detail link</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={hotelsNg_link}
                                                    onChange={(e) => setHotelsNg_link(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div class="input-group py-2">
                                                <label class="input-group-text" htmlFor="inputGroupSelect01">Live?</label>
                                                <select 
                                                    class="form-select" 
                                                    id="inputGroupSelect01"
                                                    value={live}
                                                    onChange={(e) => setLive(e.target.value)}
                                                    required
                                                >
                                                    <option value={live}>{live}</option>
                                                    <option value="1">Yes</option>
                                                    <option value="0">No</option>
                                                </select>
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Coordinates</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={coordinates}
                                                    onChange={(e) => setCoordinates(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Available slots</span>
                                                <input 
                                                    type="number" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={available_slots}
                                                    onChange={(e) => setAvailable_slots(e.target.value)}
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
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="input-group py-2">
                                                <span className="input-group-text" id="inputGroup-sizing-default">Image URL</span>
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    aria-label="Sizing example input" 
                                                    aria-describedby="inputGroup-sizing-default" 
                                                    value={image_url}
                                                    onChange={(e) => setImage_url(e.target.value)}
                                                />
                                            </div>
                                            <div className="input-group py-2">
                                                <button type="submit" className="btn btn-soft-success w-100">{update}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-body">
                                    <img src={image_url === null ? 'https://thumbs.dreamstime.com/z/hotel-sign-15906101.jpg' : image_url} alt="hotel" style={{ width : "100%" }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Add Feature</h5>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={handleAddFeature}>
                                        <div className="input-group py-2">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                aria-label="Sizing example input" 
                                                aria-describedby="inputGroup-sizing-default"
                                                required
                                                value={newfeature}
                                                onChange={(e) => setNewfeature(e.target.value)} 
                                            />
                                        </div>
                                        <button 
                                            type="submit"
                                            className="btn btn-soft-info w-100"
                                        >
                                            <i className="ri-add-line align-middle me-2 text-muted"></i> 
                                        </button>
                                    </form>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title mb-0">Available Features</h5>
                                </div>
                                <div className="card-body">
                                    {features.length === 0 ? <span className="text text-danger">No feature added yet!</span> : (
                                        <>
                                        {features.length !== 0 ? <p className="text text-danger">Click on any of the features to delete it</p> : ''}
                                        {features.map((feat, index) => {
                                            return (
                                                <span style={{ marginRight : 7, lineHeight : 3, background : '#e1eff4', padding : 7 }} key={index} onClick={(e) => removeFeature(e,feat)}>{feat}</span>
                                            )
                                        })}
                                        </>
                                    )}

                                    <p className="btn-warning w-100 mt-3 p-2"><strong>Note: You must click the Hotel Detail form update button to commit your changes here!</strong></p>
                                </div>
                            </div>

                            <div className="card">
                                <div className="card-body">
                                    <Link
                                        to="/room-types"
                                        state={{ hotelObject : htObj }}
                                        className="btn btn-soft-info"
                                    >
                                        <i className="ri-pencil-fill align-bottom me-2"></i> Edit Room Types
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditHotel