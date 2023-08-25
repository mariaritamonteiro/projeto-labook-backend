import { userDatabase } from "../database/UserDataBase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/Idgenerator";
import { TokenManager } from "../services/TokenManagen";

export class UserBusiness {
    constructor(
        private userDatabase: userDatabase,
        private idGenerator: IdGenerator,
        private tokenmanager: TokenManager,
        private hashManager: HashManager,
    ) { }
    //endpoints
}