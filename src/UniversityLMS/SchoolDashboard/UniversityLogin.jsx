import React, { useState, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../../components/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { schoolLogin } from "../../Features/Slice";

const UniversityLogin = () => {
  const { api_domain, api_key } = useContext(Context);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Swal.fire("Error", "Email and password required", "error");
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Logging in...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const res = await fetch(
        `${api_domain}/school_login.php?key=${api_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: cleanEmail,
            password,
          }),
        }
      );

      const data = await res.json();
      Swal.close();

      if (data.success) {
        const schoolInfo = data.user;
        const schoolToken = data.token;

        dispatch(
          schoolLogin({
            schoolInfo,
            schoolToken,
          })
        );

        // localStorage.setItem("school_token", schoolToken);

        Swal.fire("Success", data.message, "success");

        navigate("/universitydashboard");
      } else {
        Swal.fire("Error", data.error, "error");
      }
    } catch (err) {
      Swal.close();
      Swal.fire("Error", "Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Title>
          SCHOOL <span>PORTAL LOGIN</span>
        </Title>

        <Input
          type="email"
          placeholder="School Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button onClick={handleLogin}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Card>
    </Container>
  );
};

export default UniversityLogin;


const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f8fbff, #f3f4ff);
`;

const Card = styled.div`
  width: 100%;
  max-width: 450px;
  background: white;
  padding: 25px;
  border-radius: 25px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  font-weight: 900;

  span {
    background: linear-gradient(135deg, #59a7ff, #7b61ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Input = styled.input`
  padding: 14px;
  border-radius: 12px;
  border: 1px solid rgba(120,120,120,0.15);
  outline: none;
`;

const Button = styled.button`
  padding: 14px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, #59a7ff, #7b61ff);
`;