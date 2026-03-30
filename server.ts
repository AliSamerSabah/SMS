import express from "express";
import type { Request as req, Response as res } from "express";
import path from "path";
import multer from "multer";
import fs from "fs/promises";
import { AcademicStage, classes, Days, type Student } from "./src/types";
import { baseStages, days } from "./src/consts";

const app = express();
const dataDIR = path.join(process.cwd(), "data");
const imgDIR = path.join(process.cwd(), "src", "assets", "images");
  const schoolFolder = path.join(dataDIR, "metadata");

app.use(express.json());
app.use("/images", express.static(imgDIR));
app.use("/JSON", express.static(dataDIR));

interface pathParams {
  fileFolder: string;
  fileName: string;
}

function saveImage() {
  const storage = multer.diskStorage({
    destination: async (req, _file, cb) => {
      const { fileFolder } = req.params as any;
      if (!fileFolder || fileFolder.includes("..")) {
        return cb(new Error("Invalid folder name"), "");
      }
      const fullPath = path.join(imgDIR, fileFolder);
      await fs.mkdir(fullPath, { recursive: true });

      cb(null, fullPath);
    },

    filename: (req, file, cb) => {
      try {
        const extension = path.extname(file.originalname);
        const { fileName } = req.params as any;
        if (!fileName) {
          return cb(new Error("File name missing"), "");
        }
        const baseName = path.basename(fileName, extension);

        const safeName = baseName
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "");

        return cb(null, `${safeName}${extension}`);
      } catch {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    },
  });

  return multer({
    storage,
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        cb(new Error("Only image files are allowed"));
      } else {
        cb(null, true);
      }
    },
    limits: {
      fileSize: 100 * 1024 * 1024, // 10MB is more realistic
    },
  }).single("image");
}

function saveSetupImage() {
  const storage = multer.diskStorage({
    destination: async (_req, file, cb) => {
      let targetFolder = "users";

      if (file.fieldname === "schoolLogo") targetFolder = "ui";

      const fullPath = path.join(imgDIR, targetFolder);
      await fs.mkdir(fullPath, { recursive: true });

      cb(null, fullPath);
    },

    filename: (_req, file, cb) => {
      try {
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);

        const safeName = baseName
          .trim()
          .replace(/\s+/g, "_")
          .replace(/[^a-zA-Z0-9_]/g, "");

        return cb(null, `${safeName}${extension}`);
      } catch {
        cb(null, Date.now() + path.extname(file.originalname));
      }
    },
  });

  return multer({
    storage,
    fileFilter: (_req, file, cb) => {
      if (!file.mimetype.startsWith("image/")) {
        cb(new Error("Only image files are allowed"));
      } else {
        cb(null, true);
      }
    },
    limits: {
      fileSize: 100 * 1024 * 1024, // 10MB is more realistic
    },
  });
}

app.post(
  "/setup",
  async (req, res) => {
    try {
      const users = JSON.parse(req.body.users);
      const CPG = JSON.parse(req.body.CPG);


      const finalUsers = users.map((user: any) => {
        return {
          name: user.name,
          email: user.email,
          password: user.password,
        };
      });



      await fs.writeFile(
        path.join(schoolFolder, "school.json"),
        JSON.stringify({ users: finalUsers }, null, 2),
        "utf8",
      );





   function generateClasses(count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    String.fromCharCode(65 + i)
  );
}

const periods: AcademicStage[] = [
  "1st", "2nd", "3rd", "4th", "5th", "6th"
];

for (const grade of baseStages) {
  const tt: any = {}; // ✅ reset per grade

  const gradeCount = CPG[grade];
  const classes = generateClasses(gradeCount);

  for (const cls of classes) {
    tt[cls] = {}; // ✅ initialize class
    await fs.mkdir(path.join(dataDIR, grade), { recursive: true });
    const myPath = path.join(dataDIR, grade, `${cls}.json`);
      await fs.writeFile(
    myPath,
    JSON.stringify([], null, 2),
    "utf8"
  );
    for (const day of days) {
      tt[cls][day] = {}; // ✅ initialize day

      for (const period of periods) {
        tt[cls][day][period] = "";
      }
    }
  }

  const timeTablePath = path.join(dataDIR, grade, "timeTable.json");

  await fs.writeFile(
    timeTablePath,
    JSON.stringify(tt, null, 2),
    "utf8"
  );
}
      // const days: Days[] = ["Sun", "Mon", "Tue", "Wed", "Thu"];
      // const classes: classes[] = ["A", "B", "C", "D", "E", "F", "G"];

      // Optional: your subjects list
      // const subjects = [
      //   "Mathematics",
      //   "Physics",
      //   "Chemistry",
      //   "Biology",
      //   "Arabic",
      //   "English",
      //   "French",
      //   "Computer",
      //   "Geography",
      //   "Moral Education",
      //   "Religious Education",
      //   "Art",
      //   "Physical Education",
      // ];
        // function generateEmptyTimeTable() {
        //   const table: any = {};

        //   for (const cls of classes) {
        //     table[cls] = {};

        //     for (const day of days) {
        //       table[cls][day] = {};

        //       for (const period of periods) {
        //         table[cls][day][period] = ""; // empty subject
        //       }
        //     }
        //   }

        //   return table;
        // }
      

      res.json({
        message: "Users saved successfully",
        users: finalUsers,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Upload failed" });
    }
  },
);

app.post(
  "/createImage/:fileFolder/:fileName",
  saveImage(),
  (req: req, res: res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }
      
      console.log("good boy")
      return res.status(201).json({
        success: true,
        message: "Image uploaded successfully",
        file: {
          filename: req.file.filename,
          path: req.file.path,
          size: req.file.size,
        },
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
);

app.post(
  "/createFile/:fileFolder/:fileName",
  async (req: req<pathParams>, res: res) => {
    try {
      const { fileFolder, fileName } = req.params;
      const filePath = path.join(dataDIR, fileFolder, fileName);
      const json = JSON.stringify(req.body, null, 2);
      await fs.writeFile(filePath, json, "utf8");
      res.status(200).json({
        message: `File "${fileName}" rewritten in folder "${fileFolder}"`,
        data: req.body,
      });
    } catch (err) {
      console.error(err);
      res.status(404).send("Failed to rewrite the file");
    }
  },
);

let studentIndex: {
  name: string;
  grade: string;
  class: string;
}[] = [];
async function buildIndex() {
  const grades = await fs.readdir(dataDIR);

  const index: typeof studentIndex = [];

  for (const grade of grades) {
    const gradePath = path.join(dataDIR, grade);
    const files = await fs.readdir(gradePath);
    if (grade.includes("metadata")) continue;

    for (const file of files) {
      if (!file.endsWith(".json") || file.startsWith("timeTable")) continue;

      const className = file.replace(".json", "");
      const filePath = path.join(gradePath, file);

      const content = await fs.readFile(filePath, "utf-8");
      const students: Student[] = JSON.parse(content);

      for (const student of students) {
        index.push({
          name: student.personalInfo.name,
          grade,
          class: className,
        });
      }
    }
  }

  studentIndex = index;
}

app.get("/students-index", async (_req, res) => {
  await buildIndex();
  res.json(studentIndex);
});

app.get("/classroom/:grades/:classes", async (req, res) => {
  const { grades, classes } = req.params;
  const studentPath = path.join(dataDIR, grades, `${classes}.json`);
  const tablePath = path.join(dataDIR, grades, "timeTable.json");
  let student;
  let timeTable;
  try {
    timeTable = JSON.parse(await fs.readFile(tablePath, "utf-8"));
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
  const students = JSON.parse(await fs.readFile(studentPath, "utf-8"));
    res.status(200).json({
      students,
      timeTable,
    });
});

app.listen(3000, async () => {
  await fs.mkdir(dataDIR, { recursive: true });
  await fs.mkdir(schoolFolder, { recursive: true });
  console.log("Server running on port 3000");
});
