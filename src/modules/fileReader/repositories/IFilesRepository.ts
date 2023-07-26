import { File } from "@prisma/client";
import { ICreateFilesDTO } from "../dtos/ICreateFilesDTO";

interface IFilesRepository {
  create({ id, matricula, nome, dataCobranca, valor }: ICreateFilesDTO): Promise<File>;
  findByMatricula(matricula: string): Promise<File>;
  findById(id: string): Promise<File>;
}

export { IFilesRepository };
