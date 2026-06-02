import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";

const ManageDepartments = () => {
  const { api_domain, api_key, departments, fetchDepartments } = useContext(Context);
  const schoolToken = useSelector((state) => state.schoolToken);
  const schoolInfo = useSelector((state) => state.schoolInfo);

  const [loading, setLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* =========================
     FETCH DEPARTMENTS (READ)
  ========================= */
  useEffect(() => {
    fetchDepartments();
  }, []);

  /* =========================
     RESET FORM
  ========================= */
  const resetForm = () => {
    setForm({ name: "", code: "" });
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
    if (!form.name?.trim() || !form.code?.trim()) {
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
      title: editId ? "Update Department?" : "Create Department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#7b61ff",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const endpoint = editId ? "update_department.php" : "create_department.php";

      const res = await fetch(`${api_domain}/${endpoint}?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id: schoolInfo.id,
          ...(editId && { id: editId }),
          ...form,
        }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      Swal.fire("Success", data.message);
      closeModal();
      fetchDepartments();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     EDIT DEPARTMENT
  ========================= */
  const handleEdit = (dept) => {
    setForm({
      name: dept.name,
      code: dept.code,
    });
    setEditId(dept.id);
    setModalOpen(true);
  };

  /* =========================
     DELETE DEPARTMENT
  ========================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Department?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff4d6d",
    });

    if (!confirm.isConfirmed) return;

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await fetch(`${api_domain}/delete_department.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, id }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      Swal.fire("Deleted", "Department removed", "success");
      fetchDepartments();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filteredDepartments = departments.filter((dept) => {
    const q = search.toLowerCase().trim();
    return (
      dept.code?.toLowerCase().includes(q) ||
      dept.name?.toLowerCase().includes(q)
    );
  });

  return (
    <Container>

      {/* ================= HEADER ROW ================= */}
      <HeaderRow>
        <PageTitle>Departments (Example: Computer Engineering, etc) ({filteredDepartments.length})</PageTitle>
        <AddButton onClick={() => setModalOpen(true)}>+ Add Department</AddButton>
      </HeaderRow>

      <ImportantNote>
        <strong>Important Notice: </strong>
        Ensure that all departments are correctly entered before assigning students or lecturers to them. Deleting a department in the future will affect all users already linked to it.

        <br /><br />

        If you want to change the department name or department code, use the <strong>Edit</strong> button instead of deleting. Editing will update the same department while maintaining its ID.

        <br /><br />

        Adding a new department instead of editing an existing one will create a new ID. Users already assigned to the old department will lose their association, and related data may no longer be linked correctly.
      </ImportantNote>

      {/* ================= SEARCH ================= */}
      <SearchWrapper>
        <SearchInput
          type="text"
          placeholder="Search by department name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <ClearSearchBtn onClick={() => setSearch("")}>✕</ClearSearchBtn>
        )}
      </SearchWrapper>

      {/* ================= DEPARTMENT LIST ================= */}
      <List>
        {departments.length === 0 && (
          <Empty>
            {search
              ? "No matching departments found."
              : 'No departments yet. Click "Add Department" to get started.'}
          </Empty>
        )}
        {filteredDepartments.map((dept) => (
          <Item key={dept.id}>
            <DeptInfo>
              <strong>{dept.code.toUpperCase()}</strong> —{" "}
              {dept.name.charAt(0).toUpperCase() + dept.name.slice(1)}
            </DeptInfo>
            <Row>
              <Btn onClick={() => handleEdit(dept)}>Edit</Btn>
              <Danger onClick={() => handleDelete(dept.id)}>Delete</Danger>
            </Row>
          </Item>
        ))}
      </List>

      {/* ================= MODAL ================= */}
      {modalOpen && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>

            <ModalHeader>
              <ModalTitle>{editId ? "Edit Department" : "Add Department"}</ModalTitle>
              <CloseBtn onClick={closeModal}>&times;</CloseBtn>
            </ModalHeader>

            <Label>Department Name</Label>
            <Input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter department name"
            />

            <Label>Department Code</Label>
            <Input
              name="code"
              value={form.code}
              onChange={handleChange}
              placeholder="Enter department code"
            />

            <ModalFooter>
              <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
              <SubmitBtn onClick={handleSubmit} disabled={loading}>
                {loading
                  ? "Saving..."
                  : editId
                  ? "Update Department"
                  : "Create Department"}
              </SubmitBtn>
            </ModalFooter>

          </Modal>
        </Overlay>
      )}

    </Container>
  );
};

export default ManageDepartments;


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
  overflow-y: scroll;
  height: 400px;
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

const DeptInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 13px;
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

  &:hover {
    background: #218838;
  }
`;

const Danger = styled.button`
  padding: 5px 10px;
  background: #ff4d6d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;

  &:hover {
    background: #e0003a;
  }
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
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
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

  &:hover {
    color: #333;
  }
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

  &:hover {
    background: #e0e0e0;
  }
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

  &:hover {
    background: #6a50ee;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 13px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #7b61ff;
  }
`;

const ClearSearchBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: red;
  color: white;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #e5e5e5;
    color: #222;
  }
`;

const ImportantNote = styled.div`
  background: #fff4e5;
  border-left: 5px solid #ff9800;
  padding: 12px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 1.5;
  color: #5a3b00;
  border-radius: 6px;
`;
