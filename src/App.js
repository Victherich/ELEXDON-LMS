import logo from './logo.svg';
import './App.css';
import LandingPage from './components/LandingPage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import CTA from './components/CTA';
import UniversityRegistrationPage from './UniversityLMS/UniversityRegistrationPage';
import PricingPage from './components/PricingPage';
import AdminLogin from './UniversityLMS/AdminDashboard/AdminLogin';
import AdminDashboard from './UniversityLMS/AdminDashboard/AdminDashboard';
import UniversityLogin from './UniversityLMS/SchoolDashboard/UniversityLogin';
import PrivateUniversityDashboard from './UniversityLMS/SchoolDashboard/PrivateUniversityDashboard';
import UniversityDashboard from './UniversityLMS/SchoolDashboard/UniversityDashboard';
import UniversityPortalsHome from './components/UniversityPortalsHome';
import SecondarySchPortalsHome from './components/SecondarySchPortalsHome';
import PrimarySchoolPortalsHome from './components/PrimarySchoolPortalsHome';
import ComingSoon from './components/ComingSoon';
import ContactUs from './components/Contactus';
import PaystackSubscriptionPage from './UniversityLMS/SchoolDashboard/PaystackSubscriptionPage';
import Settings from './UniversityLMS/SchoolDashboard/SettingsPage';
import CreateCourse from './UniversityLMS/SchoolDashboard/ManageCourses';

function App() {
  return (
  <BrowserRouter>
  <Header/>
  <ScrollToTop/>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/universityregistration' element={<UniversityRegistrationPage/>}/>
    <Route path='/pricing' element ={<PricingPage/>}/>
    <Route path='/adminlogin' element={<AdminLogin/>}/>
    <Route path='/admindashboard' element={<AdminDashboard/>}/>
    <Route path='/universitylogin' element={<UniversityLogin/>}/>
    <Route path='/universityportalsintro' element={<UniversityPortalsHome/>}/>
    <Route path='/secondaryschportalsintro' element={<SecondarySchPortalsHome/>}/>
    <Route path='/primaryschportalsintro' element={<PrimarySchoolPortalsHome/>}/>
    <Route path='/comingsoon' element={<ComingSoon/>}/>
    <Route path='/contact' element={<ContactUs/>}/>

      <Route path="/universitydashboard" element={<PrivateUniversityDashboard />}>
  <Route index element={<UniversityDashboard />} />

  <Route
    path="subscription"
    element={<PaystackSubscriptionPage />}
  />
  <Route
    path="settings"
    element={<Settings />}
  />
   <Route
    path="createcourse"
    element={<CreateCourse />}
  />
</Route>
  </Routes>
  
  <Footer/>
  </BrowserRouter>
  );
}

export default App;
