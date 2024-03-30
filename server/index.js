// import express from "express";
// import cors from "cors";
// import mongoose, { model, Schema } from "mongoose";
// import Note from "./models/model.js";
// import dotenv from "dotenv";
// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// const connectDb = async () => {
//   await mongoose.connect(process.env.MONGODB_URL);
//   console.log("connected to database");
// };
// connectDb();

// // port
// const port = process.env.PORT || 5000;

// // port call
// app.listen(port, () => {
//   console.log(`server running at port ${port}`);
// });

// // array
// // const NOTES =[];

// // api
// app.get("/health", (req, res) => {
//   res.json({
//     success: true,
//     message: "server is running",
//     data: null,
//   });
// });

// // to create

// app.post("/notes", async (req, res) => {
//   const { title, content, category } = req.body;

//   if (!title || !content || !category) {
//     return res.json({
//       success: false,
//       message: "fields are required",
//       data: null,
//     });
//   }
  



//   const newNote = await Note.create({
//     title: title,
//     content: content,
//     category: category,
//   });

//   res.json({
//     success: true,
//     message: "node added successfully",
//     data: newNote,
//   });
// });

// // to read

// app.get("/notes", async (req, res) => {
//   const notes = await Note.find();
//   res.json({
//     success: true,
//     message: "data fetched successfully",
//     data: notes,
//   });
// });

// // single id

// app.get("/notes/:id", async (req, res) => {
//   const { id } = req.params;

//   const note = await Note.findOne({
//     _id: id,
//   });

//   res.json({
//     success: true,
//     message: "data fetched successfully",
//     data: note,
//   });
// });

// // update

// app.put("/notes/:id", async (req, res) => {
//   const { id } = req.params;

//   const { title, content, category } = req.body;

//   await Note.updateOne(
//     { _id: id },
//     {
//       $set: {
//         title: title,
//         content: content,
//         category: category,
//       },
//     }
//   );
//   res.json({
//     success: true,
//     message: "data updated successfully",
//     data: null,
//   });
// });

// // delete

// app.delete("/notes/:id", async (req, res) => {
//   const { id } = req.params;

//   await Note.deleteOne({ _id: id });
//   res.json({
//     success: true,
//     message: "data deleted successfully",
//     data: null,
//   });
// });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Note from "./models/model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.error("Database connection error:", error);
  }
};
connectDb();

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    data: null,
  });
});

app.post("/notes", async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.json({
      success: false,
      message: "Fields are required",
      data: null,
    });
  }

  const newNote = await Note.create({
    title: title,
    content: content,
    category: category,
  });

  res.json({
    success: true,
    message: "Note added successfully",
    data: newNote,
  });
});

app.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: notes,
    });
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "Data fetched successfully",
      data: note,
    });
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content, category },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "Data updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);
    if (!deletedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
        data: null,
      });
    }
    res.json({
      success: true,
      message: "Data deleted successfully",
      data: null,
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
});
