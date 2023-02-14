import React,{useContext} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import modeContext from '../context/mode/modeContext';



const Navigationbar = () => {
    const context = useContext(modeContext);
    const { mode,color ,toggleMode} = context;
    const handelToggel=()=>{
        // console.log("toggle");
      toggleMode();
    }
   
    let navigation = useNavigate();
    const handelLogout = () => {
        localStorage.removeItem('token')//remove the token from the storage so the user cant login again
        navigation('/login');
    }
    let location = useLocation();
    // useEffect(() => {
    //   //  console.log(location.pathname) // tell the location of the component
    //     //use to set the active state in the navbar for navlink
    // }, [location]);

    return (
        <div>
            <section>
            <nav className= {` navbar navbar-expand-md navbar-${mode} `}>
                    <div className="container my-1">
                        <Link className="navbar-brand" to="/">Cloud-Book</Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
                                </li>

                            </ul>
                            <div>
                                {!localStorage.getItem('token')?<form className='d-flex '>
                                    <Link className={`btn mx-2 btn-${mode==='dark'? 'secondary': 'primary'}`} to="/login">Login </Link>
                                    <Link className={`btn mx-2 btn-${mode==='dark'? 'secondary': 'primary'}`} to="/signup">Signup </Link>
                                </form>:<Button className={`btn  mx-2 btn-${mode==='dark'? 'secondary': 'primary'}`} onClick={handelLogout} > Logout </Button>}
                            </div>
                            <div className={`form-check mx-2 form-switch text-${mode==='light' ? 'dark' :'light'}`}>
                            <input className="form-check-input" onClick={handelToggel} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{color} </label>
                            </div>
                            </div>

                        </div>
                </nav>

            </section>
        </div>

    )
}

export default Navigationbar