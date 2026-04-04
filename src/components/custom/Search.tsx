"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

type StudentIndex = {
  name: string;
  grade: string;
  class: string;
};

export default function StudentSearchDialog() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<StudentIndex[]>([]);
  const [query, setQuery] = useState("");

  // 🔥 Fetch once when dialog opens
  useEffect(() => {
    if (open && data.length === 0) {
      axios.get("/api/students-index").then((res) => {
        setData(res.data);
      });
    }
  }, [open]);

  // 🔥 Simple filtering (fast enough for your case)
  const results = useMemo(() => {
    if (!query.trim()) return [];

    return data
       .filter((s) => looseMatch(s.name, query))
      // .slice(0, 20); // limit results
  }, [query, data]);
function looseMatch(text: string, query: string) {
  text = text.toLowerCase();
  query = query.toLowerCase();

  let i = 0; // pointer for text
  let j = 0; // pointer for query

  while (i < text.length && j < query.length) {
    if (text[i] === query[j]) {
      j++;
    }
    i++;
  }

  return j === query.length;
}
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex justify-center gap-10 w-170"><Search />Search</Button>
      </DialogTrigger>

      <DialogContent className="max-w-md duration-200">
        <DialogHeader>
          <DialogTitle>Search Student</DialogTitle>
          <DialogDescription>Search for any student in any grade or class</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            autoFocus
            placeholder="Type student name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="max-h-75 overflow-y-auto space-y-2">
            {results.length === 0 && query && (
              <div className="text-sm text-muted-foreground">
                No results found
              </div>
            )}

            {results.map((s, i) => (
              <div
                key={i}
                className="border rounded p-2 hover:bg-muted transition"
              >
                <Link
                    to={{
    pathname: `/grades/${s.grade}/${s.class}`,
    search: `?student="${s.name}"`,
  }}
                >
                  <div className="font-medium">{s.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Grade {s.grade} — Class {s.class}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}