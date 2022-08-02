import crypto from "crypto";
import util from "util";
import abstractDb from "./abstract db.js";
const scrypt = util.promisify(crypto.scrypt);
class Users extends abstractDb{
    constructor(filename) {
        super(filename);
    }


    async create(attrs) {
        const records = await this.getAll();
        const salt = crypto.randomBytes(8).toString("hex");
        const hashed = await scrypt(attrs.password, salt, 64)

        attrs["id"] = this.randomId("u");
        const record = {...attrs,
            password:`${hashed.toString("hex")}.${salt}`};
        records.push(record);
        await this.writeAll(records);
        return record;
    }

    async comparePasswords(saved, supplied) {
        const salt = saved.split(".")[1];
        const hashed = await scrypt(supplied, salt, 64);
        return hashed.toString("hex") +"."+salt === saved;

    }


}

export default new Users("users.json");
