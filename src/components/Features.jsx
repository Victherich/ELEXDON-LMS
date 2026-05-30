import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const Features = () => {
  return (
    <Section id="features">
      <Container>

        <Fade direction="up" triggerOnce>
          <Header>
            <h2>
              Powerful Roles Built For{" "}
              <span>ELEXDON DIGITAL LMS</span>
            </h2>
            <p>
              Everything schools and universities need in one unified academic ecosystem
            </p>
          </Header>
        </Fade>

        {/* STUDENT */}
        <Fade direction="up" triggerOnce>
          <RoleCard>
            <RoleTitle>🎓 Student Dashboard</RoleTitle>

            <Grid>
              <Feature>Enrollment</Feature>
              <Feature>My Result (PDF + QR Verification)</Feature>
              <Feature>Assignments / Quizzes / Exams / Notes</Feature>
              <Feature>Video Lessons</Feature>
              <Feature>Asignmnets & Exam submissions</Feature>
              <Feature>Online Meetings / Classes</Feature>
              <Feature>Clock-in Attendance</Feature>
              <Feature>Email Center</Feature>
              <Feature>Forum</Feature>
              
            </Grid>
          </RoleCard>
        </Fade>

        {/* LECTURER */}
        <Fade direction="up" triggerOnce>
          <RoleCard>
            <RoleTitle>👨‍🏫 Lecturer / Teacher Dashboard</RoleTitle>

            <Grid>
              <Feature>Course Enrollment</Feature>
              <Feature>Post Assignments / Quizzes / Notes / Exams</Feature>
              <Feature>Video Lessons Managements</Feature>
              <Feature>Student Submissions (Mark & Score)</Feature>
              <Feature>Online Classes / Meetings</Feature>
              <Feature>Clock-in Attendance</Feature>
              <Feature>Email Center</Feature>
              <Feature>Forum</Feature>
              
            </Grid>
          </RoleCard>
        </Fade>

        {/* ADMIN */}
        <Fade direction="up" triggerOnce>
          <RoleCard>
            <RoleTitle>🛠️ Admin Dashboard</RoleTitle>

            <Grid>
              <Feature>Admins Management</Feature>
              <Feature>Lecturers Control (Suspend / Approve)</Feature>
              <Feature>Students Management (Admission / Graduation)</Feature>
              <Feature>Access Codes System</Feature>
              <Feature>Attendance Management</Feature>
              <Feature>Clock-in Monitoring</Feature>
              <Feature>Email Center</Feature>
              <Feature>Forum Control</Feature>
              <Feature>Add Admins</Feature>
           
            </Grid>
          </RoleCard>
        </Fade>

      </Container>
    </Section>
  );
};

export default Features;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 10px;

  background: #ffffff;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: auto;

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Header = styled.div`
  text-align: center;

  h2 {
    font-size: 32px;
    font-weight: 800;

    color: #111;
  }

  span {
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1.1rem;
    color: #666;
  }
`;

const RoleCard = styled.div`
  padding: 10px;

  border-radius: 14px;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  border: 1px solid rgba(90, 120, 255, 0.1);

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);
`;

const RoleTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;

  margin-bottom: 10px;

  color: #222;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  gap: 10px;
`;

const Feature = styled.div`
  padding: 10px;

  border-radius: 10px;

  background: white;

  border: 1px solid rgba(120, 120, 120, 0.1);

  font-size: 13px;
  font-weight: 600;

  color: #444;

  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);

    background: rgba(90, 120, 255, 0.05);

    color: #5a78ff;
  }
`;