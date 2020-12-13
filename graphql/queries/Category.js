const GraphQL = require('graphql');
const Generic = require('../types/Generic');

const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the category type we created
const CategoryType = require('../types/Category');

// import the category resolver we created
const CategoryResolver = require('../resolvers/Category');


module.exports = {

	index() {
		return {
			type: new GraphQLList(Generic.categoryTree),
			description: 'This will return all the category and it\'s sub categories present in the database',
			resolve(parent, args, context, info) {
				return CategoryResolver.index({});
			}
		}
	},

};

