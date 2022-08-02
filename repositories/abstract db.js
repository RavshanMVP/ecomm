import fs from "fs";
import crypto from "crypto";
import util from "util";

export default class AbstractDB{

    constructor(filename) {
        if (!filename){
            throw new Error("Creating a repository requires a filename");
        }
        this.filename = filename;
        this.checkForFile();
    }

    checkForFile(){
        try {
            fs.accessSync(this.filename);
            console.log("file received");
        }
        catch (err){
            console.log("No such file")
            fs.writeFileSync("users.json", "[]");
        }
    }

    async getAll(){
        return  JSON.parse(await fs.promises.readFile(this.filename, {
            encoding:"utf8"}));
    }

    async writeAll(records){
        return await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    }

    randomId(prefix=""){
        return `${prefix}${crypto.randomBytes(4).toString("hex")}`;
    }

    async getOne(id){
        const records = await this.getAll();
        return  records.find(data=> data.id === id);
    }

    async change(id, attrs){
        const records = await this.getAll();
        const record = records.find(data=> data.id === id);
        if (!record){throw new Error(`No such record with ${id}`)}
        Object.assign(record,attrs);
        await this.writeAll(records);
    }

    async delete(id){
        const records = await this.getAll();
        const changed = records.filter(data=>data.id !== id);
        await this.writeAll(changed);
    }
    async filter(filters){
        const records = await this.getAll();
        for (let record of records){
            let found = true;
            for (let key in filters) {
                if (record[key] !== filters[key]){
                    found = false;
                }
            }
            if (found){
                return record;
            }
        }
    }

    async create(attrs){
        const records = await this.getAll();
        attrs["id"] = this.randomId();
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }
}


