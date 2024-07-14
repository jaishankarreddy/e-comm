
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

import banner from './Components/Assets/banner.jpg';
import banner2 from './Components/Assets/banner2.jpg';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/Home' element={<ShopCategory category="Home" />} />
          <Route path='/About' element={<ShopCategory category="About" />} />
          <Route path='/Contact' element={<ShopCategory category="Contact" />} />


          <Route path='/Cars' element={<ShopCategory banner={banner} category="Cars" />} />
          <Route path='/Anime' element={<ShopCategory banner={banner2} category="Anime" />} />
          <Route path='/Sports' element={<ShopCategory banner={banner2} category="Sports" />} />
          <Route path='/Nature' element={<ShopCategory banner={banner2} category="Nature" />} />



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
