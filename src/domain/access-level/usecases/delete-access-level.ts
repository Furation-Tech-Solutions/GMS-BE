import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { AccessLevelRepository } from "../repositories/access-level-repository";


export interface DeleteAccessLevelUsecase {
    execute: (clientID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteAccessLevel implements DeleteAccessLevelUsecase {
    private readonly accessLevelRepository: AccessLevelRepository;

    constructor(accessLevelRepository: AccessLevelRepository) {
        this.accessLevelRepository = accessLevelRepository;
    }

    async execute(accessLevelID: string): Promise<Either<ErrorClass, void>> {
        return await this.accessLevelRepository.deleteAccessLevel(accessLevelID);
    }
}