const GraphQL = require('graphql');
const Generic = require('../types/Generic');

const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = GraphQL;

// import product type
const ProductType = require('../types/Product');

// import product resolver
const ProductResolver = require('../resolvers/Product');


module.exports = {

    create() {
        return {
            type: ProductType,
            description: 'Add new Product',

            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter the product name, Cannot be left empty',
                },
                image: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter Base64 image details',
                },
                quantity: {
                    type: new GraphQLNonNull(GraphQLInt),
                    description: 'Enter product quantity',
                },
                sku: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter SKU for product',
                },
                category: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Enter the product category ID',
                },
            },
            resolve(parent, fields) {
                return ProductResolver.create(fields);
            }
        }
    },

    update() {
        return {
            type: ProductType,
            description: 'Update Product details',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Enter the ID that you want to update',
                },
                name: {
                    type: GraphQLString,
                    description: 'Enter the product name, Cannot be left empty',
                },
                image: {
                    type: GraphQLString,
                    description: 'Enter Base64 image details',
                },
                quantity: {
                    type: GraphQLInt,
                    description: 'Enter product quantity',
                },
                category: {
                    type: GraphQLID,
                    description: 'Enter the product category ID',
                },
            },
            resolve(parent, fields, context, info) {
                return ProductResolver.update(fields);
            }
        }
    },

    delete() {
        return {
            type: Generic.messageOutputType,
            description: 'Delete Products\'s details',

            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter product id',
                }
            },
            resolve(parent, fields, context, info) {
                return ProductResolver.delete(fields);
            }
        }
    }
};
