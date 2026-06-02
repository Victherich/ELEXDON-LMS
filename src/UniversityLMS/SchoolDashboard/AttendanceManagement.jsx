import React, { useState, useEffect, useContext } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";
import {
  FaClipboardList, FaPlus, FaTrash, FaEye, FaToggleOn,
  FaToggleOff, FaTimes, FaUserCheck, FaBook, FaUsers,
  FaCalendarAlt, FaChalkboard,
} from "react-icons/fa";

/* ─────────────────────────────────────
   THEME
───────────────────────────────────── */
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
  orange: "#e07b00",
};

/* ─────────────────────────────────────
   ANIMATIONS
───────────────────────────────────── */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideCard = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─────────────────────────────────────
   STYLED COMPONENTS
───────────────────────────────────── */
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

/* grid */
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 8px;
`;

/* attendance card */
const Card = styled.div`
  background: ${C.white};
  border: 1px solid ${C.border};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  animation: ${slideCard} 0.25s ease both;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0,86,179,0.1);
    border-color: rgba(0,86,179,0.22);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 6px;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-size: 0.88rem;
  font-weight: 800;
  color: ${C.text};
  flex: 1;
  line-height: 1.3;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  flex-shrink: 0;
  background: ${(p) => p.$active ? "#e8fff0" : "#fff0f2"};
  color: ${(p) => p.$active ? C.green : C.red};
  border: 1px solid ${(p) => p.$active ? "#a3e6bc" : "#ffb3c1"};
`;

const MetaRow = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.75rem;
  color: ${C.muted};
`;

const TypeBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.68rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${C.sky};
  color: ${C.blue};
  border: 1px solid rgba(0,86,179,0.18);
  text-transform: capitalize;
`;

const CardActions = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 4px;
  flex-wrap: wrap;
`;

const ActionBtn = styled.button`
  flex: 1;
  min-width: 60px;
  padding: 5px 8px;
  border: none;
  border-radius: 7px;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  transition: opacity 0.2s, transform 0.15s;
  -webkit-tap-highlight-color: transparent;

  background: ${(p) =>
    p.$delete ? "#fff0f2" :
    p.$toggle ? "#fff8e8" :
    C.sky};

  color: ${(p) =>
    p.$delete ? C.red :
    p.$toggle ? C.orange :
    C.blue};

  border: 1px solid ${(p) =>
    p.$delete ? "#ffb3c1" :
    p.$toggle ? "#ffd59e" :
    "rgba(0,86,179,0.18)"};

  &:hover { opacity: 0.8; transform: scale(1.03); }
  &:active { opacity: 0.65; }
`;

/* loading */
const LoadingText = styled.p`
  text-align: center;
  color: ${C.blue};
  font-weight: 600;
  padding: 40px;
`;

const Empty = styled.div`
  text-align: center;
  color: ${C.muted};
  font-size: 13px;
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  grid-column: 1 / -1;
`;

/* ── OVERLAY / MODAL ── */
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0,20,60,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px;
`;

const ModalBox = styled.div`
  background: ${C.white};
  border-radius: 14px;
  padding: 14px;
  width: 100%;
  max-width: ${(p) => p.$wide ? "700px" : "480px"};
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 14px 40px rgba(0,86,179,0.2);
  animation: ${fadeIn} 0.22s ease;
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const ModalTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: ${C.blue};
  display: flex;
  align-items: center;
  gap: 7px;
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

/* form */
const FormRow = styled.div`
  margin-bottom: 8px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 3px;
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
  min-height: 80px;
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

const WarningNote = styled.div`
  background: #fff4e5;
  border-left: 4px solid ${C.orange};
  border-radius: 7px;
  padding: 8px 10px;
  font-size: 11.5px;
  color: #5a3b00;
  line-height: 1.5;
  margin-bottom: 8px;
`;

/* participants table */
const TableWrap = styled.div`
  max-height: 380px;
  overflow-y: auto;
  border: 1px solid ${C.border};
  border-radius: 8px;
  margin-top: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;

  th, td {
    padding: 7px 9px;
    border-bottom: 1px solid ${C.border};
    text-align: left;
  }

  th {
    background: linear-gradient(135deg, ${C.blue}, ${C.light});
    color: white;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 2;
  }

  tr:last-child td { border-bottom: none; }
  tr:hover td { background: ${C.sky}; }
`;

const NoParticipants = styled.p`
  text-align: center;
  color: ${C.muted};
  font-size: 13px;
  padding: 20px;
`;

/* ─────────────────────────────────────
   COMPONENT
───────────────────────────────────── */
const AttendanceManagement = () => {
  const { api_domain, api_key, courses } = useContext(Context);
  const schoolInfo  = useSelector((state) => state.schoolInfo);
  const schoolToken = useSelector((state) => state.schoolToken);

  const [attendanceList, setAttendanceList] = useState([]);
  const [loading, setLoading]               = useState(false);
  const [createModal, setCreateModal]       = useState(false);
  const [participantsModal, setParticipantsModal] = useState(false);
  const [participants, setParticipants]     = useState([]);
  const [selectedItem, setSelectedItem]     = useState(null);
  const [formLoading, setFormLoading]       = useState(false);

  const [form, setForm] = useState({
    type:        "class",
    title:       "",
    description: "",
    course_id:   "",
  });

  console.log(courses)

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* =========================
     FETCH ATTENDANCE
  ========================= */
  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${api_domain}/get_attendance.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id }),
      });
      const data = await res.json();
      if (data.success) setAttendanceList(data.attendance);
      else Swal.fire("Error", data.error || "Failed to fetch attendance", "error");
    } catch {
      Swal.fire("Error", "Network error. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAttendance(); }, []);

  /* =========================
     VIEW PARTICIPANTS
  ========================= */
  const handleViewParticipants = async (item) => {
    Swal.fire({text:"Please wait..."});
    Swal.showLoading();
    setSelectedItem(item);
    try {
      const res = await fetch(`${api_domain}/get_attendance_participants.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendance_id: item.id, school_id: schoolInfo.id }),
      });
      const data = await res.json();
      if (data.success) {
        setParticipants(data.participants);
        setParticipantsModal(true);
      } else {
        Swal.fire("Error", data.error || "Failed to load participants", "error");
      }
    } catch(err) {
      Swal.fire("Error", "Server error", "error");
      console.error(err)
    }finally{
      Swal.close();
    }
  };

  /* =========================
     TOGGLE STATUS
  ========================= */
  const handleToggleStatus = async (item) => {
    const newStatus = item.status === "active" ? "inactive" : "active";
    const confirm = await Swal.fire({
      title: `Set to ${newStatus.toUpperCase()}?`,
      text: `This will mark the attendance as ${newStatus}.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: `Yes, set to ${newStatus}`,
      confirmButtonColor: C.blue,
    });
    if (!confirm.isConfirmed) return;
  Swal.fire({text:"Please wait..."});
    Swal.showLoading();
    try {
      const res = await fetch(`${api_domain}/update_attendance_status.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, status: newStatus, school_id: schoolInfo.id }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Updated", `Status changed to ${newStatus}`, "success");
        fetchAttendance();
      } else {
        Swal.fire("Error", data.error || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Server error", "error");
    }finally{
      Swal.close();
    }
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Attendance?",
      text: "This record will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: C.red,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    Swal.fire({ text: "Please wait..." });
    Swal.showLoading();

    try {
      const res = await fetch(`${api_domain}/delete_attendance.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, school_id: schoolInfo.id }),
      });
      const data = await res.json();
      if (data.success) {
        Swal.fire("Deleted!", "Attendance deleted successfully", "success");
        fetchAttendance();
      } else {
        Swal.fire("Error", data.error || "Failed to delete", "error");
      }
    } catch {
      Swal.fire("Error", "Server error", "error");
    }
  };

  /* =========================
     CREATE ATTENDANCE
  ========================= */
  const resetForm = () => setForm({ type: "class", title: "", description: "", course_id: "" });
  const closeCreateModal = () => { resetForm(); setCreateModal(false); };

  const validateForm = () => {
    if (!form.title.trim()) {
      Swal.fire("Validation", "Title is required.", "warning");
      return false;
    }
    if (form.type === "class" && !form.course_id) {
      Swal.fire("Validation", "Please select a course for class attendance.", "warning");
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    const confirm = await Swal.fire({
      title: "Confirm Attendance Creation",
      html: `<p style="font-size:14px;">For <b>authenticity</b>, once this attendance sheet is created, <b>it cannot be edited</b>. Please ensure all information is accurate before proceeding.</p>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Create",
      cancelButtonText: "Cancel",
      confirmButtonColor: C.blue,
      reverseButtons: true,
    });
    if (!confirm.isConfirmed) return;

    try {
      setFormLoading(true);
      const res = await fetch(`${api_domain}/create_attendance.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          school_id:   schoolInfo.id,
          type:        form.type,
          title:       form.title,
          description: form.description,
          course_id:   form.type === "class" ? form.course_id : null,
        }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      Swal.fire("Success", "Attendance created successfully!", "success");
      closeCreateModal();
      fetchAttendance();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setFormLoading(false);
    }
  };

  /* helpers */
  const getCourseTitle = (courseId) => {
    if (!courseId) return "—";
    const course = (courses || []).find((c) => c.id === parseInt(courseId));
    return course ? `${course.code} — ${course.title}` : "Unknown Course";
  };

  /* ─────────────────────────────────────
     RENDER
  ───────────────────────────────────── */
  return (
    <Container>

      {/* ── HEADER ── */}
      <Header>
        <HeaderLeft>
          <IconWrap><FaClipboardList /></IconWrap>
          <div>
            <PageTitle>Attendance Management</PageTitle>
            <PageSub>{attendanceList.length} sheet{attendanceList.length !== 1 ? "s" : ""}</PageSub>
          </div>
        </HeaderLeft>
        <AddButton onClick={() => setCreateModal(true)}>
          <FaPlus /> Create Attendance
        </AddButton>
      </Header>

      {/* ── GRID ── */}
      {loading ? (
        <LoadingText>Loading attendance sheets...</LoadingText>
      ) : (
        <Grid>
          {attendanceList.length === 0 && (
            <Empty>
              <FaClipboardList style={{ fontSize: "2rem", opacity: 0.2 }} />
              <p>No attendance sheets yet. Click "Create Attendance" to get started.</p>
            </Empty>
          )}

          {attendanceList.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>
                  {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
                </CardTitle>
                <StatusBadge $active={item.status === "active"}>
                  {item.status}
                </StatusBadge>
              </CardHeader>

              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                <TypeBadge>
                  {item.type === "class" ? <FaChalkboard /> : <FaUsers />}
                  {item.type}
                </TypeBadge>
              </div>

              {item.course_id && (
                <MetaRow>
                  <FaBook style={{ color: C.blue, fontSize: 11 }} />
                  {getCourseTitle(item.course_id)}
                </MetaRow>
              )}

              {item.description && (
                <MetaRow>{item.description}</MetaRow>
              )}

              <MetaRow>
                <FaCalendarAlt style={{ color: C.blue, fontSize: 11 }} />
                {new Date(item.created_at).toLocaleString()}
              </MetaRow>

              <CardActions>
                <ActionBtn onClick={() => handleViewParticipants(item)}>
                  <FaEye /> Participants
                </ActionBtn>
                <ActionBtn $toggle onClick={() => handleToggleStatus(item)}>
                  {item.status === "active"
                    ? <><FaToggleOff /> Deactivate</>
                    : <><FaToggleOn /> Activate</>}
                </ActionBtn>
                <ActionBtn $delete onClick={() => handleDelete(item.id)}>
                  <FaTrash /> Delete
                </ActionBtn>
              </CardActions>
            </Card>
          ))}
        </Grid>
      )}

      {/* ── CREATE MODAL ── */}
      {createModal && (
        <Overlay onClick={(e) => e.target === e.currentTarget && closeCreateModal()}>
          <ModalBox>
            <ModalHeader>
              <ModalTitle>
                <FaClipboardList style={{ color: C.blue }} />
                Create Attendance Sheet
              </ModalTitle>
              <CloseBtn onClick={closeCreateModal}><FaTimes /></CloseBtn>
            </ModalHeader>

            <WarningNote>
              ⚠️ For authenticity, once created this attendance sheet <strong>cannot be edited</strong>. Please ensure all information is accurate before proceeding.
            </WarningNote>

            <FormRow>
              <Label>Type</Label>
              <Select name="type" value={form.type} onChange={handleFormChange}>
                <option value="class">Class</option>
                <option value="meeting">Meeting</option>
              </Select>
            </FormRow>

            {form.type === "class" && (
              <FormRow>
                <Label>Course</Label>
                <Select name="course_id" value={form.course_id} onChange={handleFormChange}>
                  <option value="">-- Select course --</option>
                  {(courses || []).map((c) => (
                    <option key={c.id} value={c.id}>{c.code} — {c.title}</option>
                  ))}
                </Select>
              </FormRow>
            )}

            <FormRow>
              <Label>Title</Label>
              <Input
                name="title"
                value={form.title}
                onChange={handleFormChange}
                placeholder="e.g. Week 4 Lecture"
              />
            </FormRow>

            <FormRow>
              <Label>Description <span style={{ color: C.muted, fontWeight: 400, fontSize: 11 }}>(optional)</span></Label>
              <Textarea
                name="description"
                value={form.description}
                onChange={handleFormChange}
                placeholder="Optional description..."
              />
            </FormRow>

            <ModalFooter>
              <CancelBtn onClick={closeCreateModal}>Cancel</CancelBtn>
              <SubmitBtn onClick={handleCreate} disabled={formLoading}>
                {formLoading ? "Creating..." : "Create Attendance"}
              </SubmitBtn>
            </ModalFooter>
          </ModalBox>
        </Overlay>
      )}

      {/* ── PARTICIPANTS MODAL ── */}
      {participantsModal && (
        <Overlay onClick={(e) => e.target === e.currentTarget && setParticipantsModal(false)}>
          <ModalBox $wide>
            <ModalHeader>
              <ModalTitle>
                <FaUserCheck style={{ color: C.blue }} />
                Participants — {selectedItem?.title}
              </ModalTitle>
              <CloseBtn onClick={() => setParticipantsModal(false)}><FaTimes /></CloseBtn>
            </ModalHeader>

            {participants.length === 0 ? (
              <NoParticipants>No participants have clocked in yet.</NoParticipants>
            ) : (
              <TableWrap>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Clock In Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {participants.map((p, i) => (
                      <tr key={p.id}>
                        <td>{i + 1}</td>
                        <td>{p.user_id}</td>
                        <td>{p.identifier}</td>
                        <td style={{ textTransform: "capitalize" }}>{p.user_type}</td>
                        <td>{new Date(p.clock_in_time).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </TableWrap>
            )}
          </ModalBox>
        </Overlay>
      )}

    </Container>
  );
};

export default AttendanceManagement;
