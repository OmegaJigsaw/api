import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(req, res) {
  const { nombre, saldo, fecha_nacimiento } = req.body;

  // Validar que los parámetros requeridos no estén vacíos
  if (!nombre || typeof saldo !== "number") {
    return res.status(400).json({ error: "Faltan parámetros requeridos o son incorrectos." });
  }

  try {
    // Prisma no tine soporte para el tipo Date, por lo que es necesario hacer un parseo manual
    // Parsear la fecha de nacimiento a un objeto Date si existe 
    const fechaNacimiento = fecha_nacimiento
    ? new Date(fecha_nacimiento + "T00:00:00.000Z")
    : null;

    const user = await prisma.user.create({
      data: {
        nombre,
        saldo,
        fecha_nacimiento: fechaNacimiento,
      },
    });

    res.json(user);
  } catch {
    res.status(500).json({ error: "No se pudo crear el usuario" });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch {
    res.status(500).json({ error: "No se pudo obtener los usuarios" });
  }
}

export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      res.status(404).json({ error: "Usuario no encontrado" });
    } else {
      res.json(user);
    }
  } catch {
    res.status(500).json({ error: "No se pudo obtener el usuario" });
  }
}

export async function updateUser(req, res) {
  const { id } = req.params;
  const { nombre, saldo, fecha_nacimiento } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const fechaNacimiento = fecha_nacimiento
      ? new Date(fecha_nacimiento)
      : null;

    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        nombre,
        saldo,
        fecha_nacimiento: fechaNacimiento,
      },
    });

    res.json(updatedUser);
  } catch {
    res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
}

export async function deleteUser(req, res) {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(204).send();
  } catch {
    res.status(500).json({ error: "No se pudo eliminar el usuario" });
  }
}
