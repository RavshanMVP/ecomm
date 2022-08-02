import abstractDB from "./abstract db.js"

class Products extends abstractDB{
    async create(attrs){
        const records = await this.getAll();
        attrs["id"] = this.randomId("c");
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }
}

export default new Products("carts.json");