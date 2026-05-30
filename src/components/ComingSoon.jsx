import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const ComingSoon = () => {
  return (
    <Section>
      <Container>
        <Fade direction="up" triggerOnce>
          <Card>
            <Badge>🚀 Under Development</Badge>

            <Title>Something Big is Coming Soon</Title>

            <Subtitle>
              We’re building a powerful update to <span>ELEXDON DIGITAL LMS</span>.
              This feature/page is currently under construction.
            </Subtitle>

            <Description>
              Our team is working hard to bring you a faster, smarter, and more
              powerful learning experience for universities, secondary schools,
              and primary schools.
            </Description>

            <CountdownBox>
              <Item>
                <Number>--</Number>
                <Label>Days</Label>
              </Item>
              <Item>
                <Number>--</Number>
                <Label>Hours</Label>
              </Item>
              <Item>
                <Number>--</Number>
                <Label>Minutes</Label>
              </Item>
              <Item>
                <Number>--</Number>
                <Label>Seconds</Label>
              </Item>
            </CountdownBox>

            <ButtonGroup>
              <PrimaryButton onClick={() => window.history.back()}>
                Go Back
              </PrimaryButton>

              <SecondaryButton onClick={() => window.location.href = "/"}>
                Home
              </SecondaryButton>
            </ButtonGroup>

            <Note>
              Stay tuned — we’ll launch soon with exciting new features.
            </Note>
          </Card>
        </Fade>
      </Container>
    </Section>
  );
};

export default ComingSoon;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: linear-gradient(135deg, #f8fbff, #f3f4ff);
`;

const Container = styled.div`
  max-width: 600px;
  width: 100%;
`;

const Card = styled.div`
  background: white;

  padding: 40px 25px;

  border-radius: 20px;

  text-align: center;

  border: 1px solid rgba(120, 120, 120, 0.12);

  box-shadow: 0 10px 40px rgba(0,0,0,0.08);

  display: flex;
  flex-direction: column;

  gap: 18px;
`;

const Badge = styled.div`
  display: inline-block;

  padding: 6px 12px;

  border-radius: 100px;

  background: rgba(90, 120, 255, 0.1);

  color: #5a78ff;

  font-size: 12px;
  font-weight: 700;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 900;

  color: #111;
`;

const Subtitle = styled.p`
  font-size: 16px;
  color: #555;

  span {
    font-weight: 800;
    color: #5a78ff;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

const CountdownBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;
`;

const Item = styled.div`
  flex: 1;
`;

const Number = styled.div`
  font-size: 26px;
  font-weight: 900;
  color: #5a78ff;
`;

const Label = styled.div`
  font-size: 12px;
  color: #777;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled.button`
  border: none;

  padding: 12px 18px;

  border-radius: 10px;

  background: linear-gradient(135deg, #59a7ff, #7b61ff);

  color: white;

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

  font-weight: 700;

  cursor: pointer;

  &:hover {
    background: rgba(90, 120, 255, 0.06);
  }
`;

const Note = styled.p`
  font-size: 12px;
  color: #777;
`;