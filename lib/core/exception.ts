export class RouterConfigError implements Error {
    name: string = "RouterConfigError";

    constructor(public message: string) {

    }
}

