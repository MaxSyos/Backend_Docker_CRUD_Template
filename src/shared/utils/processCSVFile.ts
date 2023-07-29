import { Readable } from "stream";
import { ICreateFilesDTO } from "../../modules/fileReader/dtos/ICreateFilesDTO";
import readLine from "readline";
import { container } from "tsyringe";
import { CreateFileUseCase } from "../../modules/fileReader/useCases/CreateFileUseCase";

// This function is responsible for processing a CSV file and returning an array of `ICreateFilesDTO` objects.
export const processCSVFile = async (readableFile: Readable) => {
    
  const bookFile = readLine.createInterface({
        input: readableFile,
    })

  const book: ICreateFilesDTO[] = [];

  const createFileUseCase = container.resolve(CreateFileUseCase);

  for await (let line of bookFile) {
    const bookLineSplit = line.split(";");
    
    const file = {
      matricula: bookLineSplit[1],
      nome: bookLineSplit[2],
      dataCobranca: bookLineSplit[3],
      valor: parseFloat(bookLineSplit[4]),
    };
    
    book.push(file);
    
    await createFileUseCase.execute(file);
  }
  console.log(book);
  
  return book;
};