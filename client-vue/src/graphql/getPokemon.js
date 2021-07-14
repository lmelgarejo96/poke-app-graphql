import gql from "graphql-tag";
export default gql`
query SinglePokemon($order: Int!) {
  getPokemonByOrder(order: $order) {
    _id
    name
    order
    description
    species
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
    }
    weakness
    atack
    defense
  }
}
`;