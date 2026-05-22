import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate =useNavigate();

  return (
    <Section id="pricing">
      <Container>

        <Fade direction="up" triggerOnce>
          <Header>
            <h2>
              Simple Pricing For{" "}
              <span>ELEXDON DIGITAL LMS</span>
            </h2>
            <p>
              One powerful plan. No confusion. Designed for full university deployment.
            </p>
          </Header>
        </Fade>

        <Fade direction="up" triggerOnce>
          <Card>
            <Badge>Most Recommended</Badge>

            <PlanName>Annual Subscription</PlanName>

            <Price>
              NGN 400,000
              <span>/year</span>
            </Price>

            <Description>
              Full access to the entire ELEXDON DIGITAL LMS platform for your institution. Includes all modules for students, lecturers, and administrators.
            </Description>

            <Features>
              <li>Unlimited Students Management</li>
              <li>Lecturer & Admin Dashboards</li>
              <li>Admissions System</li>
              <li>CBT Examinations Platform</li>
              <li>Assignments & Quizzes Automation</li>
              <li>Auto Result Processing + PDF + QR Verification</li>
              <li>Video Lessons Hosting</li>
              <li>Attendance & Clock-in System</li>
              <li>Email & Forum System</li>
              <li>Security & Role-Based Access Control</li>
              <li>Free Updates for 1 Year</li>
              <li>Priority Support</li>
            </Features>

            <ButtonGroup>
              <PrimaryButton onClick={()=>navigate('/subscription')}>Start Subscription</PrimaryButton>
              <SecondaryButton>Request Demo</SecondaryButton>
            </ButtonGroup>

            <Note>
              No hidden fees • Cancel anytime after annual cycle • Full institution license
            </Note>

          </Card>
        </Fade>

      </Container>
    </Section>
  );
};

export default Pricing;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 10px;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );
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

const Card = styled.div`
  max-width: 700px;
  margin: auto;

  padding: 10px;

  border-radius: 16px;

  background: white;

  border: 1px solid rgba(120, 120, 120, 0.12);

  box-shadow: 0 10px 40px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Badge = styled.div`
  align-self: flex-start;

  padding: 6px 10px;

  border-radius: 100px;

  background: rgba(90, 120, 255, 0.1);

  color: #5a78ff;

  font-size: 12px;
  font-weight: 700;
`;

const PlanName = styled.h3`
  font-size: 18px;
  font-weight: 800;

  color: #222;
`;

const Price = styled.div`
  font-size: 40px;
  font-weight: 900;

  background: linear-gradient(
    135deg,
    #59a7ff,
    #7b61ff
  );

  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  span {
    font-size: 14px;
    color: #666;

    margin-left: 6px;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #555;

  line-height: 1.6;
`;

const Features = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;

  gap: 6px;

  padding: 0;

  li {
    font-size: 13px;
    color: #444;

    padding: 6px 10px;

    border-radius: 10px;

    background: rgba(90, 120, 255, 0.05);

    border: 1px solid rgba(90, 120, 255, 0.08);
  }
`;

const ButtonGroup = styled.div`
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  border: none;
  outline: none;

  padding: 10px;

  border-radius: 10px;

  background: linear-gradient(
    135deg,
    #59a7ff,
    #7b61ff
  );

  color: white;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  border: 1px solid rgba(90, 120, 255, 0.2);

  padding: 10px;

  border-radius: 10px;

  background: white;

  color: #5a78ff;

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    background: rgba(90, 120, 255, 0.06);
  }
`;

const Note = styled.p`
  font-size: 12px;
  color: #777;

  text-align: center;
`;