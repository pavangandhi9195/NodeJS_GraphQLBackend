var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
/*
Collection Name: ProductSchema
*/
var ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    category: { 
        type: ObjectId, 
        ref: 'category', 
        required: true 
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});

/**
 * Check data integrity
 */
ProductSchema.pre("save", true, async function(next, done) {
    var self = this;

    // Check if category is valid
    var category = await mongoose.models["category"].findOne({ _id: self.category, isDeleted: false });
    if(!category) {
        self.invalidate("category", "Given category is not valid");
        return done(new Error("Given category is not valid"));
    }

    // SKU is not exists while creating new product
    if(!this.isNew) done();
    mongoose.models["product"].findOne({sku: self.sku, isDeleted: false}, function(err, product) {
        if(err) {
            return done(err);
        } else if(product) {
            self.invalidate("sku", "SKU must be unique");
            return done(new Error("SKU must be unique"));
        } else {
            return done();
        }
    });

    return next();
});

/**
 * Image paths in post hooks
 */
ProductSchema.post('init', async function (doc) {
    doc.image = process.env.IMAGE_SERVER_DOMAIN + "/products/" + doc.image;
    doc.qrCode = process.env.IMAGE_SERVER_DOMAIN + "/QR/" + doc._id + ".png";
});

module.exports = mongoose.model('product' , ProductSchema);