import gql from "graphql-tag";
export default gql`
query pokemons($keyword: String) {
  getPokemons (keyword: $keyword) {
    _id
    order
    name
    image {
      filename
    }
    species
  }
}
`;