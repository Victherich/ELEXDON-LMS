



// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { FaBars, FaTimes } from 'react-icons/fa';
// import { useDispatch, useSelector } from 'react-redux';

// import Swal from 'sweetalert2';
// import { adminLogout } from '../Features/Slice';
// // import AdminDetailsPage from './AdminProfile';
// // import AllAdmin from './AllAdmin';
// // import AllStudents from './AllStudents';
// // import LecturerScoring from './LecturerScoring';
// // import Announcements from './Announcements';
// // import LiveLecture from './LiveLecture';
// // import PostAssignment from './Assignments.jsx';
// // import PostLectureNotes from './PostLectureNotes.jsx';
// // import LecturerOnlineClass from './LecturerOnlineClass.jsx';
// // import MeetingLinkUploader from './MeetingLinkUploader.jsx';
// // import AdminSignup from './AdminSignUp.jsx';
// // import AccessCodeManager from './AccessCodeManager';
// // import AllLecturers from './AllLecturers';
// // import EmailPage from './EmailPage.jsx';
// // import ForumPage from './ForumPage.jsx';
// // import DashboardHomeButton from './DashboardHomeButton.jsx';
// // import CreateAttendanceForm from './CreateAttendanceForm.jsx';
// // import AttendanceManagement from './AttendanceManagement.jsx';
// // import ActiveAttendancePage from './ActiveAttendancePage.jsx';
// // import GeneralAssets from './GeneralAssets.jsx';
// // import AssessmentAndFeedbacks from './AssessmentAndFeedbacks.jsx';
// // import ZeroWasteRegistrations from './ZeroWasteRegistrations.jsx';
// // import ResultDownloadLogs from './ResultDownloadLogs.jsx';


// // Styled Components
// const DashboardContainer = styled.div`
//   display: flex;
//   min-height: 100vh;
//   // background: #f8f9fa;
//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   // background: #4caf50;
//   // background:rgba(128,0,128,0.3);
//   // background:rgba(255,0,43,0.2);
//   background:#F4F4F4;
//   color: white;
//   width: ${(props) => (props.isOpen ? '250px' : '0')};
//   overflow: hidden;
//   transition: width 0.3s ease-in-out;
//   display: flex;
//   flex-direction: column;
//   position: fixed;
//   height: 100%;
//   min-height:100vh;
//   z-index: 100;
//   box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
//   // width:300px;

//   @media (min-width: 768px) {
//     width: 250px;
//     position: static;
//     transition: none;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 20px;
//   font-size: 1.5rem;
//   text-align: center;
//   font-weight: bold;
//   color:green;
//   // background: #3b8d41;
// `;

// const SidebarMenu = styled.ul`
//   list-style: none;
//   padding: 0;
//   margin: 0;
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
// `;

// const SidebarMenuItem = styled.li`
//   padding: 15px 20px;
//   cursor: pointer;
//   background: ${(props) => (props.active ? 'lightgreen;' : 'transparent')};
//   color: ${(props)=>(props.active ? 'white':"green")};
//   // color:white;

//   font-weight: ${(props) => (props.active ? 'bold' : 'normal')};
//   transition: all 0.3s ease-in-out;

//   &:hover {
//     // background: #3b8d41;
//     background:lightgreen;
//   }
// `;

// const ContentArea = styled.div`
//   flex-grow: 1;
//   margin-left: ${(props) => (props.isOpen ? '250px' : '0')};
//   transition: margin-left 0.3s ease-in-out;
//   // padding: 20px;
//   width:100%;

//   @media (min-width: 768px) {
//     // margin-left: 250px;
//   }
// `;

// const Hamburger = styled.div`
//   position: fixed;
//   top: 70px;
//   left: 20px;
//   // background: #4caf50;
//   background:green;
//   color: white;
//   padding: 10px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   z-index: 300;

//   @media (min-width: 768px) {
//     display: none;
//   }
// `;

// const Overlay = styled.div`
//   display: ${(props) => (props.isOpen ? 'block' : 'none')};
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background: rgba(0, 0, 0, 0.5);
//   z-index: 50;
// `;

// // Content Components
// const HomeContent = () => <h1 style={{color:"purple"}}>Home Content</h1>;
// const ProfileContent = () => <h1>Profile Content</h1>;
// const SettingsContent = () => <h1>Settings Content</h1>;
// const HelpContent = () => <h1>Help Content</h1>;

// // Main Component
// const AdminDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState('profile');
//   const adminInfo = useSelector(state=>state.adminInfo)
  
//   console.log(adminInfo)

//   const dispatch = useDispatch();


  
//   const handleLogout = () => {
//     Swal.fire({
//       title: "Are you sure you want to log out?",
//       text: "You will need to log in again to access your account.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, log me out",
//       cancelButtonText: "Cancel",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         // Perform the logout actions
//         dispatch(adminLogout());
//         Swal.fire({
//           title: "Logged Out",
//           text: "You have been logged out successfully.",
//           icon: "success",
//           timer: 2000,
//           showConfirmButton: false,
//         });
  
      
//       }
//     });
//   };
  



//   const handleMenuClick = (menu) => {
//     window.scroll(0,0);
//     setActiveMenu(menu);
//     setMenuOpen(false); // Close menu on mobile when a menu item is clicked
//   };

//   const toggleMenu = () => setMenuOpen((prev) => !prev);

//   const closeMenuOnOutsideClick = () => setMenuOpen(false);

//   // Map menu options to content
//   const renderContent = () => {
//     switch (activeMenu) {
//       case 'profile':
//         return <AdminDetailsPage 
   
//           adminId={adminInfo.id} 
//   onNavigate={handleMenuClick}
//   onLogout={handleLogout}
//         />;

      
//       default:
//         return <h1 style={{color:"green",textAlign:"center",width:"100%"}}>Welcome to your Dashboard</h1>;
//     }
//   };

//   return (
//     <DashboardContainer>
//       <Hamburger onClick={toggleMenu}>
//         {menuOpen ? <FaTimes /> : <FaBars />}
//       </Hamburger>
//       <Overlay isOpen={menuOpen} onClick={closeMenuOnOutsideClick} />
//       <Sidebar isOpen={menuOpen}>
//         <SidebarHeader>Admin Dashboard</SidebarHeader>
//         <SidebarMenu>
       
//           <SidebarMenuItem
//             active={activeMenu === 'profile'}
//             onClick={() => handleMenuClick('profile')}
//           >
//             Hi, {adminInfo.name}
//           </SidebarMenuItem>

          
//           <SidebarMenuItem
//             onClick={handleLogout}
//           >
//             Logout
//           </SidebarMenuItem>

             
//         </SidebarMenu>
//       </Sidebar>
//       <DashboardHomeButton onGoHome={() => setActiveMenu('profile')} />

//       <ContentArea isOpen={menuOpen}>{renderContent()}</ContentArea>
//     </DashboardContainer>
//   );
// };

// export default AdminDashboard;


import React, { useState } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { adminLogout } from "../../Features/Slice";

/* =========================
   MAIN COMPONENT
========================= */

const UniversityAdminDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");

  const adminInfo = useSelector(
    (state) => state.adminInfo
  );

  const dispatch = useDispatch();

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    Swal.fire({
      title: "Logout?",
      text: "You will need to login again",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7b61ff",
      cancelButtonColor: "#ff4d6d",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("admin_token");

        dispatch(adminLogout());

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "Logout successful",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  /* =========================
     MENU
  ========================= */

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return (
          <WelcomeCard>
            <BigTitle>
              Welcome back 👋
            </BigTitle>

            <UserName>
              {adminInfo?.name}
            </UserName>

            <UserEmail>
              {adminInfo?.email}
            </UserEmail>
          </WelcomeCard>
        );

      default:
        return (
          <WelcomeCard>
            <BigTitle>
              Dashboard
            </BigTitle>
          </WelcomeCard>
        );
    }
  };

  return (
    <DashboardContainer>

      {/* MOBILE OVERLAY */}

      <Overlay
        isOpen={menuOpen}
        onClick={() => setMenuOpen(false)}
      />

      {/* SIDEBAR */}

      <Sidebar isOpen={menuOpen}>

        <SidebarHeader>
          ELEXDON{" "}
          <span>DASHBOARD</span>
        </SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem
            active={activeMenu === "profile"}
            onClick={() =>
              handleMenuClick("profile")
            }
          >
            <FaUserShield />
            Hi, {adminInfo?.name}
          </SidebarMenuItem>

          <SidebarMenuItem
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            Logout
          </SidebarMenuItem>

        </SidebarMenu>

      </Sidebar>

      {/* MAIN CONTENT */}

      <ContentArea>

        <TopBar>

          <Hamburger
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </Hamburger>

          <TopBarTitle>
            University Admin Dashboard
          </TopBarTitle>

        </TopBar>

        <ContentWrapper>
          {renderContent()}
        </ContentWrapper>

      </ContentArea>

    </DashboardContainer>
  );
};

export default UniversityAdminDashboard;

/* =========================
   STYLES
========================= */

const DashboardContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  overflow: hidden;
`;

const Sidebar = styled.div`
  width: ${(props) =>
    props.isOpen ? "260px" : "0"};

  overflow: hidden;

  transition: 0.3s;

  background: rgba(255,255,255,0.95);

  backdrop-filter: blur(10px);

  box-shadow: 0 10px 40px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;

  position: fixed;

  left: 0;
  top: 0;

  height: 100vh;

  z-index: 200;

  @media(min-width:768px){
    width: 260px;
  }
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;

  font-size: 24px;
  font-weight: 900;

  text-align: center;

  color: #111;

  span{
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  padding: 10px;
`;

const SidebarMenuItem = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  padding: 14px;

  border-radius: 14px;

  cursor: pointer;

  font-size: 14px;
  font-weight: 700;

  transition: 0.3s;

  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg,#59a7ff,#7b61ff)"
      : "transparent"};

  color: ${(props) =>
    props.active ? "white" : "#444"};

  &:hover{
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    color: white;
  }
`;

const ContentArea = styled.div`
  flex: 1;

  margin-left: 0;

  @media(min-width:768px){
    margin-left: 260px;
  }
`;

const TopBar = styled.div`
  width: 100%;

  height: 70px;

  display: flex;
  align-items: center;

  gap: 20px;

  padding: 0 20px;

  background: rgba(255,255,255,0.7);

  backdrop-filter: blur(10px);

  border-bottom: 1px solid rgba(0,0,0,0.05);
`;

const Hamburger = styled.div`
  width: 42px;
  height: 42px;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #59a7ff,
    #7b61ff
  );

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  font-size: 18px;

  @media(min-width:768px){
    display:none;
  }
`;

const TopBarTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;

  color: #222;
`;

const ContentWrapper = styled.div`
  padding: 20px;
`;

const WelcomeCard = styled.div`
  width: 100%;

  background: white;

  border-radius: 24px;

  padding: 30px;

  box-shadow:
    0 10px 40px rgba(0,0,0,0.05);

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const BigTitle = styled.h1`
  font-size: 32px;
  font-weight: 900;

  color: #111;
`;

const UserName = styled.h2`
  font-size: 22px;
  font-weight: 800;

  background: linear-gradient(
    135deg,
    #59a7ff,
    #7b61ff
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserEmail = styled.p`
  color: #666;
  font-size: 15px;
`;

const Overlay = styled.div`
  display: ${(props) =>
    props.isOpen ? "block" : "none"};

  position: fixed;

  width: 100%;
  height: 100%;

  top: 0;
  left: 0;

  background: rgba(0,0,0,0.4);

  z-index: 100;

  @media(min-width:768px){
    display:none;
  }
`;