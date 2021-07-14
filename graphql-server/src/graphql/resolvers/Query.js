import { getPokemons, getPokemonByOrder } from "../../orm/Pokemon";


export default {
    hello: () => {
        return "Hello World!!";
    },
    getPokemons: async(_, { keyword }) => {
        const result = await getPokemons(keyword);
        if (!result.status) return [];
        return result.data;
    },
    getPokemonByOrder: async(_, { order }) => {
        const result = await getPokemonByOrder(order);
        if (!result.status) return null;
        return result.data;
    }
}