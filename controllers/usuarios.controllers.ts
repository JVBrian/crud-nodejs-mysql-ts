import { Request, Response } from "express";
import { Usuario } from "../models/ususario";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (!usuario)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });
  res.json(usuario);
};

export const postUsuarios = async (req: Request, res: Response) => {
  const { nombre, email, estado } = req.body;
  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email,
      },
    });

    if (existeEmail)
      return res.status(400).json({
        message: "El email ya está registrado",
      });

    const usuario = await Usuario.create({
      nombre,
      email,
      estado,
    });

    await (await usuario).save();
    res.status(200).json({
      message: "Registro exitoso",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un problema",
    });
  }
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario)
      return res.status(400).json({
        message: "Usuario no encontrado",
      });

    await usuario.update(body);
    res.status(200).json({
      message: "Usuario se ha actualizado",
    });
  } catch (error) {
    res.status(500).json({
      message: "Ha ocurrido un error",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);

  if (!usuario)
    return res.status(404).json({
      message: "Usuario no encontrado",
    });

  await usuario.destroy();
  res.status(200).json({
    message: "Se ha eliminado el usuario",
  });
};
