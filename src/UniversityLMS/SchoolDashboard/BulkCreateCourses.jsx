import React, { useState, useContext, useRef } from "react";
import styled, { keyframes } from "styled-components";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import { Context } from "../../components/Context";

/* ─────────────────────────────────────────
   EXPECTED CSV COLUMNS (order-independent)
───────────────────────────────────────── */
const REQUIRED_COLS = ["code", "title", "unit", "status", "link"];

/* ─────────────────────────────────────────
   CSV TEMPLATE DOWNLOAD
───────────────────────────────────────── */
const downloadTemplate = () => {
  const header = REQUIRED_COLS.join(",");
  const example = "CSC101,Introduction to Computing,3,C,https://meet.google.com/abc-defg-hij";
  const blob = new Blob([`${header}\n${example}`], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "courses_template.csv";
  a.click();
  URL.revokeObjectURL(url);
};

/* ─────────────────────────────────────────
   PARSE CSV TEXT → ARRAY OF OBJECTS
───────────────────────────────────────── */
const parseCSV = (text) => {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return { error: "CSV file is empty or has no data rows." };

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());

  const missing = REQUIRED_COLS.filter((c) => !headers.includes(c));
  if (missing.length > 0) {
    return { error: `Missing columns: ${missing.join(", ")}` };
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split(",").map((v) => v.trim());
    const row = {};
    headers.forEach((h, idx) => {
      row[h] = values[idx] ?? "";
    });

    rows.push({
      _rowNum: i + 1,
      code: row.code,
      title: row.title,
      unit: row.unit,
      status: row.status || "C",
      link: row.link,
      _error: !row.code || !row.title || !row.link || Number(row.unit) <= 0
        ? "Missing or invalid fields"
        : null,
    });
  }

  if (rows.length === 0) return { error: "No valid data rows found." };
  return { rows };
};

/* ═══════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════ */
const BulkCreateCourses = () => {
  const { api_domain, api_key } = useContext(Context);
  const schoolInfo = useSelector((state) => state.schoolInfo);

  const fileInputRef = useRef(null);

  const [rows, setRows] = useState([]);
  const [fileName, setFileName] = useState("");
  const [parseError, setParseError] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null); // { inserted, skipped, errors }
  const [dragging, setDragging] = useState(false);

  /* ── Handle file ── */
  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.endsWith(".csv")) {
      setParseError("Please upload a .csv file.");
      setRows([]);
      return;
    }

    setFileName(file.name);
    setParseError("");
    setResults(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const { rows: parsed, error } = parseCSV(e.target.result);
      if (error) {
        setParseError(error);
        setRows([]);
      } else {
        setRows(parsed);
      }
    };
    reader.readAsText(file);
  };

  const onFileChange = (e) => handleFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  /* ── Remove a row from preview ── */
  const removeRow = (rowNum) => {
    setRows((prev) => prev.filter((r) => r._rowNum !== rowNum));
  };

  /* ── Clear everything ── */
  const reset = () => {
    setRows([]);
    setFileName("");
    setParseError("");
    setResults(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /* ── Submit ── */
  const handleUpload = async () => {
    const validRows = rows.filter((r) => !r._error);
    if (validRows.length === 0) {
      Swal.fire("Error", "No valid rows to upload.", "error");
      return;
    }

    const confirm = await Swal.fire({
      title: `Upload ${validRows.length} course${validRows.length > 1 ? "s" : ""}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, upload",
      confirmButtonColor: "#7b61ff",
    });

    if (!confirm.isConfirmed) return;

    try {
      setLoading(true);

      const courses = validRows.map(({ code, title, unit, status, link }) => ({
        code,
        title,
        unit: Number(unit),
        status,
        link,
      }));

      const res = await fetch(`${api_domain}/bulk_create_courses.php?key=${api_key}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school_id: schoolInfo.id, courses }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error);

      setResults(data.results); // { inserted, skipped, errors: [] }
      setRows([]);
      setFileName("");

    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const validCount = rows.filter((r) => !r._error).length;
  const invalidCount = rows.filter((r) => r._error).length;

  /* ══════════ RENDER ══════════ */
  return (
    <Page>

      <TopBar>
        <div>
          <PageTitle>Bulk Upload Courses</PageTitle>
          <PageSub>Upload a CSV file to create multiple courses at once</PageSub>
        </div>
        <TemplateBtn onClick={downloadTemplate}>⬇ Download Template</TemplateBtn>
      </TopBar>

      {/* ── Drop Zone ── */}
      {rows.length === 0 && !results && (
        <DropZone
          $active={dragging}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <DropIcon>📂</DropIcon>
          <DropText>
            {dragging ? "Drop it here!" : "Drag & drop your CSV here"}
          </DropText>
          <DropSub>or click to browse</DropSub>
          <HiddenInput
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={onFileChange}
          />
        </DropZone>
      )}

      {/* ── Parse error ── */}
      {parseError && <ErrorBanner>⚠ {parseError}</ErrorBanner>}

      {/* ── Preview table ── */}
      {rows.length > 0 && (
        <>
          <PreviewHeader>
            <PreviewMeta>
              <FileName>📄 {fileName}</FileName>
              <Badge $color="#28a745">{validCount} valid</Badge>
              {invalidCount > 0 && (
                <Badge $color="#ff4d6d">{invalidCount} invalid</Badge>
              )}
            </PreviewMeta>
            <PreviewActions>
              <GhostBtn onClick={reset}>✕ Clear</GhostBtn>
              <UploadBtn onClick={handleUpload} disabled={loading || validCount === 0}>
                {loading ? "Uploading..." : `Upload ${validCount} Course${validCount !== 1 ? "s" : ""}`}
              </UploadBtn>
            </PreviewActions>
          </PreviewHeader>

          <TableWrap>
            <Table>
              <thead>
                <tr>
                  <Th>Row</Th>
                  <Th>Code</Th>
                  <Th>Title</Th>
                  <Th>Unit</Th>
                  <Th>Status</Th>
                  <Th>Meet Link</Th>
                  <Th>Status</Th>
                  <Th></Th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <Tr key={r._rowNum} $invalid={!!r._error}>
                    <Td>{r._rowNum}</Td>
                    <Td><code>{r.code}</code></Td>
                    <Td>{r.title ? r.title.charAt(0).toUpperCase() + r.title.slice(1) : ""}</Td>
                    <Td>{r.unit}</Td>
                    <Td>{r.status}</Td>
                    <Td>
                      <LinkCell title={r.link}>
                        {r.link ? r.link.replace("https://", "").slice(0, 28) + (r.link.length > 28 ? "…" : "") : "—"}
                      </LinkCell>
                    </Td>
                    <Td>
                      {r._error
                        ? <StatusBadge $ok={false}>✕ {r._error}</StatusBadge>
                        : <StatusBadge $ok={true}>✓ OK</StatusBadge>}
                    </Td>
                    <Td>
                      <RemoveBtn onClick={() => removeRow(r._rowNum)} title="Remove row">×</RemoveBtn>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </TableWrap>

          {invalidCount > 0 && (
            <HintBox>
              Rows marked invalid will be skipped during upload. Remove or fix them in your CSV and re-upload.
            </HintBox>
          )}
        </>
      )}

      {/* ── Results summary ── */}
      {results && (
        <ResultCard>
          <ResultTitle>Upload Complete</ResultTitle>
          <ResultGrid>
            <ResultStat $color="#28a745">
              <big>{results.inserted}</big>
              <span>Inserted</span>
            </ResultStat>
            <ResultStat $color="#f0a500">
              <big>{results.skipped}</big>
              <span>Skipped (duplicates)</span>
            </ResultStat>
            {results.errors?.length > 0 && (
              <ResultStat $color="#ff4d6d">
                <big>{results.errors.length}</big>
                <span>Errors</span>
              </ResultStat>
            )}
          </ResultGrid>
          {results.errors?.length > 0 && (
            <ErrorList>
              {results.errors.map((e, i) => <li key={i}>{e}</li>)}
            </ErrorList>
          )}
          <GhostBtn onClick={reset} style={{ marginTop: "14px" }}>Upload another file</GhostBtn>
        </ResultCard>
      )}

    </Page>
  );
};

export default BulkCreateCourses;


/* ══════════════════════════════
   STYLED COMPONENTS
══════════════════════════════ */

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Page = styled.div`
  padding: 10px;
  animation: ${fadeUp} 0.25s ease;
`;

const TopBar = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
`;

const PageTitle = styled.h3`
  margin: 0 0 2px;
  color: #7b61ff;
  font-size: 16px;
`;

const PageSub = styled.p`
  margin: 0;
  font-size: 12px;
  color: #888;
`;

const TemplateBtn = styled.button`
  padding: 7px 13px;
  font-size: 12px;
  font-weight: 600;
  border: 1.5px solid #7b61ff;
  background: transparent;
  color: #7b61ff;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;

  &:hover { background: #f3f0ff; }
`;

/* Drop zone */
const DropZone = styled.div`
  border: 2px dashed ${({ $active }) => ($active ? "#7b61ff" : "#ccc")};
  border-radius: 10px;
  padding: 40px 20px;
  text-align: center;
  cursor: pointer;
  background: ${({ $active }) => ($active ? "#f3f0ff" : "#fafafa")};
  transition: all 0.2s;

  &:hover {
    border-color: #7b61ff;
    background: #f3f0ff;
  }
`;

const DropIcon = styled.div`
  font-size: 36px;
  margin-bottom: 8px;
`;

const DropText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #444;
`;

const DropSub = styled.div`
  font-size: 12px;
  color: #999;
  margin-top: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

/* Error */
const ErrorBanner = styled.div`
  background: #fff0f3;
  border: 1px solid #ff4d6d;
  color: #c0002a;
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 13px;
  margin-top: 12px;
`;

/* Preview */
const PreviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
`;

const PreviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const FileName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #444;
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 20px;
  background: ${({ $color }) => $color + "18"};
  color: ${({ $color }) => $color};
  border: 1px solid ${({ $color }) => $color + "44"};
`;

const PreviewActions = styled.div`
  display: flex;
  gap: 8px;
`;

const GhostBtn = styled.button`
  padding: 6px 13px;
  font-size: 12px;
  border: 1px solid #ddd;
  background: white;
  color: #555;
  border-radius: 5px;
  cursor: pointer;

  &:hover { background: #f5f5f5; }
`;

const UploadBtn = styled.button`
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 700;
  background: #7b61ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover { background: #6a50ee; }
  &:disabled { opacity: 0.55; cursor: not-allowed; }
`;

/* Table */
const TableWrap = styled.div`
  overflow-x: auto;
  border: 1px solid #eee;
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
`;

const Th = styled.th`
  text-align: left;
  padding: 8px 10px;
  background: #f7f7f7;
  border-bottom: 1px solid #eee;
  font-weight: 700;
  color: #555;
  white-space: nowrap;
`;

const Tr = styled.tr`
  background: ${({ $invalid }) => ($invalid ? "#fff8f8" : "white")};

  &:not(:last-child) td {
    border-bottom: 1px solid #f0f0f0;
  }
`;

const Td = styled.td`
  padding: 7px 10px;
  color: #333;
  vertical-align: middle;
`;

const LinkCell = styled.span`
  font-size: 11px;
  color: #888;
`;

const StatusBadge = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: ${({ $ok }) => ($ok ? "#28a745" : "#ff4d6d")};
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #bbb;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;

  &:hover { color: #ff4d6d; }
`;

const HintBox = styled.div`
  margin-top: 8px;
  font-size: 11px;
  color: #999;
  padding: 6px 10px;
  background: #fffbe6;
  border-left: 3px solid #f0a500;
  border-radius: 4px;
`;

/* Results */
const ResultCard = styled.div`
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 20px;
  animation: ${fadeUp} 0.2s ease;
`;

const ResultTitle = styled.h4`
  margin: 0 0 14px;
  color: #7b61ff;
  font-size: 14px;
`;

const ResultGrid = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
`;

const ResultStat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  border-radius: 8px;
  background: ${({ $color }) => $color + "12"};
  border: 1px solid ${({ $color }) => $color + "33"};
  min-width: 80px;

  big {
    font-size: 24px;
    font-weight: 800;
    color: ${({ $color }) => $color};
  }

  span {
    font-size: 11px;
    color: #777;
    margin-top: 2px;
  }
`;

const ErrorList = styled.ul`
  margin: 12px 0 0;
  padding-left: 18px;
  font-size: 12px;
  color: #ff4d6d;

  li { margin-bottom: 4px; }
`;
