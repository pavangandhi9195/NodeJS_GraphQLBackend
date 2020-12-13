const GraphQL = require('graphql');
const {
	GraphQLList,
	GraphQLID,
    GraphQLString,
	GraphQLNonNull,
} = GraphQL;

// import the product type we created
const ProductType = require('../types/Product');

// import the product resolver we created
const ProductResolver = require('../resolvers/Product');

module.exports = {

	index() {
		return {
			type: new GraphQLList(ProductType),
			description: 'This will return all the products present in the database',
			args: {
				category: {
					type: GraphQLID,
					description: 'Please enter category id',
				}
			},
			resolve(parent, args, context, info) {
				return ProductResolver.index(args);
			}
		}
	},

	single() {
		return {
			type: ProductType,
			description: 'This will return data of a single product based on the id provided',
			args: {
				id: {
					type: GraphQLID,
					description: 'Please enter product id',
				},
				sku: {
                    type: GraphQLString,
                    description: 'Please enter SKU for product',
                }
			},
			resolve(parent, args, context, info) {
				if(!args.id && !args.sku)
					throw new Error('Enter either ID or SKU of product');
				else	
					return ProductResolver.single(args);
			}
		}
	},
	
};

