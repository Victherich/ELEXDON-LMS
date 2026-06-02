// import React, { useEffect, useState, useContext } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { Context } from "../../components/Context";
// import { useSelector } from "react-redux";

// const Container = styled.div`
//   padding: 16px;
// `;

// const Card = styled.div`
//   background: #fff;
//   border-radius: 12px;
//   padding: 14px;
//   margin-bottom: 12px;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.06);
// `;

// const Button = styled.button`
//   background: #0056b3;
//   color: #fff;
//   border: none;
//   padding: 8px 12px;
//   border-radius: 8px;
//   cursor: pointer;
//   margin-top: 10px;

//   &:hover {
//     opacity: 0.9;
//   }
// `;

// const Title = styled.h3`
//   margin: 0;
//   color: #0056b3;
// `;

// const ActiveAttendancePage = () => {
//   const { api_domain, api_key, courses } = useContext(Context);
//   const schoolInfo = useSelector((state) => state.schoolInfo);

//   const [activeList, setActiveList] = useState([]);
//   const [loading, setLoading] = useState(false);

//   /* =========================
//      FETCH ACTIVE ATTENDANCE
//   ========================= */
//   const fetchActive = async () => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${api_domain}/get_active_attendance.php?key=${api_key}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             school_id: schoolInfo.id,
//           }),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         setActiveList(data.attendance);
//       } else {
//         Swal.fire(
//           "Error",
//           data.error || "Failed to fetch active attendance",
//           "error"
//         );
//       }
//     } catch (err) {
//       Swal.fire("Error", "Network or server issue", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      AUTO REFRESH
//   ========================= */
//   useEffect(() => {
//     fetchActive();

//     const interval = setInterval(() => {
//       fetchActive();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);




//   /* =========================
//    CLOCK IN
// ========================= */

// const handleClockIn = async (attendanceId) => {
//   const confirm = await Swal.fire({
//     title: "Confirm Clock-in?",
//     text: "Are you sure you want to clock in?",
//     icon: "question",
//     showCancelButton: true,
//     confirmButtonText: "Yes, Clock In",
//     confirmButtonColor: "#0056b3",
//   });

//   if (!confirm.isConfirmed) return;

//   try {
//     const res = await fetch(`${api_domain}/clock_in.php?key=${api_key}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         attendance_id: attendanceId,
//         user_id: schoolInfo.id,
//         user_type: "admin",
//         school_id: schoolInfo.school_id || schoolInfo.id, // safer fix
//       }),
//     });

//     const data = await res.json();

//     /* =========================
//        SUCCESS
//     ========================= */
//     if (data.success) {
//       return Swal.fire("Success", data.message, "success");
//     }

//     /* =========================
//        ALREADY CLOCKED IN
//     ========================= */
//     if (data.error === "You have already clocked in") {
//       return Swal.fire({
//         title: "Already Clocked In",
//         text: data.error,
//         icon: "info",
//         confirmButtonColor: "#0056b3",
//       });
//     }

//     /* =========================
//        OTHER ERRORS
//     ========================= */
//     return Swal.fire({
//       title: "Cannot Clock In",
//       text: data.error || "Clock-in failed",
//       icon: "warning",
//       confirmButtonColor: "#e07b00",
//     });

//   } catch (err) {
//     return Swal.fire({
//       title: "Server Error",
//       text: err.message || "Could not clock in. Please try again.",
//       icon: "error",
//     });
//   }
// };

//   /* =========================
//      COURSE HELPER
//   ========================= */
//   const getCourseTitle = (courseId) => {
//     if (!courseId) return "—";
//     const course = (courses || []).find(
//       (c) => c.id === parseInt(courseId)
//     );
//     return course ? `${course.code} - ${course.title}` : "Unknown Course";
//   };

//   return (
//     <Container>
//       <h2 style={{ color: "#0056b3" }}>
//         Active Attendance Sheets
//       </h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : activeList.length === 0 ? (
//         <p>No active attendance sheets available.</p>
//       ) : (
//         activeList.map((item) => (
//           <Card key={item.id}>
//             <Title>
//               {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
//             </Title>

//             <div>
//               <strong>Type:</strong> {item.type}
//             </div>

//             {item.course_id && (
//               <div>
//                 <strong>Course:</strong>{" "}
//                 {getCourseTitle(item.course_id)}
//               </div>
//             )}

//             {item.description && (
//               <div>
//                 <strong>Description:</strong> {item.description}
//               </div>
//             )}

//             <div>
//               <strong>Created:</strong>{" "}
//               {new Date(item.created_at).toLocaleString()}
//             </div>

//             <Button onClick={() => handleClockIn(item.id)}>
//               Clock In
//             </Button>
//           </Card>
//         ))
//       )}
//     </Container>
//   );
// };

// export default ActiveAttendancePage;




import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../../components/Context";
import { useSelector } from "react-redux";
import { FaClipboardList, FaBook, FaClock, FaUserCheck } from "react-icons/fa";

/* ── THEME ── */
const C = {
  blue: "#0056b3",
  light: "#1a8fe3",
  sky: "#e8f2ff",
  bg: "#f2f6fb",
  white: "#ffffff",
  text: "#1a2540",
  muted: "#6b7a99",
  border: "rgba(0,86,179,0.1)",
};

/* ── ANIMATION ── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ── PAGE ── */
const Page = styled.div`
  background: ${C.bg};
  min-height: 100vh;
  padding: 10px;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  margin: auto;
`;

/* ── HEADER (PROFILE STYLE) ── */
const Header = styled.div`
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  padding: 12px;
  border-radius: 14px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 6px 20px rgba(0,86,179,0.2);
  margin-bottom: 12px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Sub = styled.p`
  margin: 0;
  font-size: 0.75rem;
  opacity: 0.9;
`;

/* ── GRID ── */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
`;

/* ── CARD ── */
const Card = styled.div`
  background: ${C.white};
  border-radius: 14px;
  padding: 12px;
  border: 1px solid ${C.border};
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  animation: ${fadeUp} 0.25s ease both;
  transition: 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0,86,179,0.12);
  }
`;

const CardTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  color: ${C.blue};
`;

const Badge = styled.span`
  font-size: 0.7rem;
  background: ${C.sky};
  color: ${C.blue};
  padding: 3px 8px;
  border-radius: 20px;
  font-weight: 600;
`;

const Meta = styled.p`
  margin: 4px 0;
  font-size: 0.78rem;
  color: ${C.muted};
  display: flex;
  align-items: center;
  gap: 6px;
`;

/* ── BUTTON ── */
const Button = styled.button`
  width: 100%;
  margin-top: 10px;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  border: none;
  color: white;
  padding: 8px;
  border-radius: 10px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

/* ─────────────────────────────── */

const ActiveAttendancePage = () => {
  const { api_domain, api_key, courses } = useContext(Context);
  const schoolInfo = useSelector((state) => state.schoolInfo);

  const [activeList, setActiveList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchActive = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${api_domain}/get_active_attendance.php?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ school_id: schoolInfo.id }),
        }
      );

      const data = await res.json();

      if (data.success) setActiveList(data.attendance);
      else Swal.fire("Error", data.error, "error");
    } catch {
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActive();
    const t = setInterval(fetchActive, 10000);
    return () => clearInterval(t);
  }, []);

  const handleClockIn = async (attendanceId) => {
    const confirm = await Swal.fire({
      title: "Clock in?",
      text: "Confirm attendance",
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await fetch(`${api_domain}/clock_in.php?key=${api_key}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        attendance_id: attendanceId,
        user_id: schoolInfo.id,
        user_type: "admin",
        school_id: schoolInfo.id,
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire("Success", data.message, "success");
    } else {
      Swal.fire("Info", data.error, "info");
    }
  };

  const getCourseTitle = (id) => {
    const c = (courses || []).find((x) => x.id === parseInt(id));
    return c ? `${c.code} - ${c.title}` : "—";
  };

  return (
    <Page>
      <Wrapper>

        {/* HEADER */}
        <Header>
          <div>
            <Title>
              <FaClipboardList /> Active Attendance
            </Title>
            <Sub>{activeList.length} active sheets</Sub>
          </div>
        </Header>

        {/* GRID */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <Grid>
            {activeList.map((item) => (
              <Card key={item.id}>
                <CardTop>
                  <CardTitle>{item.title}</CardTitle>
                  <Badge>{item.type}</Badge>
                </CardTop>

                <Meta>
                  <FaBook /> {getCourseTitle(item.course_id)}
                </Meta>

                <Meta>
                  <FaClock />{" "}
                  {new Date(item.created_at).toLocaleString()}
                </Meta>

                {item.description && (
                  <Meta>{item.description}</Meta>
                )}

                <Button onClick={() => handleClockIn(item.id)}>
                  <FaUserCheck /> Clock In
                </Button>
              </Card>
            ))}
          </Grid>
        )}
      </Wrapper>
    </Page>
  );
};

export default ActiveAttendancePage;