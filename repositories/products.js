import abstractDB from "./abstract db.js"
import fs from "fs";

class Products extends abstractDB{
    async create(attrs){
        const records = await this.getAll();
        attrs["id"] = this.randomId("p");
        records.push(attrs);
        await this.writeAll(records);
        return attrs;
    }
    async search(searched){
        let records = await this.getAll();
        if(searched) {
            searched = searched.toLowerCase();
            records = records.filter((val) => {
                let copy = val["title"].toLowerCase();
                if (copy.includes(searched) || searched.includes(copy)) {
                    return true;
                }
            })
        }
        return records;
    }

    async sortByTitle(records){
        records = records.sort((a, b)=>{
            return a["title"].localeCompare(b["title"]);
        })
        return records;
    }

    async sortByPrice(records){
        records = records.sort((a, b)=>{
            return parseInt(a["price"])-parseInt(b["price"]);
        })
        return records;
    }

}


export default new Products("products.json");