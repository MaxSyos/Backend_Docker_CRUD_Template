import { inject, injectable } from "tsyringe";
import { ICreateFilesDTO } from "../dtos/ICreateFilesDTO";
import { IFilesRepository } from "../repositories/IFilesRepository";
import { Readable } from "stream";
import readLine from "readline";
import { processCSVFile } from "../../../shared/utils/processCSVFile";
import { AppError } from "../../../errors/AppError";


@injectable()
class CreateFileUseCase {
  constructor(
    @inject("FileRepository")
    private fileRepository: IFilesRepository
  ) { }

  async execute({ matricula, nome, dataCobranca, valor }: ICreateFilesDTO) {
    try {
      //const file: any = await this.validateData({ matricula, nome, dataCobranca, valor });

      let book: any = processCSVFile;

      const files: any = [];

      for (const file of book) {
        file.matricula = matricula;
        file.nome = nome;
        file.dataCobranca = dataCobranca;
        file.valor = valor;
        files.push(files);
      }
      console.log(files);
      return await this.fileRepository.create(files);
      
    } catch (error) {
      throw new AppError(error.message);
    }
  }

 /*  private async validateData({ matricula, nome, dataCobranca, valor }: ICreateFilesDTO) {
    
    const errors: any = [];

    if (!matricula) {
      errors.push("A matricula é obrigatória");
    }

    if (!nome) {
      errors.push("O nome é obrigatório");
    }

    if (!dataCobranca) {
      errors.push("A data de cobrança é obrigatória");
    }

    if (!valor) {
      errors.push("O valor é obrigatório");
    }

    if (errors.length > 0) {
      throw new AppError("Ocorreu um grande erro", errors);
    }

    return {
      matricula,
      nome,
      dataCobranca,
      valor,
    };
    
  } */

}


export { CreateFileUseCase };