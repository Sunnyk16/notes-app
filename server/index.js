import express from "express";
import cors from "cors";
import mongoose, { model, Schema } from "mongoose";
import Note from "./models/model.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors(
  {
    credentials:true,
    origin:[process.env.ORIGIN1,process.env.ORIGIN2]
  }
));
app.use(express.json());

const connectDb = async () => {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log("connected to database");
};
connectDb();

// port
const port = process.env.PORT || 5000;

// port call
app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

// array
// const NOTES =[];

// api
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "server is running",
    data: null,
  });
});

// to create

app.post("/notes", async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.json({
      success: false,
      message: "fields are required",
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
    message: "node added successfully",
    data: newNote,
  });
});

// to read

app.get("/notes", async (req, res) => {
  const notes = await Note.find();
  res.json({
    success: true,
    message: "data fetched successfully",
    data: notes,
  });
});

// single id

app.get("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOne({
    _id: id,
  });

  res.json({
    success: true,
    message: "data fetched successfully",
    data: note,
  });
});

// update

app.put("/notes/:id", async (req, res) => {
  const { id } = req.params;

  const { title, content, category } = req.body;

  await Note.updateOne(
    { _id: id },
    {
      $set: {
        title: title,
        content: content,
        category: category,
      },
    }
  );
  res.json({
    success: true,
    message: "data updated successfully",
    data: null,
  });
});

// delete

app.delete("/notes/:id", async (req, res) => {
  const { id } = req.params;

  await Note.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "data deleted successfully",
    data: null,
  });
});
