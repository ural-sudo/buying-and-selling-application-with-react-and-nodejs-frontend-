
import React,{useContext, useState} from "react";
import './MainHeader.css';
import { Link, useHistory  } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import Avatar from "../UI/Avatar";
const MainHeader = () => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [profileModal,setProfileModal] = useState(false);
    
    const profileOverkHandler = () => {
        setProfileModal(prevState => !prevState);
    }; 
    
    const logoutHandler = () => {
        authCtx.logout();
        setProfileModal(false);
        history.replace('/');
    };
    
    return (
    <React.Fragment>
        {profileModal && 
        <div className="profile-modal">
            <div className="profile-modal__name">Ahmet Erçin Ural</div>
            <div className="underline"></div>
            <div className="profile-modal__account">
                <label>Account</label>
                <Link>Settings and Privacy</Link>
                <Link>Help</Link>
                <Link>Language</Link>
            </div>
            <div className="underline"></div>
            <div className="profile-modal__logout">
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>
        }
        <header className="main-header">
            <div className="logo">
                <Link to={authCtx.token ?'/home': '/'} className="main-header__brand">MSKU PLATFORM</Link>
            </div>
            <div className="main-header__search">
                <input type='text'/>
                <button>Search</button>
            </div>
            <nav className="main-nav">
                    {authCtx.token && 
                    <div className="main-nav__list-item" >
                        <i class="fa-brands fa-product-hunt"></i>
                        <Link to={`/my-products/${authCtx.id}`} >My Products</Link>
                    </div>
                    }
                    {authCtx.token && 
                    <div className="main-nav__list-item" >
                        <div className="bildirim">1</div>
                        <i class="fa-regular fa-message"></i>
                        <Link to='/messages'>Messages</Link>
                    </div>
                    }
                     {authCtx.token && 
                    <div className="main-nav__list-item" >
                        
                        <Link to='/profile'><i style={{fontSize:'23px'}} class="fa-regular fa-bell"></i>Notifications</Link>
                    </div>
                    }
                    {!authCtx.token &&
                    <div className="main-nav__list-item">
                        <Link to='/login'>Login</Link>
                    </div>
                    }
                    {!authCtx.token && 
                    <div className="main-nav__list-item">
                        <Link to='/signUp'>Register</Link>
                    </div>
                    }
                    {authCtx.token && 
                    <div className="main-nav__list-item" >
                        <div className="nav-avatar">
                            <Link onClick={profileOverkHandler}>
                                <Avatar/>
                            </Link>
                        </div>
                    </div>
                    }
            </nav>
        </header>
    </React.Fragment>
    );
};

export default MainHeader;