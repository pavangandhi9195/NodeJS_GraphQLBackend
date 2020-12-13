
const dotenv = require('dotenv');
dotenv.load({path: '.env'});
const fs = require("fs");
var { generateQRCode } = require("../../middleware/qr");
const Product = require('../../models/Product');
const Category = require('../../models/Category');

class ProductController {

    constructor(model) {
        this.model = Product;
        this.filePath = __dirname + '../../../public/products/';
        this.serverProductImagePath = process.env.IMAGE_SERVER_DOMAIN + "/products/";
        this.serverQRImagePath = process.env.IMAGE_SERVER_DOMAIN + "/QR/";
    }

    // this will find all the records in database and return it
    async index(options) {
        var _query = { isDeleted: { $ne: true } };
        if(options.category) {
            var categories = [];
            categories.push(options.category);
            var category = await Category.findById(options.category);
            if(category && category.parent) {
                categories.push(category.parent);
            }
            _query.category = { $in: categories };
        }

        return this.model
            .find(_query)
            .populate({
                path: 'category',
                populate: {
                    path: 'parent',
                }
            })
            .sort('createdAt')
            .exec()
            .then(records => {
                records.forEach(record => record.categoryInfo = record.category);
                return records;
            })
            .catch(error => {
                return error;
            });
    }

    // this will find a single record based on id and return it.
    single(options) {
        var _query = { isDeleted: { $ne: true } };
        (options.id) ? _query._id = options.id : _query.sku = options.sku;
        return this.model.findOne(_query)
            .populate({
                path: 'category',
                populate: {
                    path: 'parent',
                }
            })
            .exec()
            .then(record => {
                record.categoryInfo = record.category;
                return record;
            })
            .catch(error => {
                return error;
            });
    }

    // this will insert a new record in database
    create(data) {        
        var base64String = data.image;
        var fileData = base64String.split(';base64,').pop();
        var fileExtension = base64String.split(';')[0].split('/')[1];
        var fileName = new Date().getTime() + "." + fileExtension;
        var fullFilePath = this.filePath + fileName;

        // Store image
        if (!fs.existsSync(this.filePath))
            fs.mkdirSync(this.filePath, { recursive: true });
        fs.writeFileSync(fullFilePath, fileData, {encoding: 'base64'});

        // Store record in DB
        data.image = fileName;
        const record = new this.model(data);
        return record.save()
            .then(async (product) => {
                // Generate QR
                var qrFileName = await generateQRCode(product._id, product.sku);

                product.image = this.serverProductImagePath + product.image;
                product.qrCode = this.serverQRImagePath + qrFileName;
                return product;
            })
            .catch((error) => {
                return error;
            });
    }

    // this will update existing record in database
    update(data) {
        return this.model
            .findOneAndUpdate({ _id: data.id, isDeleted: { $ne: true } }, { $set: data }, { new: true })
            .then((product) => {
                return product;
            })
            .catch((error) => {
                return error;
            });
    }

    // this will delete the product
    delete(data) {
        return this.model
            .findOneAndUpdate({ _id: data.id }, { isDeleted: true})
            .then(data => {
                return {message: "Product deleted successfully!"};
            })
            .catch(err => {
                return err;
            });
    }

};

const product_controller = new ProductController();
module.exports = product_controller;
