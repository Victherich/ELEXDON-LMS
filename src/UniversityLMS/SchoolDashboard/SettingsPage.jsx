import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Context } from "../../components/Context";
import Swal from "sweetalert2";
import { schoolLogin } from "../../Features/Slice";

import LevelSemesterBuilder from "./LevelSemesterBuilder";
import ManageCourses from "./ManageCourses";
import BulkCreateCourses from "./BulkCreateCourses";
import { useNavigate } from "react-router-dom";
import ManageDepartments from "./ManageDepartments";
import ManagePrograms from "./ManagePrograms";

const Settings = () => {
  const schoolInfo = useSelector((state) => state.schoolInfo);
const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const {api_domain, api_key}=useContext(Context);
  const schoolToken = useSelector((state)=>state.schoolToken);
const [loading, setLoading]=useState(false);
const navigate = useNavigate();
  const [form, setForm] = useState({
    name: schoolInfo?.name || "",
    email: schoolInfo?.email || "",
    school_name: schoolInfo?.school_name || "",
    phone: schoolInfo?.phone || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSave = async () => {
  setLoading(true);

  try {
    const res = await fetch(
      `${api_domain}/update_school_profile.php?key=${api_key}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: schoolToken,
          name: form.name,
          school_name: form.school_name,
          phone: form.phone,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.error);
    }

    // ✅ UPDATE REDUX STATE HERE
    dispatch(
      schoolLogin({
        schoolInfo: {
          ...schoolInfo,
          name: form.name,
          school_name: form.school_name,
          phone: form.phone,
        },
        schoolToken,
      })
    );

    Swal.fire("Success", "Profile updated successfully", "success");

    setEditMode(false);
  } catch (err) {
    console.error(err);

    Swal.fire("Error", err.message || "Update failed", "error");
  } finally {
    setLoading(false);
  }
};





  return (
    <Container>
      <Card>
<p
  style={{
    textAlign: "right",
    cursor: "pointer",
    color: "#7b61ff",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "underline",
  }}
  onClick={() => navigate("/universitydashboard")}
>
  Back to Dashboard
</p>
        <Title>Account Settings</Title>
        <Subtitle>Manage your school profile information</Subtitle>

        <Section>

          <Label>Admin Name</Label>
          <Input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
          />

          <Label>Email</Label>
          <Input
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled
          />

          <Label>School Name</Label>
          <Input
            name="school_name"
            value={form.school_name}
            onChange={handleChange}
            disabled={!editMode}
          />

          <Label>Phone</Label>
          <Input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!editMode}
          />

        </Section>

        <ButtonGroup>

          {!editMode ? (
            <Button onClick={() => setEditMode(true)}>
              Edit Profile
              {loading?" Loading...":""}
            </Button>
          ) : (
            <>
              <SaveButton onClick={handleSave}>
                Save Changes
                {loading?" Loading...":""}
              </SaveButton>

              <CancelButton onClick={() => setEditMode(false)}>
                Cancel
              </CancelButton>
            </>
          )}

        </ButtonGroup>

        {/* <Divider /> */}
<hr style={{margin:"10px", height:"10px" , backgroundColor:"blue"}}/>
        <LevelSemesterBuilder/>
     
<hr style={{margin:"10px", height:"10px" , backgroundColor:"blue"}}/>
       <ManageCourses/>
       <BulkCreateCourses/>
       <hr style={{margin:"10px", height:"10px" , backgroundColor:"blue"}}/>
       <ManageDepartments/>
       <hr style={{margin:"10px", height:"10px" , backgroundColor:"blue"}}/>
       <ManagePrograms/>

       <p
  style={{
    textAlign: "right",
    cursor: "pointer",
    color: "#7b61ff",
    fontWeight: "600",
    fontSize: "14px",
    textDecoration: "underline",
  }}
  onClick={() => navigate("/universitydashboard")}
>
  Back to Dashboard
</p>

      </Card>
    </Container>
  );
};

export default Settings;

const Container = styled.div`
  width: 100%;
  padding: 100px 10px;
`;

const Card = styled.div`
  max-width: 800px;
  margin: auto;

  background: white;
  padding: 5px;
  border-radius: 18px;

//   box-shadow: 0 10px 40px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 900;

    color: #7b61ff;
  
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 5px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 20px;

  h3 {
    color: #7b61ff;
  }
`;

const Label = styled.label`
  font-size: 13px;
  font-weight: 700;
  color: #444;
`;

const Input = styled.input`
  padding: 5px;
  border-radius: 5px;

  border: 1px solid #ddd;

  outline: none;

  &:disabled {
    background: #f5f5f5;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 5px;
  border-radius: 5px;
  border: none;

  background: linear-gradient(135deg,#59a7ff,#7b61ff);
  color: white;

  font-weight: 700;
  cursor: pointer;
`;

const SaveButton = styled(Button)`
  background: #28a745;
`;

const CancelButton = styled(Button)`
  background: #ff4d6d;
`;

const Divider = styled.hr`
  margin: 5px 0;
  border: none;
  border-top: 1px solid #eee;
`;