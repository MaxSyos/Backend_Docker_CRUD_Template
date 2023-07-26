import { File } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { ICreateFilesDTO } from "../../dtos/ICreateFilesDTO";
import { IFilesRepository } from "../IFilesRepository";

class FileRepository implements IFilesRepository {

  async create({  matricula, nome, dataCobranca, valor }: ICreateFilesDTO): Promise<File> {
    const file = await prismaClient.file.create({
      data: {
        matricula,
        nome,
        dataCobranca,
        valor,
      },
    });
    return file;
  }

  async findByMatricula(matricula: string): Promise<File> {
    const file = await prismaClient.file.findFirst({
      where: {
        matricula
      },
    });

    return file as File;5
  }

  async findById(id: string): Promise<File> {
    const file = await prismaClient.file.findUnique({
      where: {
        id,
      },
    });

    return file as File;
  }
}

export { FileRepository };
