import Signup from './Containers/Signup';
import Signin from './Containers/Signin';
import {Route,Routes , BrowserRouter} from 'react-router-dom'
import {PrivateRoutes} from './Components/HOC/privateRoutes.js'
import Home from './Containers/Home';
import Products from './Containers/Products';
import Category from './Containers/Category';
import Orders from './Containers/Orders';
import Layout from './Components/Layout';
function App() {
  return (

    //If Authenticated False && localStorage == true
    
    <BrowserRouter>
    <Layout>
      <Routes>
          <Route element ={<PrivateRoutes/>}> 
              <Route path = "/category" element={<Category/>}></Route>
              <Route path = "/products" element={<Products/>}></Route>
              <Route path = "/orders" element={<Orders/>}></Route>
              <Route path = "*" element={<Home/>}></Route>
          </Route>
          <Route path="/register" element={<Signup/>}></Route>  
          <Route path="/login" element={<Signin/>}></Route>
      </Routes>  
      </Layout>
    </BrowserRouter>
    
  );
}

export default App;
