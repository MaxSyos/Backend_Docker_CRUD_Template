
import { Readable } from 'stream';
import readLine from 'readline';
import { container } from 'tsyringe';
import { CreateFileUseCase } from '../../modules/fileReader/useCases/CreateFileUseCase';
import { ICreateFilesDTO } from '../../modules/fileReader/dtos/ICreateFilesDTO';

export async function processCSVFile(file) {
  const { buffer } = file;

  const createFileUseCase = container.resolve(CreateFileUseCase);

  const readableFile = new Readable();
  readableFile.push(buffer);
  readableFile.push(null);
  
  const bookFile = readLine.createInterface({
    input: readableFile,
  });
  
  
  for await (let line of bookFile) {
    const bookLineSplit = line.split(';');
    
    await createFileUseCase.execute({
      matricula: bookLineSplit[1],
      nome: bookLineSplit[2],
      dataCobranca: bookLineSplit[3],
      valor: Number(bookLineSplit[4]),
    });
    
  }
  console.log('console 2', )
  
  
}