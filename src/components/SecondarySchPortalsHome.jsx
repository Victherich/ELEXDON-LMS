import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaSchool,
  FaUserShield,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Swal from "sweetalert2";

const SecondarySchPortalsHome = () => {
  const navigate = useNavigate();

  const alert=()=>{
  Swal.fire({text:"Coming soon...", timer:2000})
  }

  return (
    <Container>
      <BackgroundGlow />

      <Content>
        <Header>
          <Title>
            SECONDARY SCHOOL <span>PORTAL</span>
          </Title>
          <Subtitle>
            Select your role to continue
          </Subtitle>
        </Header>

        <Grid>
          {/* SCHOOL ADMIN */}
          <Card onClick={alert}>
            <Icon><FaSchool /></Icon>
            <CardTitle>School Portal</CardTitle>
            <CardText>School registration, settings & subscription</CardText>
          </Card>

          {/* ADMIN */}
          <Card onClick={alert}>
            <Icon><FaUserShield /></Icon>
            <CardTitle>Administrator</CardTitle>
            <CardText>System management & control panel</CardText>
          </Card>

          {/* TEACHER */}
          <Card onClick={alert}>
            <Icon><FaChalkboardTeacher /></Icon>
            <CardTitle>Teacher Portal</CardTitle>
            <CardText>Upload notes, assignments & manage classes</CardText>
          </Card>

          {/* STUDENT */}
          <Card onClick={alert}>
            <Icon><FaUserGraduate /></Icon>
            <CardTitle>Student Portal</CardTitle>
            <CardText>View results, lessons & assignments</CardText>
          </Card>
        </Grid>

        <Footer>
          © {new Date().getFullYear()} Secondary School LMS
        </Footer>
      </Content>
    </Container>
  );
};

export default SecondarySchPortalsHome;



const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(135deg, #f7faff, #f2f4ff);
  position: relative;
  overflow: hidden;
`;

const BackgroundGlow = styled.div`
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #4a6bff33, transparent 70%);
  top: -150px;
  right: -150px;
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
  font-size: 32px;
  font-weight: 900;
  color: #111;

  span {
    background: linear-gradient(135deg, #4a6bff, #7b61ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 14px;
  margin-top: 8px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background: rgba(255,255,255,0.95);
  border-radius: 18px;
  padding: 22px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  cursor: pointer;
  transition: 0.25s;

  display: flex;
  flex-direction: column;
  gap: 10px;

  border: 1px solid rgba(74,107,255,0.1);

  &:hover {
    transform: translateY(-5px);
    background: linear-gradient(135deg, #4a6bff, #7b61ff);
    color: white;
  }

  &:hover h3,
  &:hover p {
    color: white;
  }
`;

const Icon = styled.div`
  font-size: 26px;
  color: #4a6bff;
`;

const CardTitle = styled.h3`
  font-size: 17px;
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