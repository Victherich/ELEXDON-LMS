import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";

const ContactUs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is ELEXDON DIGITAL LMS?",
      a: "It is a full Learning Management System designed for universities, secondary schools, and primary schools to manage students, exams, results, and learning materials digitally.",
    },
    {
      q: "Do you offer installation and setup?",
      a: "Yes, we provide full onboarding, setup, and training for your institution after subscription.",
    },
    {
      q: "Can I upgrade my plan later?",
      a: "Yes, you can upgrade from primary → secondary → university plan at any time.",
    },
    {
      q: "Is there technical support?",
      a: "Yes, we offer priority support for all active subscribers via email and chat.",
    },
    {
      q: "Can the LMS work offline?",
      a: "Some features require internet, but we can provide hybrid/offline-ready deployments on request.",
    },
  ];

  return (
    <Section>
      <Container>

        {/* HEADER */}
        <Fade direction="up" triggerOnce>
          <Header>
            <h2>Contact Us</h2>
            <p>We’re here to help your institution get started with ELEXDON LMS</p>
          </Header>
        </Fade>

        {/* CONTACT GRID */}
        <Grid>

          {/* FORM */}
          <Fade direction="left" triggerOnce>
            <FormCard>
              <h3>Send a Message</h3>

              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <input type="text" placeholder="Institution Name" />
              <textarea placeholder="Your Message..." rows="5"></textarea>

              <button>Submit Message</button>
            </FormCard>
          </Fade>

          {/* INFO */}
          <Fade direction="right" triggerOnce>
            <InfoCard>
              <h3>Contact Information</h3>

              <InfoItem>
                📧 support@elexdonlms.com
              </InfoItem>

              <InfoItem>
                📞 +234 800 000 0000
              </InfoItem>

              <InfoItem>
                📍 Lagos, Nigeria
              </InfoItem>

              <InfoItem>
                🕒 Mon - Fri: 9AM - 5PM
              </InfoItem>

              <Note>
                We usually respond within 24 hours.
              </Note>
            </InfoCard>
          </Fade>

        </Grid>

        {/* FAQ */}
        <Fade direction="up" triggerOnce>
          <FAQSection>
            <h2>Frequently Asked Questions</h2>

            <FAQList>
              {faqs.map((item, index) => (
                <FAQItem key={index}>
                  <Question onClick={() => toggleFAQ(index)}>
                    {item.q}
                    <span>{openIndex === index ? "-" : "+"}</span>
                  </Question>

                  {openIndex === index && (
                    <Answer>{item.a}</Answer>
                  )}
                </FAQItem>
              ))}
            </FAQList>
          </FAQSection>
        </Fade>

      </Container>
    </Section>
  );
};

export default ContactUs;

/* ================= STYLES ================= */

const Section = styled.section`
  width: 100%;
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8fbff, #f3f4ff);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Header = styled.div`
  text-align: center;

  h2 {
    font-size: 34px;
    font-weight: 900;
    color: #111;
  }

  p {
    color: #666;
    font-size: 16px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
`;

const FormCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin-bottom: 10px;
  }

  input, textarea {
    padding: 12px;
    border-radius: 10px;
    border: 1px solid rgba(0,0,0,0.1);
    outline: none;
    font-size: 14px;
  }

  button {
    margin-top: 10px;
    padding: 12px;
    border: none;
    border-radius: 10px;
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    color: white;
    font-weight: 700;
    cursor: pointer;
  }
`;

const InfoCard = styled.div`
  background: white;
  padding: 25px;
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.06);

  display: flex;
  flex-direction: column;
  gap: 12px;

  h3 {
    margin-bottom: 10px;
  }
`;

const InfoItem = styled.div`
  font-size: 14px;
  color: #444;
  padding: 10px;
  border-radius: 10px;
  background: rgba(90, 120, 255, 0.05);
`;

const Note = styled.p`
  font-size: 12px;
  color: #777;
`;

const FAQSection = styled.div`
  text-align: center;

  h2 {
    font-size: 28px;
    margin-bottom: 20px;
  }
`;

const FAQList = styled.div`
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: 700;
  color: #222;
`;

const Answer = styled.div`
  margin-top: 10px;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
`;