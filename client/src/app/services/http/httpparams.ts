

export abstract class HttpParams {
    abstract toString(): string;
}

interface KeyValuePair {
    key: string;
    value: string;
}

export class HttpSlashEncodedParamas implements HttpParams {

    keyValueMap: Array<KeyValuePair> = [];

    constructor() {}

    setParam(key, value) {
        this.keyValueMap.push( { key: key, value: value });
    }

    toString(): string {
        //Go through the keyvalue map and get create string
        let return_string = "";
        this.keyValueMap.forEach(element => {
            let partial_string = "/";
            //Check key
            if(element.key !== "") {
                partial_string += element.key + "/";
            }
            partial_string += element.value;

            return_string += partial_string;
        });

        return return_string;
    }
}