import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";


const LevelSemesterBuilder = () => {
  const [levels, setLevels] = useState([
    { level: 1, semesters: 2 },
  ]);

  const { api_domain, api_key } = useContext(Context);
  const [status, setStatus] = useState("loading");
// loading | editable | locked

const schoolToken = useSelector(
  (state) => state.schoolToken
);

const [loading, setLoading] = useState(false);


/* =========================
   FETCH EXISTING STRUCTURE
========================= */



  const fetchStructure = async () => {

    setStatus("loading");

    try {

      const response = await fetch(
        `${api_domain}/get_school_semesters.php?key=${api_key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: schoolToken,
          }),
        }
      );

      const data = await response.json();

      if (data.success && data.levels?.length > 0) {

        setLevels(data.levels);

        // structure exists → LOCK UI
        setStatus("locked");

      } else {

        // no structure → allow editing
        setStatus("editable");
      }

    } catch (error) {

      console.error("Fetch semester structure error:", error);

      // safest fallback → allow creation
      setStatus("editable");
    }
  };



  useEffect(() => {
  fetchStructure();

}, [api_domain, api_key, schoolToken]);






  /* =========================
     ADD LEVEL
  ========================= */
  const addLevel = () => {
    const last = levels[levels.length - 1];

    setLevels([
      ...levels,
      {
        level: last.level + 1,
        semesters: 2,
      },
    ]);
  };

  /* =========================
     UPDATE SEMESTERS
  ========================= */
  const updateSemester = (index, value) => {
    const updated = [...levels];

    const num = Number(value);

    if (num < 1) return;

    updated[index].semesters = num;

    setLevels(updated);
  };

  /* =========================
     REMOVE LEVEL
  ========================= */
  const removeLevel = (index) => {
    const updated = [...levels];

    updated.splice(index, 1);

    if (updated.length === 0) {
      Swal.fire("Error", "At least one level required", "error");
      return;
    }

    setLevels(updated);
  };

  /* =========================
     GENERATE PREVIEW
  ========================= */
  const generatePreview = () => {
    const result = [];

    levels.forEach((lvl) => {
      for (let s = 1; s <= lvl.semesters; s++) {
        result.push(`L${lvl.level}S${s}`);
      }
    });

    return result;
  };

  /* =========================
     SAVE VALIDATION ONLY
  ========================= */
//   const handleSave = () => {
//     const preview = generatePreview();

//     // simple validation: must not be empty
//     if (preview.length === 0) {
//       Swal.fire("Error", "Invalid structure", "error");
//       return;
//     }

//     console.log("FINAL STRUCTURE:", preview);

//     Swal.fire(
//       "Success",
//       "Structure validated (not saved yet)",
//       "success"
//     );
//   };

/* =========================
   SAVE TO BACKEND
========================= */
const handleSave = async () => {

  const preview = generatePreview();

  if (preview.length === 0) {
    Swal.fire(
      "Error",
      "Invalid structure",
      "error"
    );
    return;
  }

  /* =========================
     CONFIRM
  ========================= */

  const confirm = await Swal.fire({
    title: "Save Structure?",
    text:
      "This will be your school semester structure.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Save",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#28a745",
    cancelButtonColor: "#ff4d6d",
  });

  if (!confirm.isConfirmed) {
    return;
  }

  try {

    setLoading(true);
    Swal.fire({text:"Please wait..."});
    Swal.showLoading();

    const response = await fetch(
      `${api_domain}/save_school_semesters.php?key=${api_key}`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          token: schoolToken,
          levels,
        }),
      }
    );

    const data = await response.json();

    if (!data.success) {
      throw new Error(
        data.error || "Failed to save"
      );
    }

    Swal.fire(
      "Success",
      "School structure saved successfully",
      "success"
    );
    fetchStructure();

  } catch (error) {

    console.error(error);

    Swal.fire(
      "Error",
      error.message || "Failed to save",
      "error"
    );

  } finally {

    setLoading(false);

  }
};



  const preview = generatePreview();


  const removeLastLevel = () => {
  if (levels.length === 1) {
    Swal.fire("Error", "At least one level is required", "error");
    return;
  }

  const updated = [...levels];
  updated.pop();

  setLevels(updated);
};

  return (
    <Container>

      <Card>

        <Title>Levels & Semesters</Title>

        {status === "locked" && (
  <div style={{ padding: "5px", color: "green" }}>
    ✅ Your school structure is created.
  </div>
)}

{status === "loading" && (
  <div style={{ padding: "5px" }}>
    Loading structure...
  </div>
)}
     {status === "editable" && (
  <ul>
    <li>
      This is where you build your school levels and semesters structure
    </li>

    <li style={{ color: "red", fontWeight: "bold" }}>
      Please ensure it is done correctly as this determines the structure of your school portals and cannot be changed.
    </li>

    <li>
      Click the Add level button to add the next level of your school structure, then adjust the semester number to the number of semester(s) for each level.
    </li>
  </ul>
)}

        {/* ================= LEVEL CONFIG ================= */}
        {levels.map((item, index) => (
          <LevelBox key={index}>

            <Row>
              <Label>Level</Label>
              <Value>L{item.level}</Value>
            </Row>

            <Row>
              <Label>Semesters</Label>

              <Input
                type="number"
                value={item.semesters}
                onChange={(e) =>
                  updateSemester(index, e.target.value)
                }
                disabled={status !== "editable"}
              />
            </Row>

            {/* <Remove onClick={() => removeLevel(index)}>
              Remove
            </Remove> */}

          </LevelBox>
        ))}

        {/* ================= ACTIONS ================= */}
        {status === "editable" && (
  <ButtonRow>
    <Btn onClick={addLevel}>+ Add Level</Btn>

    <BtnDanger onClick={removeLastLevel}>
      Remove Last Level
    </BtnDanger>

    <Btn2 onClick={handleSave} disabled={loading}>
      {loading ? "Saving..." : "Validate and Save"}
    </Btn2>
  </ButtonRow>
)}

        



        {/* ================= PREVIEW ================= */}
        <PreviewBox>

          <h4>Generated Structure</h4>

          <PreviewGrid>
            {preview.map((item, i) => (
              <Span key={i}>{item}</Span>
            ))}
          </PreviewGrid>

        </PreviewBox>

      </Card>

    </Container>
  );
};

export default LevelSemesterBuilder;

/* =========================
   STYLES (STRICT ≤5px RULE)
========================= */

const Container = styled.div`
  padding: 5px;
`;

const Card = styled.div`
  padding: 5px;
  background: #fff;

  li{
  margin-left:20px;
  }
`;

const Title = styled.h3`
  margin: 5px 0;
   color: #7b61ff;
`;

const LevelBox = styled.div`
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ddd;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 5px 0;
`;

const Label = styled.div`
  font-weight: 700;
`;

const Value = styled.div``;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
`;

const Remove = styled.button`
  margin-top: 5px;
  padding: 5px;
  background: #ff4d6d;
  color: white;
  border: none;
  cursor: pointer;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 5px;
`;

const Btn = styled.button`
  padding: 5px;
  background: #7b61ff;
  color: white;
  border: none;
  cursor: pointer;
`;

const Btn2 = styled.button`
  padding: 5px;
  background: #28a745;
  color: white;
  border: none;
  cursor: pointer;
`;

const BtnDanger = styled.button`
  padding: 5px;
  background: #ff4d6d;
  color: white;
  border: none;
  cursor: pointer;
`;

const PreviewBox = styled.div`
  margin-top: 5px;
  padding: 5px;
  border-top: 1px solid #ddd;
`;

const PreviewGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const Span = styled.div`
  padding: 5px;
  background: #f2f2f2;
  font-size: 12px;
`;