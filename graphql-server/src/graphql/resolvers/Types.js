export default `
    type File {
        _id: ID
        filename: String
        size: Float
        mimetype: String
    }

    type Pokemon {
        _id: ID! 
        name: String! 
        order: Int!
        description: String! 
        species: [String]
        abilities: [String]
        image: File
        height: Float!
        weight: Float!
        evolutions: [Pokemon]
        weakness: [String]
        atack: Float
        defense: Float
    }

    input PokemonCreate {
        name: String! 
        order: Int!
        description: String! 
        species: [String]
        abilities: [String]
        image: String
        height: Float!
        weight: Float!
        evolutions: [String]
        weakness: [String]
        atack: Float!
        defense: Float!
    }

    input PokemonUpdate {
        _id: ID! 
        name: String! 
        order: Int!
        description: String! 
        species: [String]
        abilities: [String]
        image: String
        height: Float!
        weight: Float!
        evolutions: [String]
        weakness: [String]
        atack: Float!
        defense: Float!
    }
    
    type Query {
        hello: String
        getPokemons(keyword: String): [Pokemon]
        getPokemonByOrder(order: Int!): Pokemon
    }

    type Mutation {
        createPokemon(
            pokemon: PokemonCreate!
        ): Pokemon

        updatePokemon(
            pokemon: PokemonUpdate!
        ): Pokemon

        deletePokemon(
            pokeId: ID!
        ): Boolean
    }
    
`