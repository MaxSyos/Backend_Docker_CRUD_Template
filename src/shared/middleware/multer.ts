import { Readable } from "stream";
import readLine from "readline";
import multer from "multer";
import XLSX from "xlsx";
import { ICreateFilesDTO } from "../../modules/fileReader/dtos/ICreateFilesDTO";
import { processCSVFile } from "../utils/processCSVFile";
import { processXLSXFile } from "../utils/processXLSXFile";
import { Request, Response, NextFunction } from "express"
import { CreateFileUseCase } from "../../modules/fileReader/useCases/CreateFileUseCase";
import { container } from "tsyringe";

const upload = multer();

// Esta função é responsavel pelo uploading do file e criar um  readable stream nele.
export const uploadMiddleware = (req: Request, res: Response, next: NextFunction ) => {
  upload.single('file') (req, res, async (err) => {
    if (err) {
      next(err);
    } else {
      const { file } = req;
      const { buffer, originalname } = file;
      const fileExtension = originalname.split('.').pop();

      const readableFile = new Readable();
      readableFile.push(buffer);
      readableFile.push(null);
      
      switch (fileExtension) {
        case "csv":
          const registerCSV = await processCSVFile(readableFile);
          console.log(registerCSV);
          next();

          case "xlsx":
            const registerXLS = await processXLSXFile(readableFile);
            console.log('sendo usado')
            res.status(202).json(registerXLS);
            break; 

          default:
            throw new Error(`Extensão de Aquivo não Suportada: ${fileExtension}`);
            res.status(400).json(`Extensão de Aquivo não Suportada: ${fileExtension}`);
          }

          next();
          }
          next();
  })
}



  


