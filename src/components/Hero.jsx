import React from "react";
import styled from "styled-components";
import {
  Fade,
  Slide,
  Zoom,
} from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Hero>
      <Container>
        {/* LEFT CONTENT */}
        <Left>

          <Fade direction="up" triggerOnce>
            <Badge>
              🚀 Smart Academic Management Platform
            </Badge>
          </Fade>

          <Slide direction="up" triggerOnce>
            <Title>
              Transform Education With{" "}
              <span>ELEXDON DIGITAL LMS</span>
            </Title>
          </Slide>

          <Fade delay={200} triggerOnce>
            <Description>
              Manage admissions, examinations,
              assignments, quizzes, assessments,
              grading, and automatic result
              processing from one powerful platform
              built for modern schools and universities.
            </Description>
          </Fade>

          <Fade delay={300} triggerOnce>
            <ButtonWrapper>
              <PrimaryButton onClick={()=>navigate('/pricing')}>
                Subscribe Now
              </PrimaryButton>

              <SecondaryButton>
                Explore Platform
              </SecondaryButton>
            </ButtonWrapper>
          </Fade>

          <Fade delay={400} triggerOnce>
            <Stats>

              <StatCard>
                <h2>150+</h2>
                <p>Institutions</p>
              </StatCard>

              <StatCard>
                <h2>1M+</h2>
                <p>Students</p>
              </StatCard>

              <StatCard>
                <h2>99.9%</h2>
                <p>Uptime</p>
              </StatCard>

            </Stats>
          </Fade>

        </Left>

        {/* RIGHT CONTENT */}
        <Right>

          <Zoom triggerOnce>
            <ImageWrapper>

              <MainImage
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
                alt="University LMS"
              />

              <FloatingCardTop>
                <span>📊</span>

                <div>
                  <h4>Automatic Results</h4>
                  <p>Computed Instantly</p>
                </div>
              </FloatingCardTop>

              <FloatingCardBottom>
                <span>📝</span>

                <div>
                  <h4>CBT Exams</h4>
                  <p>Secure Assessments</p>
                </div>
              </FloatingCardBottom>

            </ImageWrapper>
          </Zoom>

        </Right>
      </Container>
    </Hero>
  );
};

export default HeroSection;

/* ================= STYLES ================= */

const Hero = styled.section`
  width: 100%;
  min-height: 100vh;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  display: flex;
  align-items: center;

  padding: 70px 10px 10px 10px;

  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;

  margin: auto;

  display: grid;
  grid-template-columns: repeat(2, 1fr);

  align-items: center;

  gap: 10px;

  @media (max-width: 950px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  @media (max-width: 950px) {
    text-align: center;
    align-items: center;
  }
`;

const Badge = styled.div`
  width: fit-content;

  padding: 10px;

  border-radius: 100px;

  background: rgba(90, 120, 255, 0.08);

  color: #5a78ff;

  font-size: 13px;
  font-weight: 700;

  border: 1px solid rgba(90, 120, 255, 0.1);
`;

const Title = styled.h1`
  font-size: 60px;
  line-height: 1.1;

  font-weight: 800;

  color: #222;

  span {
    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  @media (max-width: 950px) {
    font-size: 45px;
  }

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;

const Description = styled.p`
  max-width: 600px;

  color: #666;

  font-size: 1.1rem;
  line-height: 1.7;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  flex-wrap: wrap;

  @media (max-width: 950px) {
    justify-content: center;
  }
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
  border: 1px solid rgba(90, 120, 255, 0.12);

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

const Stats = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  flex-wrap: wrap;

  @media (max-width: 950px) {
    justify-content: center;
  }
`;

const StatCard = styled.div`
  min-width: 120px;

  padding: 10px;

  border-radius: 14px;

  background: white;

  border: 1px solid rgba(120, 120, 120, 0.08);

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.04);

  h2 {
    font-size: 22px;
    font-weight: 800;

    background: linear-gradient(
      135deg,
      #59a7ff,
      #7b61ff
    );

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 13px;
    color: #666;
  }
`;

const Right = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
`;

const ImageWrapper = styled.div`
  position: relative;

  width: 100%;
  max-width: 600px;
`;

const MainImage = styled.img`
  width: 100%;

  border-radius: 25px;

  object-fit: cover;

  box-shadow: 0 20px 50px rgba(90, 120, 255, 0.12);
`;

const FloatingCard = styled.div`
  position: absolute;

  display: flex;
  align-items: center;

  gap: 10px;

  background: rgba(255, 255, 255, 0.95);

  backdrop-filter: blur(10px);

  padding: 10px;

  border-radius: 16px;

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  border: 1px solid rgba(120, 120, 120, 0.08);

  span {
    font-size: 24px;
  }

  h4 {
    font-size: 13px;
    color: #222;
  }

  p {
    font-size: 12px;
    color: #666;
  }

  @media (max-width: 950px) {
    display: none;
  }
`;

const FloatingCardTop = styled(FloatingCard)`
  top: 20px;
  left: -40px;
`;

const FloatingCardBottom = styled(FloatingCard)`
  bottom: 20px;
  right: -40px;
`;