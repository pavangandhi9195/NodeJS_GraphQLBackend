const GraphQL = require('graphql');
const {
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
} = GraphQL;

exports.messageOutputType = new GraphQLObjectType({
    name: 'messageOutput',
    description: 'Send success message',
    fields: () => ({
        message: {
            type: GraphQLString,
            description: 'Success message string',
        },
    })
});

exports.categoryTree = new GraphQLObjectType({
	name: 'categoryTree',
	description: 'Categories and child categories.',
	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the category, Generated automatically by MongoDB',
		},
		title: {
			type: GraphQLString,
			description: 'Full name of the category',
		},
        children: {
			type: new GraphQLList(this.categoryTree),
			description: 'List of child categories',
        },
        parent: {
			type: this.categoryTree,
			description: 'List of child categories',
		},
        isDeleted: {
			type: GraphQLBoolean,
			description: 'Status of the category',
		}
	})
});

