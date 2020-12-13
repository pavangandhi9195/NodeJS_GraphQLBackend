const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLSchema,
} = GraphQL;


// import the query file we created
const ProductQuery = require('./queries/Product');
const CategoryQuery = require('./queries/Category');

// import the mutation file we created
const ProductMutation = require('./mutations/Product');
const CategoryMutation = require('./mutations/Category');


// lets define our root query
const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	description: 'This is the default root query provided by the backend',
	fields: {
		// PRODUCT
		products: ProductQuery.index(),
		product: ProductQuery.single(),

		// CATEGORY
		categories: CategoryQuery.index(),
	},
});


// lets define our root mutation
const RootMutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Default mutation provided by the backend APIs',
	fields: {
		// PRODUCT
		addProduct: ProductMutation.create(),
		updateProduct: ProductMutation.update(),
		deleteProduct: ProductMutation.delete(),

		// CATEGORY
		addCategory: CategoryMutation.create(),
		updateCategory: CategoryMutation.update(),
		deleteCategory: CategoryMutation.delete(),
	},
});

// export the schema
module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: RootMutation,
});

