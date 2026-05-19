import { NextFunction, Request, Response } from "express";
import { racesRepository } from "../../domain/repositories/races/races.repository";
import { racesDtoValidator } from "../../domain/dto/races/validator";

export class racesController {
  constructor(public readonly repository: racesRepository) {}

  getRaceses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10 } = req.query as {
        page?: string | number;
        limit?: string | number;
      };

      const searchQueryParams =
        racesDtoValidator.validateSearchRacesParamsQueryDto(req.query);

      const [data, total] = await this.repository.getRaceses(searchQueryParams);

      res.json({
        status: "success",
        result: data,
        total: total,
        totalPages: Math.ceil(total / +limit),
        message: ":)",
      });
    } catch (error) {
      next(error);
    }
  };

  getRacesById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await this.repository.getRacesById(String(id));

      res.json({
        status: "success",
        result: data,
        message: ":)",
      });
    } catch (error) {
      next(error);
    }
  };

  updateRaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const updateBody = racesDtoValidator.validateUpdateDto(req.body);

      const data = await this.repository.updateRaces(updateBody, String(id));

      res.json({
        status: "success",
        result: data,
        message: ":)",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteRaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const data = await this.repository.deleteRaces(String(id));

      res.json({
        status: "success",
        result: data,
        message: ":)",
      });
    } catch (error) {
      next(error);
    }
  };

  createRaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const registerBody = racesDtoValidator.validateCreateDto(req.body);

      const data = await this.repository.createRaces(registerBody);

      res.json({
        status: "success",
        result: data,
        message: ":)",
      });
    } catch (error) {
      next(error);
    }
  };
}
