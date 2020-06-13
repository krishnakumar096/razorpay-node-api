import { DBConnection } from "../config/db-connection";

export class Model {
    
    public connection: any;

    constructor(tableName, tableModel, timestamp) {
        this.connection = DBConnection.define(tableName, tableModel, { timestamps: timestamp == false ? false : true });
    }
    
    //find all data
    findAll(option?: any): any {
        if (option) {
            
            if(option["raw"]){
                console.log(option["raw"],"  option['raw'] option['raw'] option['raw']");
            option["raw"] = true;
            }
            return this.connection.findAndCountAll(option);
        } else {
            return this.connection.findAndCountAll({ raw: true });
        }
    }

    //insert data in database
    insert(row): any {
        return this.connection.create(row);
    }

    //get particular data
    findOne(options?: any) {
        if (!options) {
            options = {
                raw: true
            };
        }
        return this.connection.findOne(options);
    }

    //update data in database
    update(details, id) {
        return this.connection.update(details, id);
    }

    //delete data from database
    delete(options) {
        return this.connection.destroy(options);
    }
}