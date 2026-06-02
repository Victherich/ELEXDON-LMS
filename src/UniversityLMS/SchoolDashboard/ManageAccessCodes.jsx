import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";
import { FaKey, FaPlus, FaTrash, FaTimes, FaSearch, FaUserCheck, FaClock, FaInfinity } from "react-icons/fa";

const ManageAccessCodes = () => {
  const { api_domain, api_key } = useContext(Context);
  const schoolInfo  = useSelector((state) => state.schoolInfo);

  const [codes, setCodes]         = useState([]);
  const [loading, setLoading]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch]       = useState("");

  const [form, setForm] = useState({
    code:        "",
    description: "",
    type:        "permanent",
    role:        "lecturer",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  /* =========================
     FETCH CODES
  ========================= */
  const fetchCodes = async () => {
    try {
      const res = await fetch(`${api_domain}/get_access_codes.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id }),
      });
      const data = await res.json();
      if (data.success) setCodes(data.codes);
      else Swal.fire("Error", data.error || "Failed to fetch codes", "error");
    } catch {
      Swal.fire("Error", "Network error. Try again.", "error");
    }
  };

  useEffect(() => { fetchCodes(); }, []);

  /* =========================
     RESET FORM
  ========================= */
  const resetForm  = () => setForm({ code: "", description: "", type: "permanent", role: "lecturer" });
  const closeModal = () => { resetForm(); setModalOpen(false); };

  /* =========================
     VALIDATION
  ========================= */
  const validate = () => {
    if (!form.code?.trim()) {
      Swal.fire("Error", "Access code is required", "error");
      return false;
    }
    if (!form.type || !form.role) {
      Swal.fire("Error", "Type and role are required", "error");
      return false;
    }
    return true;
  };

  /* =========================
     CREATE
  ========================= */
  const handleSubmit = async () => {
    if (!validate()) return;

    const confirm = await Swal.fire({
      title: "Add Access Code?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Add",
      confirmButtonColor: "#0056b3",
    });
    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      const res = await fetch(`${api_domain}/create_access_code.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, ...form }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      Swal.fire("Success", data.message, "success");
      closeModal();
      fetchCodes();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Access Code?",
      text: "This code will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff4d6d",
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await fetch(`${api_domain}/delete_access_code.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      Swal.fire("Deleted", "Access code removed", "success");
      fetchCodes();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  /* =========================
     FILTER
  ========================= */
  const filtered = codes.filter((c) => {
    const q = search.toLowerCase().trim();
    return (
      c.code?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q) ||
      c.role?.toLowerCase().includes(q) ||
      c.type?.toLowerCase().includes(q) ||
      c.used_by?.toLowerCase().includes(q)
    );
  });

  const generateAccessCode = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  setForm((prev) => ({
    ...prev,
    code,
  }));
};

  return (
    <Container>

      {/* ── HEADER ── */}
      <Header>
        <HeaderLeft>
          <IconWrap><FaKey /></IconWrap>
          <div>
            <PageTitle>Access Codes</PageTitle>
            <PageSub>{filtered.length} code{filtered.length !== 1 ? "s" : ""}</PageSub>
          </div>
        </HeaderLeft>
        <AddButton onClick={() => setModalOpen(true)}>
          <FaPlus /> New Code
        </AddButton>
      </Header>
      <ul>
 <li> - Generate and manange access codes that lecturers and admins will use to sign up to your school and gain access to their individual portals.</li>
      <li> - If you select <b>"temporal"</b> when creating access code, it will be automatically deleted immediatly after the first user have used it.</li>
      <li> - If you select <b>"permanent"</b> , it can be used by multile users to sign up without getting delete until you manually delete it from here.</li>

      </ul>
     <br/>
      {/* ── SEARCH ── */}
      <SearchWrapper>
        <SearchIcon><FaSearch /></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search by code, role, type, description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <ClearBtn onClick={() => setSearch("")}><FaTimes /></ClearBtn>}
      </SearchWrapper>

      {/* ── LIST ── */}
      <List>
        {filtered.length === 0 && (
          <Empty>
            <FaKey style={{ fontSize: "2rem", opacity: 0.2, marginBottom: 8 }} />
            <p>{search ? "No matching codes found." : 'No access codes yet. Click "New Code" to get started.'}</p>
          </Empty>
        )}

        {filtered.map((item) => (
          <Card key={item.id}>
            <CardTop>
              <CardDot />
              <CardBadgeRow>
                <CodeBadge>{item.code}</CodeBadge>
                <TypeBadge $temporal={item.type === "temporal"}>
                  {item.type === "temporal" ? <><FaClock /> Temporal</> : <><FaInfinity /> Permanent</>}
                </TypeBadge>
                <RoleBadge>{item.role}</RoleBadge>
              </CardBadgeRow>
              <ActionBtn onClick={() => handleDelete(item.id)} title="Delete">
                <FaTrash />
              </ActionBtn>
            </CardTop>

            {item.description && <CardDesc>{item.description}</CardDesc>}

            <CardMeta>
              <UsedBy $used={!!item.used_by}>
                <FaUserCheck />
                {item.used_by ? <>Used by: <strong>{item.used_by}</strong></> : "Not used yet"}
              </UsedBy>
              {item.created_at && (
                <CardDate>{new Date(item.created_at).toLocaleString()}</CardDate>
              )}
            </CardMeta>

          </Card>
        ))}
      </List>

      {/* ── MODAL ── */}
      {modalOpen && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>

            <ModalHeader>
              <ModalTitleRow>
                <FaKey style={{ color: "#0056b3", fontSize: "1rem" }} />
                <ModalTitle>New Access Code</ModalTitle>
              </ModalTitleRow>
              <CloseBtn onClick={closeModal}><FaTimes /></CloseBtn>
            </ModalHeader>

            <Label>Access Code <Req>*</Req></Label>
         <InputRow>
  <Input
    name="code"
    value={form.code}
    onChange={handleChange}
    placeholder="e.g. LEC2025XYZ"
    maxLength={16}
    readOnly
  />

  <GenerateBtn
    type="button"
    onClick={generateAccessCode}
  >
    Generate
  </GenerateBtn>
</InputRow>

            <Label>Description <Optional>(optional)</Optional></Label>
            <Input
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g. For new Computer Science lecturers"
            />

            <Row2>
              <FieldGroup>
                <Label>Type <Req>*</Req></Label>
                <Select name="type" value={form.type} onChange={handleChange}>
                  <option value="permanent">Permanent</option>
                  <option value="temporal">Temporal</option>
                </Select>
              </FieldGroup>

              <FieldGroup>
                <Label>Role <Req>*</Req></Label>
                <Select name="role" value={form.role} onChange={handleChange}>
                  <option value="lecturer">Lecturer</option>
                  <option value="admin">Admin</option>
                </Select>
              </FieldGroup>
            </Row2>

            <ModalFooter>
              <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
              <SubmitBtn onClick={handleSubmit} disabled={loading}>
                {loading ? "Adding..." : "Add Code"}
              </SubmitBtn>
            </ModalFooter>

          </Modal>
        </Overlay>
      )}

    </Container>
  );
};

export default ManageAccessCodes;


/* =====================
   STYLED COMPONENTS
===================== */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideCard = keyframes`
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const C = {
  blue:   "#0056b3",
  light:  "#1a8fe3",
  bg:     "#f2f6fb",
  white:  "#ffffff",
  text:   "#1a2540",
  muted:  "#6b7a99",
  border: "rgba(0,86,179,0.12)",
  red:    "#ff4d6d",
  green:  "#28a745",
  orange: "#e07b00",
};

const Container = styled.div`
  padding: 10px;
  background: ${C.bg};
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
`;

const IconWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
`;

const PageTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 800;
  color: ${C.blue};
`;

const PageSub = styled.p`
  margin: 0;
  font-size: 0.72rem;
  color: ${C.muted};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  transition: opacity 0.2s;
  &:hover { opacity: 0.88; }
`;

const SearchWrapper = styled.div`
  position: relative;
  margin-bottom: 12px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${C.muted};
  font-size: 13px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 9px 36px 9px 32px;
  border: 1.5px solid ${C.border};
  border-radius: 8px;
  font-size: 13px;
  box-sizing: border-box;
  background: ${C.white};
  outline: none;
  &:focus { border-color: ${C.blue}; }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  border: none;
  border-radius: 50%;
  background: ${C.red};
  color: white;
  cursor: pointer;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 520px;
  overflow-y: auto;
  padding-right: 2px;
`;

const Empty = styled.div`
  text-align: center;
  color: ${C.muted};
  font-size: 13px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  p { margin: 0; }
`;

const Card = styled.div`
  background: ${C.white};
  border: 1px solid ${C.border};
  border-radius: 10px;
  padding: 10px 12px;
  animation: ${slideCard} 0.25s ease both;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0,86,179,0.1);
    border-color: rgba(0,86,179,0.22);
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  flex-wrap: wrap;
`;

const CardDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  flex-shrink: 0;
`;

const CardBadgeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex: 1;
  flex-wrap: wrap;
`;

const CodeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  background: #e8f2ff;
  color: ${C.blue};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  padding: 2px 10px;
  border-radius: 20px;
  border: 1px solid rgba(0,86,179,0.15);
  font-family: 'Courier New', monospace;
`;

const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${(p) => p.$temporal ? "#fff4e5" : "#e8fff0"};
  color: ${(p) => p.$temporal ? C.orange : C.green};
  border: 1px solid ${(p) => p.$temporal ? "#ffd59e" : "#a3e6bc"};
`;

const RoleBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: #f3f0ff;
  color: #5b3fc8;
  border: 1px solid #d0c6ff;
  text-transform: capitalize;
`;

const ActionBtn = styled.button`
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff0f2;
  color: ${C.red};
  flex-shrink: 0;
  transition: opacity 0.2s, transform 0.15s;
  &:hover { opacity: 0.8; transform: scale(1.08); }
`;

const CardDesc = styled.p`
  margin: 0 0 5px;
  font-size: 0.78rem;
  color: ${C.muted};
  line-height: 1.5;
`;

const CardMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 4px;
`;

const UsedBy = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${(p) => p.$used ? C.green : C.muted};
  background: ${(p) => p.$used ? "#e8fff0" : "#f2f6fb"};
  border: 1px solid ${(p) => p.$used ? "#a3e6bc" : C.border};
  padding: 2px 8px;
  border-radius: 20px;
`;

const CardDate = styled.p`
  margin: 0;
  font-size: 0.68rem;
  color: rgba(107,122,153,0.6);
`;

/* modal */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,20,60,0.48);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
`;

const Modal = styled.div`
  background: ${C.white};
  border-radius: 12px;
  padding: 14px;
  width: 100%;
  max-width: 460px;
  box-shadow: 0 12px 40px rgba(0,86,179,0.18);
  animation: ${fadeIn} 0.22s ease;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ModalTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 7px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${C.blue};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: ${C.muted};
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover { color: ${C.text}; }
`;

const Label = styled.label`
  display: block;
  margin: 7px 0 3px;
  font-size: 12px;
  font-weight: 700;
  color: ${C.blue};
`;

const Req = styled.span`
  color: ${C.red};
  margin-left: 2px;
`;

const Optional = styled.span`
  color: ${C.muted};
  font-weight: 400;
  font-size: 11px;
  margin-left: 4px;
`;

const InputRow = styled.div`
  display: flex;
  gap: 8px;
`;

const GenerateBtn = styled.button`
  padding: 0 14px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  white-space: nowrap;
  font-size: 12px;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});

  &:hover {
    opacity: 0.9;
  }
`;


const Input = styled.input`
  width: 100%;
  padding: 7px 9px;
  border: 1.5px solid ${C.border};
  border-radius: 7px;
  font-size: 13px;
  box-sizing: border-box;
  outline: none;
  &:focus { border-color: ${C.blue}; }
`;

const Select = styled.select`
  width: 100%;
  padding: 7px 9px;
  border: 1.5px solid ${C.border};
  border-radius: 7px;
  font-size: 13px;
  box-sizing: border-box;
  outline: none;
  background: ${C.white};
  cursor: pointer;
  &:focus { border-color: ${C.blue}; }
`;

const Row2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 4px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 7px;
  margin-top: 12px;
`;

const CancelBtn = styled.button`
  padding: 7px 16px;
  background: ${C.bg};
  color: ${C.muted};
  border: 1.5px solid ${C.border};
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  &:hover { background: #e8edf5; }
`;

const SubmitBtn = styled.button`
  padding: 7px 18px;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: opacity 0.2s;
  &:hover { opacity: 0.88; }
  &:disabled { opacity: 0.55; cursor: not-allowed; }
`;
