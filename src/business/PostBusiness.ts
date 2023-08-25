import { PostDatabase } from "../database/PostDatabase";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/Idgenerator";
import { TokenManager } from "../services/TokenManagen";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenmanager: TokenManager,
    ) { }
    //endpoints
}