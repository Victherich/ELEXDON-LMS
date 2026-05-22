import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const AboutUsBriefComponent = () => {
  return (
    <Section id="about">
      <Container>

        <Fade direction="up" triggerOnce>
          <Header>
            <h2>
              About <span>ELEXDON DIGITAL LMS</span>
            </h2>
            <p>
              A unified academic platform built to modernize how universities manage learning, examinations, admissions, and student records.
            </p>
          </Header>
        </Fade>

        <Content>

          <Fade direction="left" triggerOnce>
            <Left>
              <h3>Built for Modern Universities</h3>

              <p>
                ELEXDON DIGITAL LMS is a complete academic management system that combines LMS, CBT examinations, admissions, grading, attendance tracking, and communication tools into one powerful platform.
              </p>

              <p>
                It eliminates fragmented systems by centralizing all academic operations into a single intelligent dashboard for students, lecturers, and administrators.
              </p>

              <Stats>
                <Stat>
                  <h4>3+</h4>
                  <p>User Roles</p>
                </Stat>

                <Stat>
                  <h4>10+</h4>
                  <p>Core Modules</p>
                </Stat>

                <Stat>
                  <h4>100%</h4>
                  <p>Unified System</p>
                </Stat>
              </Stats>
            </Left>
          </Fade>

          <Fade direction="right" triggerOnce>
            <Right>
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop"
                alt="About ELEXDON LMS"
              />
            </Right>
          </Fade>

        </Content>

      </Container>
    </Section>
  );
};

export default AboutUsBriefComponent;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 10px;

  background: linear-gradient(
    135deg,
    #ffffff,
    #f7f9ff
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

    max-width: 700px;
    margin: auto;
  }
`;

const Content = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 10px;

  align-items: center;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  h3 {
    font-size: 20px;
    font-weight: 800;

    color: #222;
  }

  p {
    font-size: 1.1rem;
    color: #555;

    line-height: 1.6;
  }
`;

const Stats = styled.div`
  display: flex;

  gap: 10px;

  flex-wrap: wrap;
`;

const Stat = styled.div`
  flex: 1;

  min-width: 120px;

  padding: 10px;

  border-radius: 12px;

  background: white;

  border: 1px solid rgba(120, 120, 120, 0.1);

  text-align: center;

  h4 {
    font-size: 20px;
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
    font-size: 12px;
    color: #666;
  }
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
`;

const Image = styled.img`
  width: 100%;

  max-width: 500px;

  border-radius: 16px;

  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
`;