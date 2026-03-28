import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

import {
  Document,
  Packer,
  Paragraph,
  Table as DocxTable,
  TableRow as DocxRow,
  TableCell as DocxCell,
  TextRun,
} from "docx";

import { saveAs } from "file-saver";
import { Label } from "@/components/ui/label";

export function AnnouncementPage() {
  // const [mode, setMode] = useState<Mode>("table");

  // ===== TABLE STATE =====
  const [rows, setRows] = useState(1);
  const [cols, setCols] = useState(1);
  const [data, setData] = useState<string[][]>(
    Array.from({ length: 1 }, () => Array(1).fill("")),
  );

  // ===== DOCUMENT STATE =====
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const date = useRef("");
  const [content, setContent] = useState("");
  const tableName = useRef("")

  // ===== TABLE HELPERS =====
  const updateCell = (r: number, c: number, value: string) => {
    const copy = [...data];
    copy[r][c] = value;
    setData(copy);
  };

  const setRow = (type: "add" | "remove") => {
     if (type === "remove") {
      setRows((r) => r - 1);
      setData((d) => d.slice(0, d.length - 1));
    } else {
      setRows((r) => r + 1);
      setData((d) => [...d, Array(cols).fill("")]);
    }
  };

  const setCol = (type: "add" | "remove") => {
     if (type === "remove") {
      setCols((c) => c - 1);
      setData((d) => d.map((row) => row.slice(0, row.length - 1)));
    } else {
      setCols((c) => c + 1);
      setData((d) => d.map((row) => [...row, ""]));
    }
  };

  // ===== EXPORT FUNCTION =====
  const exportToWord = async () => {

      const table = new DocxTable({
        rows: data.map(
          (row) =>
            new DocxRow({
              children: row.map(
                (cell) =>
                  new DocxCell({
                    children: [new Paragraph(cell || " ")],
                  }),
              ),
            }),
        ),
      });


      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [new TextRun({ text: title || "", bold: true, size: 32 })],
              }),
              new Paragraph(author?`Author: ${author}` : ""),
              new Paragraph(""),
              new Paragraph(content || ""),
              new Paragraph(""),
              new Paragraph(""),
              new Paragraph(tableName.current || ""),
              table? table : new Paragraph(""),
              new Paragraph(""),
              new Paragraph(""),
              new Paragraph(date.current || new Date().toLocaleString()),
            ],
          },
        ],
      });

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "document.docx");
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* MODE SWITCH */}
      {/* <div className="flex gap-2">
        <Button onClick={() => setMode("table")}>Table Mode</Button>
        <Button onClick={() => setMode("document")}>Document Mode</Button>
      </div>

      {/* TABLE MODE }
      { mode === "table" && ( */}

        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
        />
        <Input type="date" onChange={e=> date.current = e.currentTarget.value}  />
          {/* <Input placeholder="Date" value={date} onChange={e => setDate(e.target.value)} /> */}
          <textarea
            className="w-full h-40 border rounded p-2"
            placeholder="Write your announcement..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      {/* )} */}
                <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Button onClick={() => setRow("add")}>Add Row</Button>
              <Button variant={"destructive"} onClick={() => setRow("remove")} disabled={rows === 1}>Remove Row</Button>
            </div>
            <div className="flex flex-col gap-2">
              <Button onClick={() => setCol("add")}>Add Column</Button>
              <Button variant={"destructive"} onClick={() => setCol("remove")} disabled={cols === 1}>Remove Column</Button>
            </div>
            <div className="flex flex-col gap-2 items-center justify-center">
              <Label htmlFor="table-nameID">Table Name</Label >
              <Input id="table-nameID" onChange={e=> tableName.current = e.currentTarget.value}/>
            </div>
          </div>
          <Table>
            <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            {Array.from({ length: cols }).map((_, i) => {
              return (
                  <TableHead key={i}>Col {i+1}</TableHead>
                )})}
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((row, r) => (
                <TableRow key={r}>
                  <TableCell>
                    row {r + 1}
                  </TableCell>
                  {row.map((cell, c) => (
                    <TableCell key={c}>
                      <Input
                        value={cell}
                        onChange={(e) =>
                          updateCell(r, c, e.currentTarget.value)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        {/* </>
      )}

      {/* DOCUMENT MODE }
      {mode === "document" && ( */}


      {/* EXPORT */}
      <Button onClick={exportToWord}>Export to Word</Button>
    </div>
  );
}
