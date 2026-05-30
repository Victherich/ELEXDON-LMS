import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const PricingPage = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      badge: "Best For Universities",
      name: "University Plan",
      price: "NGN 400,000",
      route: "/universityregistration",
      description:
        "Complete university management system with advanced academic, admissions, and examination modules.",
      features: [
        "Unlimited Students Management",
        "Lecturer & Admin Dashboards",
        "Admissions System",
        "CBT Examinations Platform",
        "Assignments & Quizzes Automation",
        "Auto Result Processing + PDF + QR Verification",
        "Video Lessons Hosting",
        "Attendance & Clock-in System",
        "Email & Forum System",
        "Security & Role-Based Access Control",
        "Free Updates for 1 Year",
        "Priority Support",
      ],
    },

    {
      badge: "Best For Secondary Schools",
      name: "Secondary School Plan",
      price: "NGN 250,000",
      route: "/comingsoon",
      description:
        "Smart school management solution designed for secondary schools with digital learning and CBT support.",
      features: [
        "Student & Teacher Management",
        "Online Classes & Video Lessons",
        "CBT Test & Examination System",
        "Assignments & Homework Management",
        "Attendance Monitoring",
        "Result & Report Card Generation",
        "Parent Communication Portal",
        "School Fees Tracking",
        "Role-Based Access Control",
        "Free Updates for 1 Year",
        "Priority Support",
      ],
    },

    {
      badge: "Best For Primary Schools",
      name: "Primary School Plan",
      price: "NGN 150,000",
      route: "/comingsoon",
      description:
        "Simple and easy-to-use LMS platform for primary schools focused on learning, attendance, and communication.",
      features: [
        "Pupil Management System",
        "Teacher Dashboard",
        "Digital Classroom",
        "Assignments & Activities",
        "Attendance Tracking",
        "Parent Communication System",
        "Basic Result Processing",
        "Learning Materials Upload",
        "Secure Access Control",
        "Free Updates for 1 Year",
        "Support Included",
      ],
    },
  ];

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
              Flexible pricing plans designed for universities,
              secondary schools, and primary schools.
            </p>
          </Header>
        </Fade>

        <CardsWrapper>
          {pricingPlans.map((plan, index) => (
            <Fade direction="up" triggerOnce key={index}>
              <Card>
                <Badge>{plan.badge}</Badge>

                <PlanName>{plan.name}</PlanName>

                <Price>
                  {plan.price}
                  <span>/year</span>
                </Price>

                <Description>
                  {plan.description}
                </Description>

                <Features>
                  {plan.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </Features>

                <ButtonGroup>
                  <PrimaryButton
                    onClick={() => navigate(plan.route)}
                  >
                    Start Subscription
                  </PrimaryButton>

                  <SecondaryButton onClick={()=>navigate('/contact')}>
                    Request Demo
                  </SecondaryButton>
                </ButtonGroup>

                <Note>
                  No hidden fees • Annual billing • Full school license
                </Note>
              </Card>
            </Fade>
          ))}
        </CardsWrapper>
      </Container>
    </Section>
  );
};

export default PricingPage;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 100px 20px;

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

  gap: 40px;
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
    margin-top: 10px;
  }
`;

const CardsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
`;

const Card = styled.div`
  padding: 25px;

  border-radius: 20px;

  background: white;

  border: 1px solid rgba(120, 120, 120, 0.12);

  box-shadow: 0 10px 40px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;

  gap: 18px;

  transition: 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const Badge = styled.div`
  align-self: flex-start;

  padding: 6px 12px;

  border-radius: 100px;

  background: rgba(90, 120, 255, 0.1);

  color: #5a78ff;

  font-size: 12px;
  font-weight: 700;
`;

const PlanName = styled.h3`
  font-size: 22px;
  font-weight: 800;

  color: #222;
`;

const Price = styled.div`
  font-size: 38px;
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
  font-size: 15px;
  color: #555;

  line-height: 1.7;
`;

const Features = styled.ul`
  list-style: none;

  display: flex;
  flex-direction: column;

  gap: 8px;

  padding: 0;

  li {
    font-size: 13px;
    color: #444;

    padding: 8px 12px;

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

  padding: 12px 18px;

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

  padding: 12px 18px;

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