import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaUniversity,
  FaUserShield,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

const UniversityPortalsHome = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Overlay />

      <Content>
        <Header>
          <Title>
            ELEXDON <span>UNIVERSITY PORTAL</span>
          </Title>
          <Subtitle>
            Select a portal to continue
          </Subtitle>
        </Header>

        <Grid>
          {/* SCHOOL */}
          <Card onClick={() => navigate("/universitydashboard")}>
            <Icon>
              <FaUniversity />
            </Icon>
            <CardTitle>School Portal</CardTitle>
            <CardText>Manage institution, subscriptions & settings</CardText>
          </Card>

          {/* ADMIN */}
          <Card onClick={() => navigate("/adminlogin")}>
            <Icon>
              <FaUserShield />
            </Icon>
            <CardTitle>Admin Portal</CardTitle>
            <CardText>System administration dashboard</CardText>
          </Card>

          {/* STUDENT */}
          <Card onClick={() => navigate("/studentlogin")}>
            <Icon>
              <FaUserGraduate />
            </Icon>
            <CardTitle>Student Portal</CardTitle>
            <CardText>Access courses, results & learning materials</CardText>
          </Card>

          {/* LECTURER */}
          <Card onClick={() => navigate("/lecturerlogin")}>
            <Icon>
              <FaChalkboardTeacher />
            </Icon>
            <CardTitle>Lecturer Portal</CardTitle>
            <CardText>Manage classes, uploads & grading</CardText>
          </Card>
        </Grid>

        <Footer>
          © {new Date().getFullYear()} Elexdon Digital LMS
        </Footer>
      </Content>
    </Container>
  );
};

export default UniversityPortalsHome;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #f8fbff, #f3f4ff);
  position: relative;
  overflow: hidden;
`;

const Overlay = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #7b61ff33, transparent 70%);
  top: -200px;
  right: -200px;
  filter: blur(60px);
`;

const Content = styled.div`
  width: 100%;
  max-width: 1100px;
  padding: 20px;
  z-index: 2;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #111;

  span {
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 15px;
  margin-top: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 25px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  cursor: pointer;
  transition: 0.25s;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border: 1px solid rgba(123,97,255,0.08);

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    color: white;
  }

  &:hover h3,
  &:hover p {
    color: white;
  }
`;

const Icon = styled.div`
  font-size: 28px;
  color: #7b61ff;
`;

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 800;
  color: #111;
`;

const CardText = styled.p`
  font-size: 13px;
  color: #666;
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 12px;
  color: #888;
`;