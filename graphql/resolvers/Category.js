const dotenv = require('dotenv');
dotenv.load({path: '.env'});
const Category = require('../../models/Category');

class CategoryController {

    constructor(model) {
        this.model = Category;
    }

    // this will find all the records in database and return it
    index() {

        return this.model.find({isDeleted: { $ne: true }}).then(data => {
            var list = data.map(item => item.toObject({ virtuals: true }));
            var map = {}, node, roots = [], i;
            for (i = 0; i < list.length; i += 1) {
                map[list[i]._id] = i; // initialize the map
                list[i].children = []; // initialize the children
            }
            for (i = 0; i < list.length; i += 1) {
                node = list[i];
                if (node.parent !== null) {
                    if(typeof map[node.parent] !== "undefined")
                        list[map[node.parent]].children.push(node);
                } else {
                    roots.push(node);
                }
            } 

            return roots;
        }).catch(err => {
            return err;
        });
    }

    // this will insert a new record in database
    create(data) {        
        const record = new this.model(data);
        return record.save()
            .then(async (category) => {
                return category;
            })
            .catch((error) => {
                return error;
            });
    }

    // this will update existing record in database
    update(data) {
        return this.model
            .findOneAndUpdate({ _id: data.id, isDeleted: { $ne: true } }, { $set: data }, { new: true })
            .then((category) => {
                return category;
            })
            .catch((error) => {
                return error;
            });
    }

    // this will delete the record 
    delete(data) {
        return this.model.findOneAndUpdate({ _id: data.id, isDeleted: { $ne: true } }, { $set: { isDeleted: true} }).then(async (parent) => {
            if(parent)
                // Remove child products
                await this.model.findOneAndUpdate({ parent: data.id, isDeleted: { $ne: true } }, { $set: { isDeleted: true} });
    
            return {message: "Category deleted successfully!"};
        }).catch(err => {
            return error;
        });
    }

};

const category_controller = new CategoryController();
module.exports = category_controller;
