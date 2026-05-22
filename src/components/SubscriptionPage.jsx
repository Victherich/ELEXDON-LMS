import React, { useContext, useState } from "react";
import styled from "styled-components";
 import Swal from "sweetalert2";
 import {Context} from './Context'

const SubscriptionPage = () => {
  const [step, setStep] = useState(1);

  const [institutionName, setInstitutionName] = useState("");
  const [email, setEmail] = useState("");

  const [verificationCode, setVerificationCode] =
    useState("");

  const [loading, setLoading] = useState(false);
  const {api_domain, api_key,state}=useContext(Context)
  console.log(state)

  const [formData, setFormData] = useState({
    adminName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    website: "",
  });

  /* =========================
     SEND VERIFICATION CODE
  ========================= */



// const verifyEmail = async () => {

//   /* =========================
//      SANITIZE INPUTS
//   ========================= */

//   const cleanInstitutionName =
//     institutionName.trim();

//   const cleanEmail =
//     email.trim().toLowerCase();

//   /* =========================
//      EMPTY VALIDATION
//   ========================= */

//   if (
//     !cleanInstitutionName ||
//     !cleanEmail
//   ) {

//     Swal.fire({
//       icon: "warning",
//       text: "Please enter your institution name and official email",
//       confirmButtonColor: "#7b61ff",
//     });

//     return;
//   }

//   /* =========================
//      INSTITUTION NAME VALIDATION
//      ONLY LETTERS & SPACES
//   ========================= */

//   const institutionRegex =
//     /^[A-Za-z\s&.,'-]{3,150}$/;

//   if (
//     !institutionRegex.test(
//       cleanInstitutionName
//     )
//   ) {

//     Swal.fire({
//       icon: "error",
//       text: "Institution name must contain only valid text characters",
//       confirmButtonColor: "#7b61ff",
//     });

//     return;
//   }

//   /* =========================
//      EMAIL VALIDATION
//   ========================= */

//   const emailRegex =
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailRegex.test(cleanEmail)) {

//     Swal.fire({
//       icon: "error",
//       text: "Please enter a valid official email address",
//       confirmButtonColor: "#7b61ff",
//     });

//     return;
//   }

//   /* =========================
//      BLOCK SCRIPT INJECTION
//   ========================= */

//   const dangerousPatterns =
//     /(<script|<\/script>|SELECT |INSERT |DELETE |UPDATE |DROP |--|\*|;)/i;

//   if (
//     dangerousPatterns.test(
//       cleanInstitutionName
//     ) ||
//     dangerousPatterns.test(cleanEmail)
//   ) {

//     Swal.fire({
//       icon: "error",
//       text: "Invalid characters detected",
//       confirmButtonColor: "#7b61ff",
//     });

//     return;
//   }

//   /* =========================
//      API REQUEST
//   ========================= */

//   try {

//     setLoading(true);

//     Swal.fire({
//       title: "Verifying Email...",
//       text: "Please wait",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const response = await fetch(
//       "https://elexdontech.com/api_lms/send_email_verification.php",
//       {
//         method: "POST",

//         headers: {
//           "Content-Type":
//             "application/json",
//             "X-API-KEY":
//       "MY_SUPER_SECRET_ELEXDON_KEY"
//         },

//         body: JSON.stringify({
//           institutionName:
//             cleanInstitutionName,

//           email: cleanEmail,
//         }),
//       }
//     );

//     const data = await response.json();

//     Swal.close();

//     if (data.success) {

//       Swal.fire({
//         icon: "success",
//         title: "Verification Code Sent",
//         text: data.message,
//         confirmButtonColor: "#7b61ff",
//       });

//       setStep(2);

//     } else {

//       Swal.fire({
//         icon: "error",
//         text: data.error,
//         confirmButtonColor: "#7b61ff",
//       });
//     }

//   } catch (error) {

//     Swal.close();

//     Swal.fire({
//       icon: "error",
//       text: "Network error. Please try again.",
//       confirmButtonColor: "#7b61ff",
//     });

//   } finally {

//     setLoading(false);
//   }
// };


const verifyEmail = async () => {

  /* =========================
     SANITIZE INPUTS
  ========================= */

  const cleanInstitutionName =
    institutionName.trim();

  const cleanEmail =
    email.trim().toLowerCase();

  /* =========================
     VALIDATION
  ========================= */

  if (!cleanInstitutionName || !cleanEmail) {
    Swal.fire({
      icon: "warning",
      text: "Please enter your institution name and official email",
      confirmButtonColor: "#7b61ff",
    });
    return;
  }

  const institutionRegex =
    /^[A-Za-z\s&.,'-]{3,150}$/;

  if (!institutionRegex.test(cleanInstitutionName)) {
    Swal.fire({
      icon: "error",
      text: "Invalid institution name",
      confirmButtonColor: "#7b61ff",
    });
    return;
  }

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(cleanEmail)) {
    Swal.fire({
      icon: "error",
      text: "Invalid email format",
      confirmButtonColor: "#7b61ff",
    });
    return;
  }

  /* =========================
     LOADING
  ========================= */

  try {

    setLoading(true);

    Swal.fire({
      title: "Verifying Email...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    /* =========================
       API REQUEST (FIXED STYLE)
    ========================= */

    const response = await fetch(
      `${api_domain}/send_email_verification.php?key=${api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          institutionName:
            cleanInstitutionName,
          email: cleanEmail,
        }),
      }
    );

    const data = await response.json();

    Swal.close();

    if (data.success) {

      Swal.fire({
        icon: "success",
        title: "Verification Code Sent",
        text: data.message,
        confirmButtonColor: "#7b61ff",
      });

      setStep(2);

    } else {

      Swal.fire({
        icon: "error",
        text: data.error,
        confirmButtonColor: "#7b61ff",
      });
    }

  } catch (error) {

    Swal.close();

    Swal.fire({
      icon: "error",
      text: "Network error. Please try again.",
      confirmButtonColor: "#7b61ff",
    });

  } finally {
    setLoading(false);
  }
};

  /* =========================
     VERIFY OTP
  ========================= */

  const verifyOTP = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost/elexdon/verify_code.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );

      const data = await response.json();

      alert(data.message || data.error);

      if (data.success) {
        setStep(3);
      }
    } catch (error) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     COMPLETE REGISTRATION
  ========================= */

  const registerInstitution = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost/elexdon/register_university.php",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            institutionName,
            email,
            ...formData,
          }),
        }
      );

      const data = await response.json();

      alert(data.message || data.error);

      if (data.success) {
        alert("Registration Successful");
      }
    } catch (error) {
      alert("Network Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>

      <Card>

        <Title>
          ELEXDON{" "}
          <span>DIGITAL LMS</span>
        </Title>

        {/* STEP 1 */}

        {step === 1 && (
          <>
            <Subtitle>
              University Verification
            </Subtitle>

            <Input
              type="text"
              placeholder="University Name"
              value={institutionName}
              onChange={(e) =>
                setInstitutionName(e.target.value)
              }
            />

            <Input
              type="email"
              placeholder="Official University Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <Button
              onClick={verifyEmail}
            >
              {loading
                ? "Please wait..."
                : "Verify Email"}
            </Button>
          </>
        )}

        {/* STEP 2 */}

        {step === 2 && (
          <>
            <Subtitle>
              Email Verification
            </Subtitle>

            <Input
              type="text"
              placeholder="Enter 6 Digit Code"
              value={verificationCode}
              onChange={(e) =>
                setVerificationCode(
                  e.target.value
                )
              }
            />

            <Button onClick={verifyOTP}>
              {loading
                ? "Please wait..."
                : "Verify Code"}
            </Button>
          </>
        )}

        {/* STEP 3 */}

        {step === 3 && (
          <>
            <Subtitle>
              Complete Registration
            </Subtitle>

            <Input
              type="text"
              placeholder="Admin Full Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  adminName: e.target.value,
                })
              }
            />

            <Input
              type="text"
              placeholder="Phone Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <Input
              type="text"
              placeholder="University Address"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />

            <Input
              type="text"
              placeholder="Website"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  website: e.target.value,
                })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password: e.target.value,
                })
              }
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword:
                    e.target.value,
                })
              }
            />

            <Button
              onClick={registerInstitution}
            >
              {loading
                ? "Please wait..."
                : "Complete Registration"}
            </Button>
          </>
        )}

      </Card>

    </Container>
  );
};

export default SubscriptionPage;

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

  padding: 10px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 500px;

  background: white;

  padding: 10px;

  border-radius: 20px;

  display: flex;
  flex-direction: column;

  gap: 10px;

  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
`;

const Title = styled.h1`
  text-align: center;

  font-size: 28px;
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

const Subtitle = styled.h3`
  font-size: 16px;
  font-weight: 800;

  color: #222;
`;

const Input = styled.input`
  width: 100%;

  padding: 10px;

  border-radius: 10px;

  border: 1px solid rgba(120,120,120,0.15);

  outline: none;

  font-size: 14px;

  &:focus {
    border-color: #5a78ff;
  }
`;

const Button = styled.button`
  border: none;

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
`;