import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {
  FaSchool,
  FaUserShield,
  FaChalkboardTeacher,
  FaChild,
} from "react-icons/fa";
import Swal from "sweetalert2";

const PrimarySchoolPortalsHome = () => {

  const navigate = useNavigate();

    const alert=()=>{
    Swal.fire({text:"Coming soon...", timer:2000})
    }

  return (
    <Container>

      <GlowOne />
      <GlowTwo />

      <Content>

        <Header>

          <Title>
            PRIMARY SCHOOL <span>PORTAL</span>
          </Title>

          <Subtitle>
            Welcome to the Digital Learning Management System
          </Subtitle>

        </Header>

        <Grid>

          {/* SCHOOL */}

          <Card
            onClick={alert}
          >

            <Icon>
              <FaSchool />
            </Icon>

            <CardTitle>
              School Portal
            </CardTitle>

            <CardText>
              School management, subscription & setup
            </CardText>

          </Card>

          {/* ADMIN */}

          <Card
            onClick={alert}
          >

            <Icon>
              <FaUserShield />
            </Icon>

            <CardTitle>
              Admin Portal
            </CardTitle>

            <CardText>
              Manage the system dashboard and controls
            </CardText>

          </Card>

          {/* TEACHERS */}

          <Card
            onClick={alert}
          >

            <Icon>
              <FaChalkboardTeacher />
            </Icon>

            <CardTitle>
              Teacher Portal
            </CardTitle>

            <CardText>
              Manage classes, pupils, lessons & assignments
            </CardText>

          </Card>

          {/* PUPILS */}

          <Card
            onClick={alert}
          >

            <Icon>
              <FaChild />
            </Icon>

            <CardTitle>
              Pupil Portal
            </CardTitle>

            <CardText>
              Access lessons, homework & class activities
            </CardText>

          </Card>

        </Grid>

        <Footer>
          © {new Date().getFullYear()} Primary School LMS
        </Footer>

      </Content>

    </Container>
  );
};

export default PrimarySchoolPortalsHome;

/* =========================
   STYLES
========================= */

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  position: relative;
  overflow: hidden;

  padding: 20px;
`;

const GlowOne = styled.div`
  position: absolute;

  width: 400px;
  height: 400px;

  border-radius: 50%;

  background: rgba(91, 167, 255, 0.18);

  top: -120px;
  left: -120px;

  filter: blur(80px);
`;

const GlowTwo = styled.div`
  position: absolute;

  width: 400px;
  height: 400px;

  border-radius: 50%;

  background: rgba(123, 97, 255, 0.18);

  bottom: -120px;
  right: -120px;

  filter: blur(80px);
`;

const Content = styled.div`
  width: 100%;
  max-width: 1100px;

  position: relative;
  z-index: 10;
`;

const Header = styled.div`
  text-align: center;

  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 38px;
  font-weight: 900;

  color: #111;

  margin-bottom: 10px;

  span {
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media(max-width:768px){
    font-size: 28px;
  }
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: #666;
`;

const Grid = styled.div`
  display: grid;

  grid-template-columns:
    repeat(auto-fit, minmax(230px, 1fr));

  gap: 20px;
`;

const Card = styled.div`
  background: rgba(255,255,255,0.95);

  border-radius: 24px;

  padding: 25px;

  box-shadow:
    0 10px 40px rgba(0,0,0,0.06);

  border: 1px solid rgba(123,97,255,0.08);

  cursor: pointer;

  transition: 0.3s;

  display: flex;
  flex-direction: column;

  gap: 15px;

  &:hover {
    transform: translateY(-6px);

    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    color: white;
  }

  &:hover h3,
  &:hover p,
  &:hover div {
    color: white;
  }
`;

const Icon = styled.div`
  width: 65px;
  height: 65px;

  border-radius: 18px;

  background: rgba(123,97,255,0.08);

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 28px;

  color: #7b61ff;
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 800;

  color: #111;
`;

const CardText = styled.p`
  font-size: 14px;
  line-height: 1.5;

  color: #666;
`;

const Footer = styled.div`
  margin-top: 40px;

  text-align: center;

  font-size: 13px;

  color: #777;
`;