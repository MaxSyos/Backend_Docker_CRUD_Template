import multer from "multer";
import { Readable } from "stream"
import readLine from "readline";
import XLSX from "xlsx";
import { ICreateFilesDTO } from "../../modules/fileReader/dtos/ICreateFilesDTO";

const upload = multer();

export const uploadMiddleware =  (req, res, next) => {
   upload.single('file') (req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      const { file } = req;
      const { buffer, originalname } = file;
      const fileExtension = originalname.split('.').pop();
      
      if (fileExtension === 'csv') {
        await processCSVFile(file);
      } else if (fileExtension === 'xls' || fileExtension === 'xlsx') {
        await processXLSXFile(file);
      }

 /*      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);
      
    const bookFile = readLine.createInterface({
        input: readableFile,
    })

    const book: ICreateFilesDTO[] = []

    for await (let line of bookFile) {
        const bookLineSplit = line.split(";")
   
        book.push({
            id: bookLineSplit[0],
            matricula: bookLineSplit[1],
            nome: bookLineSplit[2],
            dataCobranca: bookLineSplit[3],
            valor: Number(bookLineSplit[4])
        })
    }

      console.log(book[1]);
      return res.json(book) */
      next();

    }
    });

    
    return uploadMiddleware;
};




function processCSVFile(file: any) {
  throw new Error("Function not implemented.");
}

