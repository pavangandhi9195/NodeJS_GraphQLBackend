var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

/*
Collection Name: CategorySchema
*/
var CategorySchema = new Schema({   
    title		    :  	{ type: String, required: true },
    parent          :  	{ type: ObjectId, default: null }, 
    isDeleted       :   { type: Boolean, default: false }
},
{
    timestamps: true
});

/**
 * Check if parent category is exists
 */
CategorySchema.pre("save", true, async function(next, done) {
    var self = this;

    // Check for copy category
    var copyCategory = await mongoose.models["category"].findOne({title: self.title, parent: self.parent, isDeleted: false});
        if(copyCategory)
            return done(new Error(self.parent ? "This category is already exist in this parent category" : "This category is already exist"));

    // Check for parent category
    if(!self.parent) done();
    else {
        mongoose.models["category"].findOne({_id: self.parent, isDeleted: false}, function(err, parentCategory) {
            if(err) {
                done(err);
            } else if(!parentCategory) {
                self.invalidate("parent", "Parent ID is not valid category ID");
                done(new Error("Parent ID is not valid category ID"));
            } else {
                done();
            }
        });
    }
    return next();
});

module.exports = mongoose.model('category' , CategorySchema, 'categories');