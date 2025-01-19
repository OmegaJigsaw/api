import pool from "../models/db.js";

export const getAllUsers = async (req, res) => {
  try {
    const [users] = await pool.query("SELECT * FROM users");
    if (users.length === 0) {
      return res.status(404).json({ message: "404 Users not found" });
    }
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [user] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: "404 User not Found" });
    }
    res.json(user);
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req, res) => {
  try {
    const { nombre, saldo, fecha_nacimiento } = req.body;
    if (!nombre || !saldo) {
      return res.status(400).json({ message: "400 Bad Request" });
    }
    const [user] = await pool.query(
      "INSERT INTO users( nombre, saldo, fecha_nacimiento ) values(? ,? ,?)",
      [nombre, saldo, fecha_nacimiento || null]
    );
    res.status(201).json({ id: user.insertId, ...req.body });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, saldo, fecha_nacimiento } = req.body;

    // VALIDACION CAMPOS REQUERIDOS
    if (!nombre || !saldo) {
      return res.startus(400).json({ message: "400 Bad Request" });
    }
    // VALIDACION DE EXISTENCIA
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "404 User not Found" });
    }

    // ACTUALIZACION DE DATOS
    const [user] = await pool.query(
      "UPDATE users SET nombre = ?, saldo = ?, fecha_nacimiento = ? WHERE id = ?",
      [nombre, saldo, fecha_nacimiento || null, id]
    );
    res.json({ id: user.insertId, ...req.body });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  // Validar que el id esté presente
  if (!id) {
    return res.status(400).json({ message: "400 Bad Request" });
  }

  try {
    // Verificar si el usuario existe
    const [existingUser] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    if (existingUser.length === 0) {
      return res.status(404).json({ message: "404 User not Found" });
    }

    // Eliminar el usuario
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    // Verificar si la eliminación fue exitosa
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found to delete" });
    }

    // Responder con mensaje de éxito
    res.json({ message: "User deleted" });
  } catch {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
