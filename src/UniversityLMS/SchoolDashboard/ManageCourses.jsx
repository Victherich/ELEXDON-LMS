// import React, { useState, useEffect, useContext } from "react";
// import styled from "styled-components";
// import Swal from "sweetalert2";
// import { useSelector } from "react-redux";
// import { Context } from "../../components/Context";

// const CreateCourse = () => {
//   const { api_domain, api_key } = useContext(Context);
//   const schoolToken = useSelector((state) => state.schoolToken);
//   const schoolInfo = useSelector((state)=>state.schoolInfo);

//   const [loading, setLoading] = useState(false);
//   const [editId, setEditId] = useState(null);
//   const [courses, setCourses] = useState([]);

//   const [form, setForm] = useState({
//     code: "",
//     title: "",
//     unit: 1,
//     status: "C",
//     link: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   /* =========================
//      FETCH COURSES (READ)
//   ========================= */
//   const fetchCourses = async () => {
//     try {
//       const res = await fetch(`${api_domain}/get_courses.php?key=${api_key}`, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json"
//   },
//   body: JSON.stringify({
//     school_id: schoolInfo.id
//   })
// });

//       const data = await res.json();

//       if (data.success) {
//         setCourses(data.courses);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   /* =========================
//      RESET FORM
//   ========================= */
//   const resetForm = () => {
//     setForm({
//       code: "",
//       title: "",
//       unit: 1,
//       status: "C",
//       link: ""
//     });
//     setEditId(null);
//   };

//   /* =========================
//      VALIDATION
//   ========================= */
//   const validate = () => {
//     if (
//       !form.code?.trim() ||
//       !form.title?.trim() ||
//       !form.link?.trim() ||
//       !form.status?.trim() ||
//       Number(form.unit) <= 0
//     ) {
//       Swal.fire("Error", "All fields are required", "error");
//       return false;
//     }
//     return true;
//   };

//   /* =========================
//      CREATE OR UPDATE
//   ========================= */
//   const handleSubmit = async () => {
//     if (!validate()) return;

//     const confirm = await Swal.fire({
//       title: editId ? "Update Course?" : "Create Course?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       confirmButtonColor: "#7b61ff"
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       setLoading(true);

//       const endpoint = editId
//         ? "update_course.php"
//         : "create_course.php";

//       const res = await fetch(
//         `${api_domain}/${endpoint}?key=${api_key}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//          body: JSON.stringify({
//   school_id: schoolInfo.id,
//   ...form
// })
//         }
//       );

//       const data = await res.json();

//       if (!data.success) throw new Error(data.error);

//       Swal.fire("Success", data.message);

//       resetForm();
//       fetchCourses();

//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================
//      EDIT COURSE
//   ========================= */
//   const handleEdit = (course) => {
//     setForm({
//       code: course.code,
//       title: course.title,
//       unit: course.unit,
//       status: course.status,
//       link: course.link
//     });

//     setEditId(course.id);
//   };

//   /* =========================
//      DELETE COURSE
//   ========================= */
//   const handleDelete = async (id) => {
//     const confirm = await Swal.fire({
//       title: "Delete Course?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Delete",
//       confirmButtonColor: "#ff4d6d"
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       const res = await fetch(
//         `${api_domain}/delete_course.php?key=${api_key}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             token: schoolToken,
//             id
//           })
//         }
//       );

//       const data = await res.json();

//       if (!data.success) throw new Error(data.error);

//       Swal.fire("Deleted", "Course removed", "success");

//       fetchCourses();

//     } catch (err) {
//       Swal.fire("Error", err.message, "error");
//     }
//   };

//   return (
//     <Container>

//       {/* ================= FORM ================= */}
//       <Card>

//         <Title>{editId ? "Edit Course" : "Create Course"}</Title>

//       <Label>Course Code</Label>
// <Input
//   name="code"
//   value={form.code}
//   onChange={handleChange}
//   placeholder="Enter course code"
// />

// <Label>Course Title</Label>
// <Input
//   name="title"
//   value={form.title}
//   onChange={handleChange}
//   placeholder="Enter course title"
// />

// <Label>Unit</Label>
// <Input
//   type="number"
//   name="unit"
//   value={form.unit}
//   onChange={handleChange}
//   placeholder="Enter unit value"
// />

// <Label>Google Meet Link (Enter the google meeting link for this course)</Label>
// <Input
//   name="link"
//   value={form.link}
//   onChange={handleChange}
//   placeholder="Paste Google Meet link"
// />
//         <Button onClick={handleSubmit} disabled={loading}>
//           {loading ? "Saving..." : editId ? "Update Course" : "Create Course"}
//         </Button>

//       </Card>

//       {/* ================= LIST ================= */}
//       <List>

//         <h3 style={{ color: "#7b61ff" }}>Courses</h3>

//         {courses.map((c) => (
//           <Item key={c.id}>

//             <strong>{c.code}</strong> - {c.title}

//             <Small>Unit: {c.unit}</Small>

//             <Row>
//               <Btn onClick={() => handleEdit(c)}>Edit</Btn>
//               <Danger onClick={() => handleDelete(c.id)}>Delete</Danger>
//             </Row>

//           </Item>
//         ))}

//       </List>

//     </Container>
//   );
// };

// export default CreateCourse;




// const Container = styled.div`
//   padding: 5px;
// `;

// const Card = styled.div`
//   padding: 5px;
//   margin-bottom: 5px;
// `;

// const Title = styled.h3`
//   margin: 5px 0;
//   color: #7b61ff;
// `;

// const Label = styled.label`
//   display: block;
//   margin: 5px 0 2px 0;
//   font-size: 12px;
//   font-weight: 700;
//   color: #7b61ff; /* theme purple */
//   letter-spacing: 0.2px;
// `;

// const Input = styled.input`
//   width: 100%;
//   padding: 5px;
//   margin-bottom: 5px;
// `;

// const Button = styled.button`
//   padding: 5px;
//   background: #7b61ff;
//   color: white;
//   border: none;
// `;

// const List = styled.div`
//   padding: 5px;
// `;

// const Item = styled.div`
//   padding: 5px;
//   border: 1px solid #ddd;
//   margin-bottom: 5px;
// `;

// const Row = styled.div`
//   display: flex;
//   gap: 5px;
//   margin-top: 5px;
// `;

// const Btn = styled.button`
//   padding: 5px;
//   background: #28a745;
//   color: white;
//   border: none;
// `;

// const Danger = styled.button`
//   padding: 5px;
//   background: #ff4d6d;
//   color: white;
//   border: none;
// `;

// const Small = styled.div`
//   font-size: 12px;
// `;



import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";

const ManageCourses = () => {
  const { api_domain, api_key } = useContext(Context);
  const schoolToken = useSelector((state) => state.schoolToken);
  const schoolInfo = useSelector((state) => state.schoolInfo);

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    code: "",
    title: "",
    unit: 1,
    status: "C",
    link: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     FETCH COURSES (READ)
  ========================= */
  const fetchCourses = async () => {
    try {
      const res = await fetch(`${api_domain}/get_courses.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id }),
      });

      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  /* =========================
     RESET FORM
  ========================= */
  const resetForm = () => {
    setForm({ code: "", title: "", unit: 1, status: "C", link: "" });
    setEditId(null);
  };

  const closeModal = () => {
    resetForm();
    setModalOpen(false);
  };

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    if (
      !form.code?.trim() ||
      !form.title?.trim() ||
      !form.link?.trim() ||
      !form.status?.trim() ||
      Number(form.unit) <= 0
    ) {
      Swal.fire("Error", "All fields are required", "error");
      return false;
    }
    return true;
  };

  /* =========================
     CREATE OR UPDATE
  ========================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    const confirm = await Swal.fire({
      title: editId ? "Update Course?" : "Create Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#7b61ff",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const endpoint = editId ? "update_course.php" : "create_course.php";

      const res = await fetch(`${api_domain}/${endpoint}?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, ...(editId && { id: editId }), ...form }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      Swal.fire("Success", data.message);
      closeModal();
      fetchCourses();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EDIT COURSE
  ========================= */
  const handleEdit = (course) => {
    setForm({
      code: course.code,
      title: course.title,
      unit: course.unit,
      status: course.status,
      link: course.link,
    });
    setEditId(course.id);
    setModalOpen(true);
  };

  /* =========================
     DELETE COURSE
  ========================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff4d6d",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({text:"Please wait..."})
    Swal.showLoading();

    try {
      const res = await fetch(`${api_domain}/delete_course.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, id }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      Swal.fire("Deleted", "Course removed", "success");
      fetchCourses();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <Container>

      {/* ================= HEADER ROW ================= */}
      <HeaderRow>
        <PageTitle>Courses</PageTitle>
        <AddButton onClick={() => setModalOpen(true)}>+ Add Course</AddButton>
      </HeaderRow>

      {/* ================= COURSE LIST ================= */}
      <List>
        {courses.length === 0 && (
          <Empty>No courses yet. Click "Add Course" to get started.</Empty>
        )}
        {courses.map((c) => (
          <Item key={c.id}>
<CourseInfo>
  <strong>{c.code.toUpperCase()}</strong> — {c.title.charAt(0).toUpperCase() + c.title.slice(1)}
  <Small>Unit: {c.unit}</Small>
</CourseInfo>
            <Row>
              <Btn onClick={() => handleEdit(c)}>Edit</Btn>
              <Danger onClick={() => handleDelete(c.id)}>Delete</Danger>
            </Row>
          </Item>
        ))}
      </List>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>

            <ModalHeader>
              <ModalTitle>{editId ? "Edit Course" : "Add Course"}</ModalTitle>
              <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            </ModalHeader>

            <Label>Course Code</Label>
            <Input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Enter course code"
            />

            <Label>Course Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter course title"
            />

            <Label>Unit</Label>
            <Input
              type="number"
              name="unit"
              value={form.unit}
              onChange={handleChange}
              placeholder="Enter unit value"
            />

            <Label>Google Meet Link</Label>
            <Input
              name="link"
              value={form.link}
              onChange={handleChange}
              placeholder="Paste Google Meet link"
            />

            <ModalFooter>
              <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
              <SubmitBtn onClick={handleSubmit} disabled={loading}>
                {loading ? "Saving..." : editId ? "Update Course" : "Create Course"}
              </SubmitBtn>
            </ModalFooter>

          </Modal>
        </Overlay>
      )}

    </Container>
  );
};

export default ManageCourses;


/* =====================
   STYLED COMPONENTS
===================== */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-12px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  padding: 10px;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const PageTitle = styled.h3`
  margin: 0;
  color: #7b61ff;
`;

const AddButton = styled.button`
  padding: 7px 14px;
  background: #7b61ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;

  &:hover {
    background: #6a50ee;
  }
`;

const List = styled.div`
  padding: 5px 0;
  overflow-y:scroll;
  height:400px;
`;

const Empty = styled.p`
  color: #999;
  font-size: 13px;
  text-align: center;
  margin-top: 20px;
`;

const Item = styled.div`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
`;

const CourseInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Row = styled.div`
  display: flex;
  gap: 6px;
`;

const Btn = styled.button`
  padding: 5px 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover { background: #218838; }
`;

const Danger = styled.button`
  padding: 5px 10px;
  background: #ff4d6d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover { background: #e0003a; }
`;

const Small = styled.div`
  font-size: 12px;
  color: #666;
`;

/* ---- Modal ---- */

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  animation: ${fadeIn} 0.2s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  color: #7b61ff;
  font-size: 16px;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  color: #999;
  padding: 0 4px;

  &:hover { color: #333; }
`;

const Label = styled.label`
  display: block;
  margin: 8px 0 3px;
  font-size: 12px;
  font-weight: 700;
  color: #7b61ff;
  letter-spacing: 0.2px;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px 8px;
  margin-bottom: 4px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 13px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7b61ff;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
`;

const CancelBtn = styled.button`
  padding: 7px 16px;
  background: #f0f0f0;
  color: #555;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;

  &:hover { background: #e0e0e0; }
`;

const SubmitBtn = styled.button`
  padding: 7px 16px;
  background: #7b61ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;

  &:hover { background: #6a50ee; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;
