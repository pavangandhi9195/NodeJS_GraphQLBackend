const GraphQL = require('graphql');
const Generic = require('../types/Generic');


const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLList
} = GraphQL;

// import category type
const CategoryType = require('../types/Category');

// import category resolver
const CategoryResolver = require('../resolvers/Category');


module.exports = {

    create() {
        return {
            type: CategoryType,
            description: 'Add new Category',

            args: {
                title: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter the product name, Cannot be left empty',
                },
                parent: {
                    type: GraphQLString,
                    description: 'Enter ID of the parent category',
                },
            },
            resolve(parent, fields) {
                return CategoryResolver.create(fields);
            }
        }
    },

    update() {
        return {
            type: CategoryType,
            description: 'Update Category details',
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID),
                    description: 'Enter the ID that you want to update',
                },
                title: {
                    type: GraphQLString,
                    description: 'Enter the category name, Cannot be left empty',
                },
                parent: {
                    type: GraphQLID,
                    description: 'Enter the parent category ID',
                },
            },
            resolve(parent, fields, context, info) {
                return CategoryResolver.update(fields);
            }
        }
    },

    delete() {
        return {
            type: Generic.messageOutputType,
            description: 'Delete Category\'s details',

            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: 'Enter category id',
                }
            },
            resolve(parent, fields, context, info) {
                return CategoryResolver.delete(fields);
            }
        }
    }

};
