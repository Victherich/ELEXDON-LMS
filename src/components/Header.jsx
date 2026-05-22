import React, { useState } from "react";
import styled from "styled-components";
import { Fade } from "react-awesome-reveal";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from '../Images/logo.png'

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar>
      <Container>
        <Fade direction="down" triggerOnce>
          <Logo onClick={()=>navigate('/')}>
            <img src={logo} alt="logo"/>
            ELEXDON <span>DIGITAL LMS</span>
          </Logo>
        </Fade>

        <DesktopNav>
          <Fade cascade damping={0.1} triggerOnce>
            <NavLinks>
              <a onClick={()=>navigate('/')}>Home</a>
              <a href="#about">About</a>
              <a href="#features">Features</a>
              
              <a href="#pricing">Pricing</a>
              
              <a href="#contact">Contact</a>
            </NavLinks>
          </Fade>
        </DesktopNav>

        <Fade direction="down" triggerOnce>
          <ButtonGroup>
            <LoginButton>Login</LoginButton>

            <PrimaryButton  onClick={()=>navigate('/pricing')}>
              Subscribe Now
            </PrimaryButton>
          </ButtonGroup>
        </Fade>

        <MobileMenuButton
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </MobileMenuButton>
      </Container>

      {mobileMenu && (
        <MobileMenu>
    
              <a onClick={()=>navigate('/')}>Home</a>
              <a href="#about">About</a>
              <a href="#features">Features</a>
              
              <a href="#pricing">Pricing</a>
              
              <a href="#contact">Contact</a>
    

          <MobileButtons>
            <LoginButton>Login</LoginButton>

            <PrimaryButton onClick={()=>navigate('/pricing')}>
              Subscribe Now
            </PrimaryButton>
          </MobileButtons>
        </MobileMenu>
      )}
    </Navbar>
  );
};

export default Header;

/* ========================= STYLES ========================= */

const Navbar = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  background: rgba(255, 255, 255, 0.92);

  backdrop-filter: blur(20px);

  border-bottom: 1px solid rgba(120, 120, 120, 0.1);
`;

const Container = styled.div`
  width: 100%;
  max-width: 1400px;

  margin: auto;

  padding: 10px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 10px;
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 800;

  cursor: pointer;

  color: #222;

  letter-spacing: 0.5px;
  display:flex;
  justify-content:center;align-items:center;
  gap:10px;
  img{
  width:40px;
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

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

const DesktopNav = styled.nav`
  @media (max-width: 950px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  a {
    text-decoration: none;
    cursor:pointer;

    color: #555;

    font-size: 1.1rem;
    font-weight: 600;

    padding: 6px 10px;

    border-radius: 8px;

    transition: 0.3s;

    &:hover {
      background: rgba(90, 120, 255, 0.08);

      color: #5a78ff;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;

  gap: 10px;

  @media (max-width: 950px) {
    display: none;
  }
`;

const LoginButton = styled.button`
  border: none;

  background: transparent;

  color: #555;

  font-size: 1.1rem;
  font-weight: 700;

  cursor: pointer;

  transition: 0.3s;

  &:hover {
    color: #7b61ff;
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

  box-shadow: 0 5px 20px rgba(90, 120, 255, 0.2);

  &:hover {
    transform: translateY(-2px);

    box-shadow: 0 8px 25px rgba(90, 120, 255, 0.3);
  }
`;

const MobileMenuButton = styled.button`
  display: none;

  border: none;
  background: transparent;

  cursor: pointer;

  color: #5a78ff;

  @media (max-width: 950px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const MobileMenu = styled.div`
  width: 100%;

  background: white;

  padding: 10px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  border-top: 1px solid rgba(120, 120, 120, 0.08);

  animation: slideDown 0.4s ease;

  a {
    text-decoration: none;

    color: #444;

    font-size: 14px;
    font-weight: 600;

    padding: 10px;

    border-radius: 10px;

    transition: 0.3s;

    &:hover {
      background: rgba(90, 120, 255, 0.08);

      color: #5a78ff;
    }
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const MobileButtons = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
`;