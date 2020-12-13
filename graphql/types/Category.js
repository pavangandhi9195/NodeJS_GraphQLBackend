const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const CategoryType = new GraphQL.GraphQLObjectType({
	name: 'Category',
	description: 'Categories of products.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the category, Generated automatically by MongoDB',
		},
		title: {
			type: GraphQLString,
			description: 'Full name of the category',
		},
        parent: {
			type: GraphQLID,
			description: 'Parent category details if any',
		},
        isDeleted: {
			type: GraphQLBoolean,
			description: 'Status of the category',
		}
	})
});


module.exports = CategoryType;

