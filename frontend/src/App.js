import React,{useContext} from "react";
import AuthContext from "./store/auth-context";
import MainHeader from "./components/layout/MainHeader";
import { Route, Redirect } from 'react-router-dom';
import Profile from "./pages/Profile";
import Registiration from './pages/Registiration';
import Homepage from './pages/Homepage';
import Login from "./pages/Login";
import Index from "./pages/Index";
import MyProduct from "./pages/MyProducts";
import ProductDetailPage from './pages/ProductDetailPage';


function App() {

  const authCtx = useContext(AuthContext);
  
  return (
    
      <React.Fragment>
          <MainHeader/>
          <Route path='/' exact>
            <Index/>
          </Route>
          <Route path='/home'>
            <Homepage/>
          </Route>
          {authCtx.token &&
          <Route path='/my-products/:creatorId'>
            <MyProduct/>
          </Route>
          }
          {authCtx.token && 
          <Route path='/product/:prodId'>
            <ProductDetailPage/>
          </Route>
          }
          <Route path='/profile'>
            {authCtx.token && <Profile/>}
            {authCtx.token === null && <Redirect to='/'/>}
          </Route>
          
          <Route path='/signUp'>
            <Registiration/>
          </Route>
          <Route path='/login'>
            <Login/>
          </Route>
          {/* <Route path='*'>
            <Redirect to='/'></Redirect>
          </Route> */}

      </React.Fragment>
  );
}

export default App;
