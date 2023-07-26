import { container } from "tsyringe";
import { UserRepository } from "../../modules/users/repositories/implametations/UserRepository";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { IFilesRepository } from "../../modules/fileReader/repositories/IFilesRepository";
import { FileRepository } from "../../modules/fileReader/repositories/implametations/FileRepository";

container.registerSingleton<IUsersRepository>(
    "UserRepository",
    UserRepository
)

container.registerSingleton<IFilesRepository>(
    "FileRepository",
    FileRepository
);