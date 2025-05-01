import todoModel from "../models/todo.model.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await todoModel.find({ userId: req.user._id });
    return res.json({
      status: true,
      statusCode: 200,
      message: "Todos fetched",
      data: todos,
    });
  } catch {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error fetching todos",
      data: [],
    });
  }
};

export const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await todoModel.create({ title, userId: req.user._id });
    return res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Todo created",
      data: todo,
    });
  } catch {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error creating todo",
    });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;

  try {
    const todo = await todoModel.findById(id);

    if (!todo || todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }

    // Update fields if provided
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    await todo.save();

    return res.json({
      status: true,
      statusCode: 200,
      message: "Todo updated",
      data: todo,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Update error",
    });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await todoModel.findById(id);
    if (!todo || todo.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        status: false,
        statusCode: 403,
        message: "Access denied",
      });
    }
    await todoModel.deleteOne({ _id: id });
    return res.json({
      status: true,
      statusCode: 200,
      message: "Todo deleted",
    });
  } catch {
    return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Delete error",
    });
  }
};
