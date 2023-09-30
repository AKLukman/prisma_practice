import { Request, Response } from "express";
import { UserService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.createUser(req.body);
    res.send({
      success: true,
      message: "User created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await UserService.insertOrUpdateProfile(req.body);
    return res.send({
      success: true,
      message: "User created or updated successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAllUser();
    return res.send({
      success: true,
      message: "Get all user successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getSingleUser(parseInt(req.params.id));
    return res.send({
      success: true,
      message: "Get a user successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};
export const UserController = {
  createUser,
  insertOrUpdateProfile,
  getAllUser,
  getSingleUser,
};
