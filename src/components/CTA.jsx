import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const CTA = () => {
const navigate = useNavigate();


  return (
    <Section>
      <Container>

        <Fade direction="up" triggerOnce>
          <Card>

            <Badge>Ready to Transform Your Institution?</Badge>

            <Title>
              Start Using <span>ELEXDON DIGITAL LMS</span> Today
            </Title>

            <Description>
              Deploy a complete university management system for admissions, exams, assignments, grading, and student records — all in one platform.
            </Description>

            <ButtonGroup>
              <PrimaryButton onClick={()=>navigate('/contact')}>Request Demo</PrimaryButton>
              <SecondaryButton onClick={()=>navigate('/contact')}>Contact Sales</SecondaryButton>
            </ButtonGroup>

            <Note>
              Setup takes less than 24 hours • Full onboarding support included
            </Note>

          </Card>
        </Fade>

      </Container>
    </Section>
  );
};

export default CTA;

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
  justify-content: center;
`;

const Card = styled.div`
  width: 100%;
  max-width: 900px;

  padding: 10px;

  border-radius: 18px;

  background: white;

  border: 1px solid rgba(90, 120, 255, 0.12);

  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);

  display: flex;
  flex-direction: column;

  align-items: center;

  gap: 10px;

  text-align: center;
`;

const Badge = styled.div`
  padding: 6px 10px;

  border-radius: 100px;

  background: rgba(90, 120, 255, 0.1);

  color: #5a78ff;

  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.h2`
  font-size: 30px;
  font-weight: 900;

  color: #111;

  span {
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #555;

  max-width: 650px;

  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;

  gap: 10px;

  flex-wrap: wrap;

  justify-content: center;
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

  box-shadow: 0 8px 25px rgba(90, 120, 255, 0.2);

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
`;