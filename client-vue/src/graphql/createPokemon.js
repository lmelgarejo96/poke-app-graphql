import gql from "graphql-tag";

export default gql`
mutation($pokemon: PokemonCreate!) {
  createPokemon(pokemon: $pokemon) {
    name
    order
    species
    description
    abilities
    image {
      _id
      filename
    }
    height
    weight
    evolutions {
      _id
      name
      order
    }
    weakness
    atack
    defense
  }
}
`