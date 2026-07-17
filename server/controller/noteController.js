import noteSchema from "../model/note.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await noteSchema.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const createNote = async (req, res) => {
  try {
    const { filename, content } = req.body;
    console.log(req.body);
    const existingFile = await noteSchema.findOne({ filename });
    if (existingFile) {
      return res.status(400).json({
        success: false,
        message: "Filename already exists",
      });
    }
    const newNote = await noteSchema.create({
      filename,
      content,
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteSchema.findById(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteSchema.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Notes not found",
      });
    }
    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const editNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { filename, content } = req.body;

    const updatedNote = await noteSchema.findByIdAndUpdate(
      id,
      {
        filename,
        content,
      },
      {
        new: true,
        runValidators: true, 
      }
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Note updated successfully",
      data: updatedNote,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
