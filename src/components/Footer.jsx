import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import {  useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate =useNavigate()
  return (
    <Section>
      <Container>

        <Fade direction="up" triggerOnce>
          <Top>

            <Brand>
              <h2>
                ELEXDON <span>DIGITAL LMS</span>
              </h2>
              <p>
                A complete university management system for admissions, learning,
                examinations, and academic automation.
              </p>
            </Brand>

            <Links>
              <Column>
                <h4>Platform</h4>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="#about">About</a>
                <a href="#testimonials">Testimonials</a>
              </Column>

              {/* <Column>
                <h4>Modules</h4>
                <a href="#features">LMS</a>
                <a href="#features">CBT Exams</a>
                <a href="#features">Admissions</a>
                <a href="#features">Results System</a>
              </Column> */}

              <Column>
                <h4>Support</h4>
                <a onClick={()=>navigate('/contact')}>Contact Us</a>
                {/* <a href="#faq">FAQ</a>
                <a href="#contact">Help Center</a>
                <a href="#contact">Documentation</a> */}
              </Column>
            </Links>

          </Top>
        </Fade>

        <Divider />

        <Bottom>
          <p>© {new Date().getFullYear()} ELEXDON DIGITAL LMS. All rights reserved.</p>

          <SmallLinks>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            {/* <a href="#security">Security</a> */}
          </SmallLinks>
        </Bottom>

      </Container>
    </Section>
  );
};

export default Footer;

/* ================= STYLES ================= */

const Section = styled.footer`
  width: 100%;
  padding: 10px;

  background: #ffffff;
  border-top: 1px solid rgba(120, 120, 120, 0.1);
`;

const Container = styled.div`
  max-width: 1400px;
  margin: auto;

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Top = styled.div`
  display: grid;

  grid-template-columns: 1.5fr 2fr;

  gap: 10px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  h2 {
    font-size: 20px;
    font-weight: 900;

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

    line-height: 1.6;
  }
`;

const Links = styled.div`
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 10px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;

  h4 {
    font-size: 14px;
    font-weight: 800;

    color: #222;
  }

  a {
    text-decoration: none;

    font-size: 1rem;
cursor:pointer;
    color: #555;

    transition: 0.3s;

    &:hover {
      color: #5a78ff;
    }
  }
`;

const Divider = styled.div`
  height: 1px;

  background: rgba(120, 120, 120, 0.15);
`;

const Bottom = styled.div`
  display: flex;

  justify-content: space-between;

  align-items: center;

  flex-wrap: wrap;

  gap: 10px;

  p {
    font-size: 12px;
    color: #666;
  }
`;

const SmallLinks = styled.div`
  display: flex;

  gap: 10px;

  a {
    font-size: 12px;
cursor:pointer;
    color: #666;

    text-decoration: none;

    transition: 0.3s;

    &:hover {
      color: #5a78ff;
    }
  }
`;