// import { Router, Request, Response } from "express"
// import { AuthenticateUserController } from "../modules/users/useCases/usersControllers/AuthenticateUserController";
// import { CreateUserController } from "../modules/users/useCases/usersControllers/CreateUserController"
// import { ensureAuthenticated } from "../shared/middleware/ensureAuthenticated";
// import multer from "multer";
// import { Readable } from "stream"
// import readLine from "readline";
// import XLSX from "xlsx";
// import { ICreateFilesDTO } from "../modules/fileReader/dtos/ICreateFilesDTO";


// const fileRoutes = Router()

// const multerConfig = multer();

// interface bookFilesDTO {
//     titulo: string;
//     isbn: string;
//     autor: string;
//     categorias: string[];
//     preco: number;
// }

// fileRoutes.post("/",
//     multerConfig.single("file"),
//     async (request: Request, response: Response) => {
        
//         // Abra o arquivo enviado
//         const { file } = request;
//         const { buffer, originalname } = file;
//         const fileExtension = originalname.split('.').pop();
//         console.log(fileExtension)

//         const readableFile = new Readable();
//         readableFile.push(buffer);
//         readableFile.push(null);

//         const bookFile = readLine.createInterface({
//             input: readableFile,
//         })

//         const book: ICreateFilesDTO[] = []

//         for await (let line of bookFile) {
//             const bookLineSplit = line.split(",")
//             console.log(bookLineSplit[0]);

//             book.push({
//                 matricula: bookLineSplit[1],
//                 nome: bookLineSplit[2],
//                 dataCobranca: bookLineSplit[3],
//                 valor: Number(bookLineSplit[4])
//             })
//         }

//         return response.json(book);
//     }
// );




// export { fileRoutes };