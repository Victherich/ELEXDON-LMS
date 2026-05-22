import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CTA from './components/CTA';
import SubscriptionPage from './components/SubscriptionPage';
import PricingPage from './components/PricingPage';

function App() {
  return (
  <BrowserRouter>
  <Header/>
  <ScrollToTop/>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/subscription' element={<SubscriptionPage/>}/>
    <Route path='/pricing' element ={<PricingPage/>}/>
  </Routes>
  
  <Footer/>
  </BrowserRouter>
  );
}

export default App;
