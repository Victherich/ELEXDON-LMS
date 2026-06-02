import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../components/Context";
import Swal from "sweetalert2";
import {
  FaSchool,
  FaUserTie,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaIdBadge,
  FaCalendarAlt,
  FaLayerGroup,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaCreditCard,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaSpeakerDeck,
  FaKey,
} from "react-icons/fa";

/* ── animations ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(0,86,179,0.25); }
  50%       { box-shadow: 0 0 0 8px rgba(0,86,179,0); }
`;

/* ── theme ── */
const C = {
  blue:   "#0056b3",
  light:  "#1a8fe3",
  sky:    "#00c6ff",
  bg:     "#f2f6fb",
  white:  "#ffffff",
  text:   "#1a2540",
  muted:  "#6b7a99",
  border: "rgba(0,86,179,0.1)",
  red:    "#e53e3e",
};

/* ────────────────────────────────────
   STYLED COMPONENTS
──────────────────────────────────── */

const Page = styled.div`
  background: ${C.bg};
  min-height: 100vh;
  padding: 8px;
  font-family: 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  animation: ${fadeUp} 0.35s ease both;
`;

/* ── profile banner ── */
const Banner = styled.div`
  background: linear-gradient(135deg, ${C.blue} 0%, ${C.light} 55%, ${C.sky} 100%);
  border-radius: 14px;
  padding: 9px 12px;
  margin-bottom: 8px;
  box-shadow: 0 6px 24px rgba(0,86,179,0.2);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px;
  position: relative;
  overflow: hidden;
  color: ${C.white};

  &::before {
    content: "";
    position: absolute;
    width: 180px; height: 180px;
    border-radius: 50%;
    background: rgba(255,255,255,0.07);
    top: -50px; right: -50px;
  }
  &::after {
    content: "";
    position: absolute;
    width: 100px; height: 100px;
    border-radius: 50%;
    background: rgba(255,255,255,0.05);
    bottom: -30px; left: 30px;
  }
`;

const BannerLeft = styled.div`
  flex: 1;
  min-width: 180px;
  position: relative;
  z-index: 1;
`;

const SchoolName = styled.h2`
  font-size: 1.2rem;
  font-weight: 800;
  margin: 0 0 2px;
  letter-spacing: -0.3px;
`;

const AdminName = styled.p`
  font-size: 0.82rem;
  opacity: 0.88;
  margin: 0 0 6px;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const EditPhoneBtn = styled.button`
  background: rgba(255,255,255,0.18);
  color: ${C.white};
  border: 1.5px solid rgba(255,255,255,0.4);
  border-radius: 20px;
  padding: 4px 10px;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: 0.2s;

  &:hover { background: rgba(255,255,255,0.28); }
`;

const BannerRight = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 0.78rem;
  opacity: 0.9;
  text-align: right;

  p {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 5px;
  }

  @media (max-width: 540px) {
    text-align: left;
    p { justify-content: flex-start; }
  }
`;

/* ── section label ── */
const SectionLabel = styled.h3`
  font-size: 0.88rem;
  font-weight: 700;
  color: ${C.blue};
  margin: 0 0 6px;
`;

/* ── tiles grid ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 7px;
  margin-bottom: 8px;
`;

const Tile = styled.div`
  background: ${C.white};
  border: 1px solid ${C.border};
  border-radius: 10px;
  padding: 9px 7px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  -webkit-tap-highlight-color: transparent;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 18px rgba(0,86,179,0.12);
    border-color: rgba(0,86,179,0.28);
  }
  &:active {
    transform: scale(0.97);
    opacity: 0.85;
  }
`;

const TileIcon = styled.div`
  font-size: 1.35rem;
  color: ${(p) => p.$danger ? C.red : C.blue};
`;

const TileLabel = styled.p`
  font-size: 0.74rem;
  font-weight: 700;
  color: ${C.text};
  margin: 0;
  line-height: 1.3;
`;

const TileSub = styled.p`
  font-size: 0.66rem;
  color: ${C.muted};
  margin: 0;
  line-height: 1.2;
`;

/* ── modal ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,20,60,0.52);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 8px;
`;

const Modal = styled.div`
  background: ${C.white};
  border-radius: 12px;
  padding: 9px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 14px 40px rgba(0,86,179,0.22);
  animation: ${fadeUp} 0.25s ease both;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;

  h3 {
    margin: 0;
    font-size: 0.9rem;
    color: ${C.blue};
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

const CloseIcon = styled.button`
  background: none;
  border: none;
  color: ${C.muted};
  font-size: 1rem;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 8px;
  font-size: 0.84rem;
  border: 1.5px solid ${C.border};
  border-radius: 8px;
  box-sizing: border-box;
  outline: none;
  margin: 5px 0;

  &:focus { border-color: ${C.blue}; }
`;

const ModalBtns = styled.div`
  display: flex;
  gap: 6px;
  margin-top: 6px;
`;

const SaveBtn = styled.button`
  flex: 1;
  padding: 7px;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  color: ${C.white};
  border: none;
  border-radius: 7px;
  font-size: 0.81rem;
  font-weight: 700;
  cursor: pointer;
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const CancelBtn = styled.button`
  flex: 1;
  padding: 7px;
  background: ${C.bg};
  color: ${C.muted};
  border: 1.5px solid ${C.border};
  border-radius: 7px;
  font-size: 0.81rem;
  font-weight: 600;
  cursor: pointer;
  &:hover { background: #e8edf5; }
`;

const LoadingText = styled.p`
  text-align: center;
  color: ${C.blue};
  font-weight: 600;
  padding: 40px;
`;

/* ────────────────────────────────────
   COMPONENT
──────────────────────────────────── */

const UniversityDashboardProfile = ({ onLogout, setActiveMenu }) => {
  const { api_domain, api_key } = useContext(Context);
  const schoolInfo  = useSelector((state) => state.schoolInfo);
  const schoolToken = useSelector((state) => state.schoolToken);
  const navigate    = useNavigate();

  const [school, setSchool]     = useState(schoolInfo);
  const [loading, setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [newPhone, setNewPhone]   = useState("");

  /* fetch profile */
//   useEffect(() => {
//     if (!schoolToken) return;
//     fetch(`${api_domain}/get_school_profile.php?key=${api_key}`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ token: schoolToken }),
//     })
//       .then((r) => r.json())
//       .then((data) => {
//         if (data.success) setSchool(data.school);
//         else Swal.fire("Error", data.error || "Failed to load profile", "error");
//       })
//       .catch(() => Swal.fire("Error", "Network error. Try again.", "error"))
//       .finally(() => setLoading(false));
//   }, [schoolToken]);



  /* tiles */
  const tiles = [
      {
      label: "Admins",
      sub:   "View & manage students",
      icon:  <FaUserGraduate />,
      path:  "/universitydashboard/students",
    },
    
    {
      label: "Students",
      sub:   "View & manage students",
      icon:  <FaUserGraduate />,
      path:  "/universitydashboard/students",
    },
    {
      label: "Lecturers",
      sub:   "View & manage lecturers",
      icon:  <FaChalkboardTeacher />,
      path:  "/universitydashboard/lecturers",
    },
      {
      label: "Announcements",
      sub:   "View & manage Announcements",
      icon:  <FaSpeakerDeck/>,
      path:  "announcements",
    },

       {
      label: "Access Codes",
      sub:   "View & manage Access codes for Admins and lecture sign ups",
      icon:  <FaKey/>,
      path:  "accesscodes",
    },

       {
      label: "Attendance",
      sub:   "View & manage Attendances",
      icon:  <FaBook/>,
      path:  "attendance",
    },
      {
      label: "Mark Attendance",
      sub:   "View active attendace sheets & Mark attendance",
      icon:  <FaBook/>,
      path:  "activeattendance",
    },

    // {
    //   label: "Settings",
    //   sub:   "Account settings",
    //   icon:  <FaCog />,
    //   path:  "/universitydashboard/settings",
    // },
  ];

//   if (loading) return <LoadingText>Loading profile...</LoadingText>;
  if (!school)  return <LoadingText>Could not load profile.</LoadingText>;

  return (
    <Page>
      <Wrapper>

        {/* ── BANNER ── */}
        <Banner>
          <BannerLeft>
            <SchoolName>
              <FaSchool style={{ marginRight: 6, opacity: 0.85 }} />
              {school.school_name}
            </SchoolName>

            <AdminName>
              <FaUserTie /> {school.admin_name}
            </AdminName>

          
          </BannerLeft>

          <BannerRight>
            <p><FaEnvelope /> {school.email}</p>
            <p><FaPhoneAlt /> {school.phone}</p>
            <p><FaMapMarkerAlt /> {school.address}</p>
            <p><FaIdBadge /> Role: {school.role}</p>
            <p>
              <FaCalendarAlt />
              Joined: {school.created_at
                ? new Date(school.created_at).toLocaleDateString()
                : "—"}
            </p>
          </BannerRight>
        </Banner>

        {/* ── TILES ── */}
        <SectionLabel>Quick Access</SectionLabel>
        <Grid>
          {tiles.map((t) => (
            <Tile key={t.path} onClick={() => setActiveMenu(t.path)}>
              <TileIcon>{t.icon}</TileIcon>
              <TileLabel>{t.label}</TileLabel>
              <TileSub>{t.sub}</TileSub>
            </Tile>
          ))}

           <Tile onClick={()=>navigate("/universitydashboard/settings")}>
            <TileIcon><FaCog /></TileIcon>
            <TileLabel>Settings</TileLabel>
            <TileSub>School settings</TileSub>
          </Tile>

          {/* logout */}
          <Tile onClick={onLogout}>
            <TileIcon $danger><FaSignOutAlt /></TileIcon>
            <TileLabel>Logout</TileLabel>
            <TileSub>Sign out securely</TileSub>
          </Tile>
        </Grid>

      </Wrapper>

  
    </Page>
  );
};

export default UniversityDashboardProfile;
