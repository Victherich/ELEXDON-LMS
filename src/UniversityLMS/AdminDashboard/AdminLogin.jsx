// import React, { useState, useContext } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { Context } from "../components/Context";
// import { useNavigate } from "react-router-dom";

// const AdminLogin = () => {
//   const { api_domain, api_key } = useContext(Context);
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const loginAdmin = async () => {
//     const cleanEmail = email.trim().toLowerCase();

//     if (!cleanEmail || !password) {
//       Swal.fire("Error", "All fields required", "error");
//       return;
//     }

//     try {
//       setLoading(true);

//       Swal.fire({
//         title: "Logging in...",
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       const res = await fetch(
//         `${api_domain}/admin_login.php?key=${api_key}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             email: cleanEmail,
//             password,
//           }),
//         }
//       );

//       const data = await res.json();
//       Swal.close();

//       if (data.success) {
//         localStorage.setItem("admin_token", data.token);

//         Swal.fire("Success", data.message, "success");
//         navigate("/admindashboard");
//       } else {
//         Swal.fire("Error", data.error, "error");
//       }
//     } catch (err) {
//       Swal.close();
//       Swal.fire("Error", "Network error", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container>
//       <Card>
//         <Title>
//           UNIVERSITY <span>ADMIN LOGIN</span>
//         </Title>

//         <Subtitle>Admin Login</Subtitle>

//         <Input
//           type="email"
//           placeholder="Admin Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <Input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <Button onClick={loginAdmin}>
//           {loading ? "Logging in..." : "Login"}
//         </Button>
//       </Card>
//     </Container>
//   );
// };

// export default AdminLogin;

// /* =========================
//    STYLES (MATCH SIGNUP UI)
// ========================= */

// const Container = styled.div`
//   width: 100%;
//   min-height: 100vh;

//   display: flex;
//   justify-content: center;
//   align-items: center;

//   background: linear-gradient(
//     135deg,
//     #f8fbff,
//     #f3f4ff
//   );

//   padding: 10px;
// `;

// const Card = styled.div`
//   width: 100%;
//   max-width: 500px;

//   background: white;

//   padding: 10px;

//   border-radius: 20px;

//   display: flex;
//   flex-direction: column;

//   gap: 10px;

//   box-shadow: 0 10px 40px rgba(0,0,0,0.06);
// `;

// const Title = styled.h1`
//   text-align: center;

//   font-size: 28px;
//   font-weight: 900;

//   color: #111;

//   span {
//     background: linear-gradient(
//       135deg,
//       #59a7ff,
//       #7b61ff
//     );

//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//   }
// `;

// const Subtitle = styled.h3`
//   font-size: 16px;
//   font-weight: 800;

//   color: #222;
// `;

// const Input = styled.input`
//   width: 100%;

//   padding: 10px;

//   border-radius: 10px;

//   border: 1px solid rgba(120,120,120,0.15);

//   outline: none;

//   font-size: 14px;

//   &:focus {
//     border-color: #5a78ff;
//   }
// `;

// const Button = styled.button`
//   border: none;

//   padding: 10px;

//   border-radius: 10px;

//   background: linear-gradient(
//     135deg,
//     #59a7ff,
//     #7b61ff
//   );

//   color: white;

//   font-size: 14px;
//   font-weight: 700;

//   cursor: pointer;

//   transition: 0.2s;

//   &:hover {
//     opacity: 0.9;
//   }
// `;




import React, { useState, useContext } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../../components/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../Features/Slice";

const UniversityAdminLogin = () => {

  const { api_domain, api_key } = useContext(Context);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  /* =========================
     LOGIN ADMIN
  ========================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    /* =========================
       VALIDATION
    ========================= */

    if (!cleanEmail || !password) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Email and password are required",
        confirmButtonColor: "#7b61ff",
      });

      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address",
        confirmButtonColor: "#7b61ff",
      });

      return;
    }

    try {

      setLoading(true);

      Swal.fire({
        title: "Logging in...",
        text: "Please wait",
        allowOutsideClick: false,

        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(
        `${api_domain}/admin_login.php?key=${api_key}`,
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

      const data = await response.json();

      Swal.close();

      /* =========================
         LOGIN SUCCESS
      ========================= */

      if (data.success) {

        /*
          SAME REDUX PATTERN
          AS YOUR OLD SYSTEM
        */

        const adminInfo = data.user;
        const adminToken = data.token;

        dispatch(
          adminLogin({
            adminInfo,
            adminToken,
          })
        );

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: data.message,
          confirmButtonColor: "#7b61ff",
        });

        navigate("/admindashboard");

      } else {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: data.error,
          confirmButtonColor: "#7b61ff",
        });

      }

    } catch (error) {

      console.log(error);

      Swal.close();

      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: "Unable to connect to server",
        confirmButtonColor: "#7b61ff",
      });

    } finally {

      setLoading(false);

    }
  };

  return (
    <Container>

      <Card>

        <Title>
          ELEXDON <span>DIGITAL LMS</span>
        </Title>

        <Subtitle>
          University Admin Login
        </Subtitle>

        <Form onSubmit={handleLogin}>

          <Input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <Button type="submit">

            {loading
              ? "Logging in..."
              : "Login"}

          </Button>

        </Form>

        <ForgotPassword
          onClick={() =>
            navigate("/universityadminsignup")
          }
        >
          Already have an account? Signup
        </ForgotPassword>

        <ForgotPassword
          onClick={() =>
            navigate("/universityadminforgotpassword")
          }
        >
          Forgot Password?
        </ForgotPassword>

      </Card>

    </Container>
  );
};

export default UniversityAdminLogin;

/* =========================
   STYLES
========================= */

const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    135deg,
    #f8fbff,
    #f3f4ff
  );

  padding: 15px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 450px;

  background: white;

  padding: 25px;

  border-radius: 25px;

  display: flex;
  flex-direction: column;

  gap: 15px;

  box-shadow:
    0 10px 40px rgba(0,0,0,0.06);

  border: 1px solid rgba(123,97,255,0.08);
`;

const Title = styled.h1`
  text-align: center;

  font-size: 30px;
  font-weight: 900;

  color: #111;

  margin: 0;

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

const Subtitle = styled.h3`
  text-align: center;

  font-size: 16px;
  font-weight: 700;

  color: #555;

  margin: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;

  gap: 15px;
`;

const Input = styled.input`
  width: 100%;

  padding: 14px;

  border-radius: 12px;

  border: 1px solid rgba(120,120,120,0.15);

  outline: none;

  font-size: 15px;

  transition: 0.2s;

  &:focus {
    border-color: #7b61ff;

    box-shadow:
      0 0 0 4px rgba(123,97,255,0.08);
  }
`;

const Button = styled.button`
  border: none;

  padding: 14px;

  border-radius: 12px;

  background: linear-gradient(
    135deg,
    #59a7ff,
    #7b61ff
  );

  color: white;

  font-size: 15px;
  font-weight: 700;

  cursor: pointer;

  transition: 0.25s;

  &:hover {
    transform: translateY(-1px);

    opacity: 0.95;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ForgotPassword = styled.p`
  text-align: center;

  color: #7b61ff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;