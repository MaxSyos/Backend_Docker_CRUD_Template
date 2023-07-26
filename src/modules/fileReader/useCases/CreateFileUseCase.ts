import { inject, injectable } from "tsyringe";
import { ICreateFilesDTO } from "../dtos/ICreateFilesDTO";
import { IFilesRepository } from "../repositories/IFilesRepository";
import { Readable } from "stream";
import readLine from "readline";

@injectable()
class CreateFileUseCase {
  constructor(
    @inject("FileRepository")
    private fileRepository: IFilesRepository
  ) {}

  async execute({id, matricula, nome, dataCobranca, valor}: ICreateFilesDTO) {
    const file = await this.fileRepository.create({
      id, 
      matricula, 
      nome, 
      dataCobranca, 
      valor
    });

    return file;
  }

}

export { CreateFileUseCase };
