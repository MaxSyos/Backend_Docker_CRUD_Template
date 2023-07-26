// processXLSXFile.js
import xlsx from 'xlsx';
import { container } from 'tsyringe';
import { CreateFileUseCase } from '../../modules/fileReader/useCases/CreateFileUseCase';

export async function processXLSXFile(file) {
  const { buffer } = file;

  const createFileUseCase = container.resolve(CreateFileUseCase);

  const workbook = xlsx.read(buffer);
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(worksheet);

  for (const row of data) {
    await createFileUseCase.execute({
      id: row['id'],
      matricula: row['matricula'],
      nome: row['nome'],
      dataCobranca: row['dataCobranca'],
      valor: Number(row['valor']),
    });
  }
}