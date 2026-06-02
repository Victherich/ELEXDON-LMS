import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";
import { FaBullhorn, FaPlus, FaEdit, FaTrash, FaTimes, FaSearch } from "react-icons/fa";

const ManageAnnouncements = () => {
  const { api_domain, api_key, announcements, fetchAnnouncements } = useContext(Context);
  const schoolToken = useSelector((state) => state.schoolToken);
  const schoolInfo  = useSelector((state) => state.schoolInfo);

  const [loading, setLoading]     = useState(false);
  const [editId, setEditId]       = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [search, setSearch]       = useState("");

  const [form, setForm] = useState({ title: "", message: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => { fetchAnnouncements(); }, []);

  const resetForm  = () => { setForm({ title: "", message: "" }); setEditId(null); };
  const closeModal = () => { resetForm(); setModalOpen(false); };

  const validate = () => {
    if (!form.title?.trim() || !form.message?.trim()) {
      Swal.fire("Error", "Title and message are required", "error");
      return false;
    }
    return true;
  };

  /* CREATE OR UPDATE */
  const handleSubmit = async () => {
    if (!validate()) return;

    const confirm = await Swal.fire({
      title: editId ? "Update Announcement?" : "Post Announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#0056b3",
    });
    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);
      const endpoint = editId ? "update_announcement.php" : "create_announcement.php";
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
      Swal.fire("Success", data.message, "success");
      closeModal();
      fetchAnnouncements();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  /* EDIT */
  const handleEdit = (item) => {
    setForm({ title: item.title, message: item.message });
    setEditId(item.id);
    setModalOpen(true);
  };

  /* DELETE */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Announcement?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#ff4d6d",
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await fetch(`${api_domain}/delete_announcement.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, id }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      Swal.fire("Deleted", "Announcement removed", "success");
      fetchAnnouncements();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const filtered = (announcements || []).filter((a) => {
    const q = search.toLowerCase().trim();
    return a.title?.toLowerCase().includes(q) || a.message?.toLowerCase().includes(q);
  });

  return (
    <Container>

      {/* ── HEADER ── */}
      <Header>
        <HeaderLeft>
          <IconWrap><FaBullhorn /></IconWrap>
          <div>
            <PageTitle>Announcements</PageTitle>
            <PageSub>{filtered.length} announcement{filtered.length !== 1 ? "s" : ""}</PageSub>
          </div>
        </HeaderLeft>
        <AddButton onClick={() => setModalOpen(true)}>
          <FaPlus /> New Announcement
        </AddButton>
      </Header>

      {/* ── SEARCH ── */}
      <SearchWrapper>
        <SearchIcon><FaSearch /></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search announcements..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <ClearBtn onClick={() => setSearch("")}><FaTimes /></ClearBtn>}
      </SearchWrapper>

      {/* ── LIST ── */}
      <List>
        {filtered.length === 0 && (
          <Empty>
            <FaBullhorn style={{ fontSize: "2rem", opacity: 0.2, marginBottom: 8 }} />
            <p>{search ? "No matching announcements." : 'No announcements yet. Click "New Announcement" to get started.'}</p>
          </Empty>
        )}

        {filtered.map((item) => (
          <Card key={item.id}>
            <CardTop>
              <CardDot />
              <CardTitle>{item.title}</CardTitle>
              <CardActions>
                <ActionBtn $edit onClick={() => handleEdit(item)} title="Edit">
                  <FaEdit />
                </ActionBtn>
                <ActionBtn $delete onClick={() => handleDelete(item.id)} title="Delete">
                  <FaTrash />
                </ActionBtn>
              </CardActions>
            </CardTop>
            <CardMessage>{item.message}</CardMessage>
            {item.created_at && (
              <CardDate>{new Date(item.created_at).toLocaleString()}</CardDate>
            )}
          </Card>
        ))}
      </List>

      {/* ── MODAL ── */}
      {modalOpen && (
        <Overlay onClick={closeModal}>
          <Modal onClick={(e) => e.stopPropagation()}>

            <ModalHeader>
              <ModalTitleRow>
                <FaBullhorn style={{ color: "#0056b3", fontSize: "1rem" }} />
                <ModalTitle>{editId ? "Edit Announcement" : "New Announcement"}</ModalTitle>
              </ModalTitleRow>
              <CloseBtn onClick={closeModal}><FaTimes /></CloseBtn>
            </ModalHeader>

            <Label>Title</Label>
            <Input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter announcement title"
            />

            <Label>Message</Label>
            <Textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your announcement message here..."
              rows={5}
            />

            <ModalFooter>
              <CancelBtn onClick={closeModal}>Cancel</CancelBtn>
              <SubmitBtn onClick={handleSubmit} disabled={loading}>
                {loading ? "Posting..." : editId ? "Update" : "Post Announcement"}
              </SubmitBtn>
            </ModalFooter>

          </Modal>
        </Overlay>
      )}

    </Container>
  );
};

export default ManageAnnouncements;


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
  sky:    "#e8f2ff",
  bg:     "#f2f6fb",
  white:  "#ffffff",
  text:   "#1a2540",
  muted:  "#6b7a99",
  border: "rgba(0,86,179,0.12)",
  red:    "#ff4d6d",
  green:  "#28a745",
};

const Container = styled.div`
  padding: 10px;
  background: ${C.bg};
  min-height: 100vh;
`;

/* header */
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

/* search */
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

/* list */
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

/* announcement card */
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
`;

const CardDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, ${C.blue}, ${C.light});
  flex-shrink: 0;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 700;
  color: ${C.text};
  flex: 1;
`;

const CardActions = styled.div`
  display: flex;
  gap: 5px;
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
  transition: opacity 0.2s, transform 0.15s;

  background: ${(p) => p.$edit ? "#e8f2ff" : "#fff0f2"};
  color: ${(p) => p.$edit ? C.blue : C.red};

  &:hover {
    opacity: 0.8;
    transform: scale(1.08);
  }
`;

const CardMessage = styled.p`
  margin: 0 0 5px;
  font-size: 0.8rem;
  color: ${C.muted};
  line-height: 1.5;
  white-space: pre-wrap;
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
  max-width: 480px;
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

const Textarea = styled.textarea`
  width: 100%;
  padding: 7px 9px;
  border: 1.5px solid ${C.border};
  border-radius: 7px;
  font-size: 13px;
  box-sizing: border-box;
  outline: none;
  resize: vertical;
  font-family: inherit;
  line-height: 1.5;

  &:focus { border-color: ${C.blue}; }
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
