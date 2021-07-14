import gql from "graphql-tag";

export default gql`
mutation($pokemon: PokemonUpdate!) {
  updatePokemon(pokemon: $pokemon) {
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