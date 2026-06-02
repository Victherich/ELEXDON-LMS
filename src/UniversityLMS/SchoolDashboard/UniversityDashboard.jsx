// import React, { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
// import { FaBars, FaTimes, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { schoolLogout } from "../../Features/Slice";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";
// import { Context } from "../../components/Context";

// /* =========================
//    SCHOOL DASHBOARD
// ========================= */

// const UniversityDashboard = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState("profile");
//   const navigate = useNavigate();
// const [dashboardShow, setDashboardShow]=useState(false);
//   const schoolInfo = useSelector((state) => state.schoolInfo);
//   const schoolToken = useSelector((state) => state.schoolToken);
// const [loading, setLoading] = useState(true);
// const location = useLocation();


//   const dispatch = useDispatch();
//   const {api_domain, api_key}=useContext(Context);






// useEffect(() => {
//   const checkSubscription = async () => {
//     try {
//       setLoading(true);

//       const token = schoolToken;

//       if (!token) {
//         navigate("/universitylogin");
//         return;
//       }

//       const res = await fetch(
//         `${api_domain}/check_subscription.php?key=${api_key}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ token }),
//         }
//       );

//       const data = await res.json();

//       if (!data.active) {
//         navigate("/universitydashboard/subscription");
//         return;
//       }

//       setDashboardShow(true);
//     } catch (error) {
//       console.error(error);
//       navigate("/universitydashboard/subscription");
//     } finally {
//       setLoading(false);
//     }
//   };

//   checkSubscription();
// }, [schoolToken]);





//   /* =========================
//      LOGOUT
//   ========================= */

//   const handleLogout = () => {
//     Swal.fire({
//       title: "Logout?",
//       text: "You will need to login again",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#7b61ff",
//       cancelButtonColor: "#ff4d6d",
//       confirmButtonText: "Logout",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         localStorage.removeItem("school_token");

//         dispatch(schoolLogout());

//         Swal.fire({
//           icon: "success",
//           title: "Logged Out",
//           text: "Logout successful",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//       }
//     });
//   };





//   /* =========================
//      MENU
//   ========================= */

//   const handleMenuClick = (menu) => {
//     setActiveMenu(menu);
//     setMenuOpen(false);
//   };







//   const renderContent = () => {
//     switch (activeMenu) {
//       case "profile":
//         return (
//           <WelcomeCard>
//             <BigTitle>Welcome back 👋</BigTitle>

//             <UserName>{schoolInfo?.name}</UserName>

//             <UserEmail>{schoolInfo?.email}</UserEmail>

//             <SchoolName>{schoolInfo?.school_name}</SchoolName>
//           </WelcomeCard>
//         );

//       default:
//         return (
//           <WelcomeCard>
//             <BigTitle>School Dashboard</BigTitle>
//           </WelcomeCard>
//         );
//     }
//   };


// if (loading) {
//   return (
//     <div style={{ padding: "5rem" }}>
//       <p>Checking subscription...</p>
//     </div>
//   );
// }

// if (!dashboardShow) {
//   return null;
// }



//   return (
//     <DashboardContainer>

//       <Overlay isOpen={menuOpen} onClick={() => setMenuOpen(false)} />

//       {/* SIDEBAR */}
//       <Sidebar isOpen={menuOpen}>

//         <SidebarHeader>
//           SCHOOL <span>PORTAL</span>
//         </SidebarHeader>

//         <SidebarMenu>

//           <SidebarMenuItem
//             active={activeMenu === "profile"}
//             onClick={() => handleMenuClick("profile")}
//           >
//             <FaUserGraduate />
//             Hi, {schoolInfo?.name}
//           </SidebarMenuItem>

//           <SidebarMenuItem
//   onClick={() =>
//     navigate("/universitydashboard/subscription")
//   }
// >
//   💳 University Subscription
// </SidebarMenuItem>

// <SidebarMenuItem
//   onClick={() =>
//     navigate("/universitydashboard/settings")
//   }
// >
//   💳 Settings
// </SidebarMenuItem>

//           <SidebarMenuItem onClick={handleLogout}>
//             <FaSignOutAlt />
//             Logout
//           </SidebarMenuItem>

//         </SidebarMenu>

//       </Sidebar>

//       {/* MAIN CONTENT */}
//       <ContentArea>

//         <TopBar>

//           <Hamburger onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? <FaTimes /> : <FaBars />}
//           </Hamburger>

//           <TopBarTitle>School Dashboard</TopBarTitle>

//         </TopBar>

//         <ContentWrapper>

//   {/* dashboard home */}
//   {location.pathname === "/universitydashboard" &&
//     renderContent()
//   }

//   {/* nested routes */}
//   <Outlet />

// </ContentWrapper>

//       </ContentArea>

//     </DashboardContainer>
//   );
// };

// export default UniversityDashboard;



// /* =========================
//    STYLES
// ========================= */

// const DashboardContainer = styled.div`
//   width: 100%;
//   min-height: 100vh;

//   display: flex;

//   background: linear-gradient(
//     135deg,
//     #f8fbff,
//     #f3f4ff
//   );

//   overflow: hidden;
// `;

// const Sidebar = styled.div`
//   width: ${(props) =>
//     props.isOpen ? "260px" : "0"};

//   overflow: hidden;

//   transition: 0.3s;

//   background: rgba(255,255,255,0.95);

//   backdrop-filter: blur(10px);

//   box-shadow: 0 10px 40px rgba(0,0,0,0.06);

//   display: flex;
//   flex-direction: column;

//   position: fixed;

//   left: 0;
//   top: 0;

//   height: 100vh;

//   z-index: 200;

//   @media(min-width:768px){
//     width: 260px;
//   }
// `;

// const SidebarHeader = styled.div`
//   padding: 25px 20px;

//   font-size: 24px;
//   font-weight: 900;

//   text-align: center;

//   color: #111;

//   span{
//     background: linear-gradient(
//       135deg,
//       #59a7ff,
//       #7b61ff
//     );

//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const SidebarMenu = styled.div`
//   display: flex;
//   flex-direction: column;

//   gap: 10px;

//   padding: 10px;
// `;

// const SidebarMenuItem = styled.div`
//   display: flex;
//   align-items: center;

//   gap: 10px;

//   padding: 14px;

//   border-radius: 14px;

//   cursor: pointer;

//   font-size: 14px;
//   font-weight: 700;

//   transition: 0.3s;

//   background: ${(props) =>
//     props.active
//       ? "linear-gradient(135deg,#59a7ff,#7b61ff)"
//       : "transparent"};

//   color: ${(props) =>
//     props.active ? "white" : "#444"};

//   &:hover{
//     background: linear-gradient(
//       135deg,
//       #59a7ff,
//       #7b61ff
//     );

//     color: white;
//   }
// `;

// const ContentArea = styled.div`
//   flex: 1;

//   margin-left: 0;

//   @media(min-width:768px){
//     margin-left: 260px;
//   }
// `;

// const TopBar = styled.div`
//   width: 100%;

//   height: 70px;

//   display: flex;
//   align-items: center;

//   gap: 20px;

//   padding: 0 20px;

//   background: rgba(255,255,255,0.7);

//   backdrop-filter: blur(10px);

//   border-bottom: 1px solid rgba(0,0,0,0.05);
// `;

// const Hamburger = styled.div`
//   width: 42px;
//   height: 42px;

//   border-radius: 12px;

//   background: linear-gradient(
//     135deg,
//     #59a7ff,
//     #7b61ff
//   );

//   color: white;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   cursor: pointer;

//   font-size: 18px;

//   @media(min-width:768px){
//     display:none;
//   }
// `;

// const TopBarTitle = styled.h2`
//   font-size: 20px;
//   font-weight: 800;

//   color: #222;
// `;

// const ContentWrapper = styled.div`
//   padding: 20px;
// `;

// const WelcomeCard = styled.div`
//   width: 100%;

//   background: white;

//   border-radius: 24px;

//   padding: 30px;

//   box-shadow:
//     0 10px 40px rgba(0,0,0,0.05);

//   display: flex;
//   flex-direction: column;

//   gap: 10px;
// `;

// const BigTitle = styled.h1`
//   font-size: 32px;
//   font-weight: 900;

//   color: #111;
// `;

// const UserName = styled.h2`
//   font-size: 22px;
//   font-weight: 800;

//   background: linear-gradient(
//     135deg,
//     #59a7ff,
//     #7b61ff
//   );

//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
// `;

// const UserEmail = styled.p`
//   color: #666;
//   font-size: 15px;
// `;

// const Overlay = styled.div`
//   display: ${(props) =>
//     props.isOpen ? "block" : "none"};

//   position: fixed;

//   width: 100%;
//   height: 100%;

//   top: 0;
//   left: 0;

//   background: rgba(0,0,0,0.4);

//   z-index: 100;

//   @media(min-width:768px){
//     display:none;
//   }
// `;


// const SchoolName = styled.p`
//   font-size: 16px;
//   font-weight: 700;
//   color: #7b61ff;
// `;



import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { FaBars, FaTimes, FaUserGraduate, FaSignOutAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { schoolLogout } from "../../Features/Slice";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../components/Context";
import SchoolDashboardProfile from "./SchoolDashboardProfile";
import ManageAnnouncements from "./ManageAnnouncements";
import DashboardHomeButton from "./DashboardHomebutton";
import ManageAccessCodes from "./ManageAccessCodes";
import AttendanceManagement from "./AttendanceManagement";
import ActiveAttendancePage from "./ActiveAttendancePage";

const UniversityDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("profile");
  const navigate = useNavigate();
  const [dashboardShow, setDashboardShow] = useState(false);
  const schoolInfo = useSelector((state) => state.schoolInfo);
  const schoolToken = useSelector((state) => state.schoolToken);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const { api_domain, api_key } = useContext(Context);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        setLoading(true);
        const token = schoolToken;
        if (!token) {
          navigate("/universitylogin");
          return;
        }
        const res = await fetch(
          `${api_domain}/check_subscription.php?key=${api_key}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );
        const data = await res.json();
        if (!data.active) {
          navigate("/universitydashboard/subscription");
          return;
        }
        setDashboardShow(true);
      } catch (error) {
        console.error(error);
        navigate("/universitydashboard/subscription");
      } finally {
        setLoading(false);
      }
    };
    checkSubscription();
  }, [schoolToken]);

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
        localStorage.removeItem("school_token");
        dispatch(schoolLogout());
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

  // call this whenever a sidebar item is clicked
  const closeSidebar = () => setSidebarOpen(false);

  const renderContent = () => {
    switch (activeMenu) {
      case "profile":
        return <SchoolDashboardProfile setActiveMenu={setActiveMenu}/>
      
         case "announcements":
        return <ManageAnnouncements/>;

         case "accesscodes":
        return <ManageAccessCodes/>;

          case "attendance":
        return <AttendanceManagement/>;

        case "activeattendance":
        return <ActiveAttendancePage/>;
      default:
        return (
          <SchoolDashboardProfile/>
        );
    }
  };

  if (loading) {
    return <div style={{ padding: "5rem" }}><p>Checking subscription...</p></div>;
  }

  if (!dashboardShow) {
    return null;
  }

  return (
    <DashboardContainer>

      {/* ── DARK OVERLAY ── tap this to close sidebar on mobile */}
      {sidebarOpen && (
        <Overlay onClick={closeSidebar} />
      )}

      {/* ── SIDEBAR ── */}
      <Sidebar open={sidebarOpen}>
        <SidebarHeader>
          SCHOOL <span>PORTAL</span>
        </SidebarHeader>

        <SidebarMenu>

          <SidebarMenuItem
            active={activeMenu === "profile" ? 1 : 0}
            onClick={() => {
              setActiveMenu("profile");
              closeSidebar();
            }}
          >
            <FaUserGraduate />
            Hi, {schoolInfo?.name}
          </SidebarMenuItem>

          <SidebarMenuItem
            onClick={() => {
              navigate("/universitydashboard/subscription");
              closeSidebar();
            }}
          >
            💳 University Subscription
          </SidebarMenuItem>

          <SidebarMenuItem
            onClick={() => {
              navigate("/universitydashboard/settings");
              closeSidebar();
            }}
          >
            ⚙️ Settings
          </SidebarMenuItem>

          <SidebarMenuItem
            onClick={() => {
              closeSidebar();
              handleLogout();
            }}
          >
            <FaSignOutAlt />
            Logout
          </SidebarMenuItem>

        </SidebarMenu>
      </Sidebar>

      {/* ── MAIN CONTENT ── */}
      <ContentArea>

        <TopBar>
          {/* OPEN/CLOSE BUTTON — only visible on mobile */}
          <MobileToggleBtn onClick={() => setSidebarOpen((prev) => !prev)}>
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </MobileToggleBtn>

          <TopBarTitle>School Dashboard</TopBarTitle>
        </TopBar>

        <ContentWrapper>
          {location.pathname === "/universitydashboard" && renderContent()}
          <Outlet />
        </ContentWrapper>

      </ContentArea>
      <DashboardHomeButton onGoHome={()=>setActiveMenu("profile")}/>

    </DashboardContainer>
  );
};

export default UniversityDashboard;


/* =========================
   STYLES
========================= */

const DashboardContainer = styled.div`
padding-top:60px;
  width: 100%;
  min-height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #f8fbff, #f3f4ff);
`;

/* full-screen dark background — clicking it closes the sidebar */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  overflow-y: auto;
  z-index: 400;
  background: rgba(255, 255, 255, 0.97);
  backdrop-filter: blur(10px);
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  /* mobile: slide in from left when open, hide off-screen when closed */
  transform: translateX(${(p) => (p.open ? "0" : "-100%")});
  transition: transform 0.28s ease;

  /* desktop: always visible, no sliding */
  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

const SidebarHeader = styled.div`
  padding: 25px 20px;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
  color: #111;
  flex-shrink: 0;

  span {
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const SidebarMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 10px 40px;
`;

const SidebarMenuItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 14px;
  min-height: 54px;
  border-radius: 14px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: background 0.2s, color 0.2s;
  -webkit-tap-highlight-color: transparent;

  background: ${(p) =>
    p.active ? "linear-gradient(135deg, #59a7ff, #7b61ff)" : "transparent"};
  color: ${(p) => (p.active ? "white" : "#444")};

  &:hover {
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    color: white;
  }

  &:active {
    opacity: 0.75;
  }
`;

const ContentArea = styled.div`
  flex: 1;
  min-width: 0;
  /* push content right on desktop to make room for fixed sidebar */
  margin-left: 0;

  @media (min-width: 768px) {
    margin-left: 260px;
  }
`;

const TopBar = styled.div`
  position: sticky;
  top: 0;
  z-index: 200;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 10px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

/* the open/close button — only shows on mobile */
const MobileToggleBtn = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 12px;
  border: none;
  background: linear-gradient(135deg, #59a7ff, #7b61ff);
  color: white;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;

  /* hide on desktop — sidebar is always visible there */
  @media (min-width: 768px) {
    display: none;
  }
`;

const TopBarTitle = styled.h2`
  font-size: 20px;
  font-weight: 800;
  color: #222;
`;

const ContentWrapper = styled.div`
  // padding: 20px;
`;

const WelcomeCard = styled.div`
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 30px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.05);
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
  background: linear-gradient(135deg, #59a7ff, #7b61ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const UserEmail = styled.p`
  color: #666;
  font-size: 15px;
`;

const SchoolName = styled.p`
  font-size: 16px;
  font-weight: 700;
  color: #7b61ff;
`;
