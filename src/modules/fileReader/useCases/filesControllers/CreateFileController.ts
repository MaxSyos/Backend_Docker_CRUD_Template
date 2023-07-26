import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFileUseCase } from "../CreateFileUseCase";


export class CreateFileController {
  async handle(request: Request, response: Response) {
    const { matricula, nome, dataCobranca, valor } = request.body;

    const createFileUseCase = container.resolve(CreateFileUseCase);
    const file = await createFileUseCase.execute({
      matricula, 
      nome, 
      dataCobranca, 
      valor
    });

    return response.status(201).json(file);
  }
}