import { createNote, deleteNoteById, editNote, getAllNotes, getNoteById } from "../controller/noteController.js";
import express from "express";

const router = express.Router();

router.get("/note", getAllNotes);
router.post("/note", createNote);
router.get("/note/:id", getNoteById);
router.delete("/note/:id", deleteNoteById);
router.put("/note/:id", editNote);

export default router;