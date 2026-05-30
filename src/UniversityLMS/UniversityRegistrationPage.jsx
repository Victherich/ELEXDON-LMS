// import React, { useContext, useState } from "react";
// import styled from "styled-components";
//  import Swal from "sweetalert2";
//  import {Context} from './Context'
//  import {useNavigate} from 'react-router-dom'

// const SubscriptionPage = () => {
//   const [step, setStep] = useState(1);

//   const [institutionName, setInstitutionName] = useState("");
//   const [email, setEmail] = useState("");

//   const [verificationCode, setVerificationCode] =
//     useState("");

//   const [loading, setLoading] = useState(false);
//   const {api_domain, api_key,state}=useContext(Context)
//   console.log(state)

//   const [formData, setFormData] = useState({
//     adminName: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
    
//   });

//   const navigate = useNavigate();

//   /* =========================
//      SEND VERIFICATION CODE
//   ========================= */

// const verifyEmail = async () => {
//   const cleanInstitutionName = institutionName.trim();
//   const cleanEmail = email.trim().toLowerCase();

//   if (!cleanInstitutionName || !cleanEmail) {
//     Swal.fire({
//       icon: "warning",
//       text: "Please enter your institution name and official email",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   const institutionRegex = /^[A-Za-z\s&.,'-]{3,150}$/;

//   if (!institutionRegex.test(cleanInstitutionName)) {
//     Swal.fire({
//       icon: "error",
//       text: "Invalid institution name",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!emailRegex.test(cleanEmail)) {
//     Swal.fire({
//       icon: "error",
//       text: "Invalid email format",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

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

//     /* =========================
//        ✅ FIX IS HERE (ADD API KEY)
//     ========================= */

//     const response = await fetch(
//       `${api_domain}/send_school_email_verification.php?key=${api_key}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           institutionName: cleanInstitutionName,
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
//         text: `${data.message}, Please check your inbox or spam folder for otp.`,
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

//   /* =========================
//      VERIFY OTP
//   ========================= */

// const verifyOTP = async () => {
//   const cleanEmail = email.trim().toLowerCase();
//   const cleanCode = verificationCode.trim();

//   /* =========================
//      VALIDATION
//   ========================= */

//   if (!cleanEmail || !cleanCode) {
//     Swal.fire({
//       icon: "warning",
//       text: "Please enter your email and verification code",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(cleanEmail)) {
//     Swal.fire({
//       icon: "error",
//       text: "Invalid email format",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   const codeRegex = /^[0-9]{6}$/;
//   if (!codeRegex.test(cleanCode)) {
//     Swal.fire({
//       icon: "error",
//       text: "Verification code must be 6 digits",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   /* =========================
//      REQUEST
//   ========================= */

//   try {
//     setLoading(true);

//     Swal.fire({
//       title: "Verifying Code...",
//       text: "Please wait",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const response = await fetch(
//       `${api_domain}/verify_email_code.php?key=${api_key}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           email: cleanEmail,
//           code: cleanCode,
//         }),
//       }
//     );

//     const data = await response.json();

//     Swal.close();

//     /* =========================
//        RESPONSE HANDLING
//     ========================= */

//     if (data.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Verified",
//         text: data.message,
//         confirmButtonColor: "#7b61ff",
//       });

//       setStep(3); // move to next registration step

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

//   /* =========================
//      COMPLETE REGISTRATION
//   ========================= */

//  const registerInstitution = async () => {
//   const cleanInstitutionName = institutionName.trim();
//   const cleanEmail = email.trim().toLowerCase();

//   const {
//     adminName,
//     phone,
//     password,
//     confirmPassword,
//     address,
//   } = formData;

//   /* =========================
//      VALIDATION
//   ========================= */

//   if (
//     !adminName ||
//     !phone ||
//     !password ||
//     !confirmPassword ||
//     !address
//   ) {
//     Swal.fire({
//       icon: "warning",
//       text: "Please fill in all fields",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   if (password.length < 6) {
//     Swal.fire({
//       icon: "error",
//       text: "Password must be at least 6 characters",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   if (password !== confirmPassword) {
//     Swal.fire({
//       icon: "error",
//       text: "Passwords do not match",
//       confirmButtonColor: "#7b61ff",
//     });
//     return;
//   }

//   /* =========================
//      REQUEST
//   ========================= */

//   try {
//     setLoading(true);

//     Swal.fire({
//       title: "Creating Institution Account...",
//       text: "Please wait",
//       allowOutsideClick: false,
//       didOpen: () => {
//         Swal.showLoading();
//       },
//     });

//     const response = await fetch(
//       `${api_domain}/register_school.php?key=${api_key}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },

//         body: JSON.stringify({
//           institutionName: cleanInstitutionName,
//           email: cleanEmail,
//           adminName,
//           phone,
//           address,
//           password,
//         }),
//       }
//     );

//     const data = await response.json();

//     Swal.close();

//     /* =========================
//        RESPONSE HANDLING
//     ========================= */

//     if (data.success) {
//       Swal.fire({
//         icon: "success",
//         title: "Registration Successful 🎉",
//         text: data.message,
//         confirmButtonColor: "#7b61ff",
//       });

//       navigate('/adminlogin')
//       setStep(1);

//       setInstitutionName("");
//       setEmail("");
//       setVerificationCode("");
//       setFormData({
//         adminName: "",
//         phone: "",
//         password: "",
//         confirmPassword: "",
//         address: "",
//       });

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

//   return (
//     <Container>

//       <Card>

//         <Title>
//           ELEXDON{" "}
//           <span>DIGITAL LMS</span>
//         </Title>

//         {/* STEP 1 */}

//         {step === 1 && (
//           <>
//             <Subtitle>
//               University Verification
//             </Subtitle>

//             <Input
//               type="text"
//               placeholder="University Name"
//               value={institutionName}
//               onChange={(e) =>
//                 setInstitutionName(e.target.value)
//               }
//             />

//             <Input
//               type="email"
//               placeholder="Official University Email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//             />

//             <Button
//               onClick={verifyEmail}
//             >
//               {loading
//                 ? "Please wait..."
//                 : "Verify Email"}
//             </Button>
//           </>
//         )}

//         {/* STEP 2 */}

//         {step === 2 && (
//           <>
//             <Subtitle>
//               Email Verification
//             </Subtitle>

//             <Input
//               type="text"
//               placeholder="Enter 6 Digit Code"
//               value={verificationCode}
//               onChange={(e) =>
//                 setVerificationCode(
//                   e.target.value
//                 )
//               }
//             />

//             <Button onClick={verifyOTP}>
//               {loading
//                 ? "Please wait..."
//                 : "Verify Code"}
//             </Button>
//           </>
//         )}

//         {/* STEP 3 */}

//         {step === 3 && (
//           <>
//             <Subtitle>
//               Complete Registration
//             </Subtitle>

//             <Input
//               type="text"
//               placeholder="Admin Full Name"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   adminName: e.target.value,
//                 })
//               }
//             />

//             <Input
//               type="text"
//               placeholder="Phone Number"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   phone: e.target.value,
//                 })
//               }
//             />

//             <Input
//               type="text"
//               placeholder="University Address"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   address: e.target.value,
//                 })
//               }
//             />

        

//             <Input
//               type="password"
//               placeholder="Password"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   password: e.target.value,
//                 })
//               }
//             />

//             <Input
//               type="password"
//               placeholder="Confirm Password"
//               onChange={(e) =>
//                 setFormData({
//                   ...formData,
//                   confirmPassword:
//                     e.target.value,
//                 })
//               }
//             />

//             <Button
//               onClick={registerInstitution}
//             >
//               {loading
//                 ? "Please wait..."
//                 : "Complete Registration"}
//             </Button>
//           </>
//         )}

//       </Card>

//     </Container>
//   );
// };

// export default SubscriptionPage;

// /* =========================
//    STYLES
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
// `;




import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { Context } from "../components/Context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { schoolLogin } from "../Features/Slice";

const SubscriptionPage = () => {
  const [step, setStep] = useState(1);

  const [schoolName, setSchoolName] = useState("");
  const [email, setEmail] = useState("");

  const [verificationCode, setVerificationCode] = useState("");

  const [loading, setLoading] = useState(false);
  const { api_domain, api_key } = useContext(Context);

  const [formData, setFormData] = useState({
    adminName: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const dispatch=useDispatch();

  const navigate = useNavigate();

  /* =========================
     SEND VERIFICATION CODE
  ========================= */

  const verifyEmail = async () => {
    const cleanSchoolName = schoolName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanSchoolName || !cleanEmail) {
      Swal.fire({
        icon: "warning",
        text: "Please enter your school name and official email",
        confirmButtonColor: "#7b61ff",
      });
      return;
    }

    const nameRegex = /^[A-Za-z\s&.,'-]{3,150}$/;

    if (!nameRegex.test(cleanSchoolName)) {
      Swal.fire({
        icon: "error",
        text: "Invalid school name",
        confirmButtonColor: "#7b61ff",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      Swal.fire({
        icon: "error",
        text: "Invalid email format",
        confirmButtonColor: "#7b61ff",
      });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Verifying School...",
        text: "Please wait",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${api_domain}/send_school_email_verification.php?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schoolName: cleanSchoolName,
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
    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = verificationCode.trim();

    if (!cleanEmail || !cleanCode) {
      Swal.fire({
        icon: "warning",
        text: "Please enter email and verification code",
        confirmButtonColor: "#7b61ff",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const codeRegex = /^[0-9]{6}$/;

    if (!emailRegex.test(cleanEmail)) {
      Swal.fire({ icon: "error", text: "Invalid email format" });
      return;
    }

    if (!codeRegex.test(cleanCode)) {
      Swal.fire({ icon: "error", text: "Code must be 6 digits" });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Verifying Code...",
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${api_domain}/verify_email_code.php?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: cleanEmail,
            code: cleanCode,
          }),
        }
      );

      const data = await response.json();
      Swal.close();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Verified",
          text: data.message,
        });

        setStep(3);
      } else {
        Swal.fire({ icon: "error", text: data.error });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({ icon: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     REGISTER SCHOOL
  ========================= */

  const registerSchool = async () => {
    const cleanSchoolName = schoolName.trim();
    const cleanEmail = email.trim().toLowerCase();

    const {
      adminName,
      phone,
      password,
      confirmPassword,
      address,
    } = formData;

    if (!adminName || !phone || !password || !confirmPassword || !address) {
      Swal.fire({ icon: "warning", text: "Fill all fields" });
      return;
    }

    if (password.length < 6) {
      Swal.fire({ icon: "error", text: "Password too short" });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({ icon: "error", text: "Passwords do not match" });
      return;
    }

    try {
      setLoading(true);

      Swal.fire({
        title: "Creating School Account...",
        didOpen: () => Swal.showLoading(),
      });

      const response = await fetch(
        `${api_domain}/register_school.php?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            schoolName: cleanSchoolName,
            email: cleanEmail,
            adminName,
            phone,
            address,
            password,
          }),
        }
      );

      const data = await response.json();
      Swal.close();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "School Registered 🎉",
          text: data.message,
        });
        
         const schoolInfo = data.user;
                const schoolToken = data.token;
        
                dispatch(
                  schoolLogin({
                    schoolInfo,
                    schoolToken,
                  })
                );
        
                navigate("/universitydashboard");

       

        setStep(1);
        setSchoolName("");
        setEmail("");
        setVerificationCode("");
        setFormData({
          adminName: "",
          phone: "",
          password: "",
          confirmPassword: "",
          address: "",
        });
      } else {
        Swal.fire({ icon: "error", text: data.error });
      }
    } catch (error) {
      Swal.close();
      Swal.fire({ icon: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };











  return (
    <Container>
      <Card>
        <Title>
          ELEXDON <span>UNIVERSITY LMS</span>
        </Title>

        {step === 1 && (
          <>
            <Subtitle>School Verification</Subtitle>

            <Input
              placeholder="School Name"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
            />

            <Input
              placeholder="Official School Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button onClick={verifyEmail}>
              {loading ? "Please wait..." : "Verify School"}
            </Button>
          </>
        )}

        {step === 2 && (
          <>
            <Subtitle>Email Verification</Subtitle>

            <Input
              placeholder="Enter 6 digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />

            <Button onClick={verifyOTP}>
              {loading ? "Please wait..." : "Verify Code"}
            </Button>
          </>
        )}

        {step === 3 && (
          <>
            <Subtitle>Complete School Registration</Subtitle>

            <Input
              placeholder="Admin Full Name"
              onChange={(e) =>
                setFormData({ ...formData, adminName: e.target.value })
              }
            />

            <Input
              placeholder="Phone Number"
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Input
              placeholder="School Address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />

            <Input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            <Input
              type="password"
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  confirmPassword: e.target.value,
                })
              }
            />

            <Button onClick={registerSchool}>
              {loading ? "Please wait..." : "Complete Registration"}
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