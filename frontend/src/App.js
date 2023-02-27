import React,{ useEffect} from 'react';
import {BrowserRouter as Router,Switch,Route, Redirect} from 'react-router-dom'
import './App.css';
import Question from './components/Ask-Question/Question';
import Header from './components/Header/Header';
import Main from './components/Main';
import ViewQuestion from './components/ViewQuestion'
import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux';
import { login, logout, selectUser } from './state/reducers/userSlice';
import { useDispatch } from 'react-redux';
import { auth } from "./firebase";

function App() {
  const user = useSelector(selectUser)
  const dispatch =useDispatch()

useEffect(() => {
  auth.onAuthStateChanged((authUser)=>{
    if(authUser){
      dispatch(login({
        uid:authUser.uid,
        photo:authUser.photoURL,
        displayName:authUser.displayName,
        email:authUser.email
      }))
    }else {
      dispatch(logout())
    }
  })

  
}, [dispatch])

const PrivateRoute = ({ component: Component,...rest}) =>(
  <Route {...rest} render={(props) => user ? (<Component {...props}/>) :(
    <Redirect to={{
     pathname:'/auth',
   state:{
     from:props.location,
   }
 }}/>)} />
)
  



  return (
    <div className="App">
      <Router>
      <Header />
      <Switch>
      <Route path="/auth" component ={Auth} />
      <PrivateRoute path="/ask-question" component ={Question} />
      <Route path="/question" component ={ViewQuestion} />
      <Route path="/" component ={Main} />
      {/* <Route path="/ask-question" component ={Question} /> */}
      </Switch>
      </Router>
      
    </div>
  );
}

export default App;


