import { Request, Response } from "express";
import { CategoryService } from "./category.service";

const craeteCategory = async (req: Request, res: Response) => {
  try {
    const result = await CategoryService.craeteCategory(req.body);
    return res.send({
      success: true,
      message: "Category created successfully",
      data: result,
    });
  } catch (error) {
    res.send(error);
  }
};

export const CategoryController = { craeteCategory };
