import gql from "graphql-tag";
export default gql`
mutation deletePokemon($pokeId: ID!) {
  deletePokemon(pokeId: $pokeId)
}
`;