import Signup from './Containers/Signup';
import Signin from './Containers/Signin';
import {Route,Routes , BrowserRouter} from 'react-router-dom'
import {PrivateRoutes} from './Components/HOC/privateRoutes.js'
import Home from './Containers/Home';
function App() {
  return (

    //If Authenticated False && localStorage == true
    <BrowserRouter>
      <Routes>
          <Route element ={<PrivateRoutes/>}> 
              <Route path = "*" element={<Home/>}></Route>
          </Route>
          <Route path="/register" element={<Signup/>}></Route>  
          <Route path="/login" element={<Signin/>}></Route>
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
