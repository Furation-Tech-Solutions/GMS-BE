import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { UserRepository } from "../repositories/user-repository";


export interface DeleteUserUseCase {
    execute: (taxRateID: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteUser implements DeleteUserUseCase {
    private readonly userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async execute(userID: string): Promise<Either<ErrorClass, void>> {
        return await this.userRepository.deleteUser(userID);
    }
}