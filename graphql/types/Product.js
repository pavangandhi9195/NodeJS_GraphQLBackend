const GraphQL = require('graphql');
const {
	GraphQLObjectType,
	GraphQLString,
    GraphQLBoolean,
	GraphQLID,
	GraphQLInt,
    GraphQLList,
} = GraphQL;

const Generic = require('./Generic');
const CategoryType = require('./Category');


const ProductType = new GraphQL.GraphQLObjectType({
	name: 'Product',
	description: 'Products in our application.',

	fields: () => ({
		id: {
			type: GraphQLID,
			description: 'ID of the product, Generated automatically by MongoDB',
		},
		name: {
			type: GraphQLString,
			description: 'Full name of the product',
		},
        image: {
			type: GraphQLString,
			description: 'Product image',
		},
		quantity: {
			type: GraphQLInt,
			description: 'Quantity of the product',
		},
		sku: {
			type: GraphQLString,
			description: 'Barcode SKU for product',
		},
		qrCode: {
			type: GraphQLString,
			description: 'QR Code file of product',
		},
		category: {
			type: GraphQLID,
			description: 'ID of the product\'s category',
		},
		categoryInfo: {
			type: Generic.categoryTree,
			description: 'Full info about product\'s category',
		},
        isDeleted: {
			type: GraphQLBoolean,
			description: 'Status of the product',
		}
	})
});


module.exports = ProductType;

