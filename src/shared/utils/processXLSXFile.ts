// processXLSXFile.js
import { Readable } from 'stream';
import xlsx from 'xlsx';

// This function is responsible for processing an XLSX file and returning an array of `ICreateFilesDTO` objects.
export const processXLSXFile = async (readableFile: Readable) => {
  const book = [];

  const workbook = await xlsx.readFile(readableFile);
  const sheet = workbook.Sheets[workbook.Sheets.length - 1];

  for (const row of sheet.Rows) {
    const bookLineSplit = row.getValues();

    book.push({
      matricula: bookLineSplit[0],
      nome: bookLineSplit[1],
      dataCobranca: bookLineSplit[2],
      valor: Number(bookLineSplit[3])
    });
  }

  return book;
};