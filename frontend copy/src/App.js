// npm start 

import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import OurCollections from './Components/Our-collections/OurCollections';

// import banner from './Components/Assets/banner.jpg';
import banner2 from './Components/Assets/banner2.jpg';
import AboutContact from './Pages/css/AboutContact';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Shop/> } />
          <Route path='/About' element={<AboutContact category="About" />} />
          <Route path='/Contact' element={<AboutContact category="Contact" />} />


          <Route path='/Cars' element={<ShopCategory banner={banner2} category="cars" />} />
          <Route path='/Bikes' element={<ShopCategory banner={banner2} category="bikes" />} />
          <Route path='/Anime' element={<ShopCategory banner={banner2} category="anime" />} />
          <Route path='/Marvel' element={<ShopCategory banner={banner2} category="marvel" />} />
          <Route path='/Sports' element={<ShopCategory banner={banner2} category="sports" />} />
          <Route path='/Nature' element={<ShopCategory banner={banner2} category="nature" />} />



          <Route path='/OurCollections' element={<OurCollections/>}/>

          <Route path="/Product" element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>

          <Route path='/cars' element={<cars />} />


          <Route path='/Cart' element={<Cart />} />
          <Route path='/Login' element={<LoginSignup />} />

        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
