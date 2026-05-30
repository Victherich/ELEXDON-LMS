import React from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const Testimonials = () => {
  return (
    <Section id="testimonials">
      <Container>

        <Fade direction="up" triggerOnce>
          <Header>
            <h2>
              What Institutions Say About{" "}
              <span>ELEXDON DIGITAL LMS</span>
            </h2>
            <p>
              Trusted by lecturers, students, and administrators across modern institutions.
            </p>
          </Header>
        </Fade>

        <Grid>

          <Fade direction="up" triggerOnce>
            <Card>
              <Top>
                <Avatar
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
                  alt="user"
                />
                <Info>
                  <h4>Dr. Michael Adeyemi</h4>
                  <span>Lecturer • Computer Science</span>
                </Info>
              </Top>

              <Text>
                “ELEXDON DIGITAL LMS has completely changed how I manage my students. Posting assignments, grading submissions, and tracking performance is now seamless.”
              </Text>
            </Card>
          </Fade>

          <Fade direction="up" triggerOnce>
            <Card>
              <Top>
                <Avatar
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  alt="user"
                />
                <Info>
                  <h4>Amaka Johnson</h4>
                  <span>Student • Engineering</span>
                </Info>
              </Top>

              <Text>
                “I love how I can access my lecture notes, submit assignments, and even check my results with QR verification. It feels very modern and easy to use.”
              </Text>
            </Card>
          </Fade>

          <Fade direction="up" triggerOnce>
            <Card>
              <Top>
                <Avatar
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop"
                  alt="user"
                />
                <Info>
                  <h4>Prof. Samuel Okoro</h4>
                  <span>Dean • Faculty of Science</span>
                </Info>
              </Top>

              <Text>
                “The automation of results and attendance tracking has reduced administrative stress significantly. This is the future of university management systems.”
              </Text>
            </Card>
          </Fade>

        </Grid>

      </Container>
    </Section>
  );
};

export default Testimonials;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 10px;

  background: #ffffff;
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

const Grid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));

  gap: 10px;
`;

const Card = styled.div`
  padding: 10px;

  border-radius: 14px;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  border: 1px solid rgba(90, 120, 255, 0.1);

  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.03);

  display: flex;
  flex-direction: column;

  gap: 10px;
`;

const Top = styled.div`
  display: flex;

  align-items: center;

  gap: 10px;
`;

const Avatar = styled.img`
  width: 45px;
  height: 45px;

  border-radius: 50%;

  object-fit: cover;

  border: 2px solid rgba(90, 120, 255, 0.2);
`;

const Info = styled.div`
  h4 {
    font-size: 14px;
    font-weight: 800;

    color: #222;
  }

  span {
    font-size: 12px;
    color: #666;
  }
`;

const Text = styled.p`
  font-size: 13px;
  color: #555;

  line-height: 1.6;
`;