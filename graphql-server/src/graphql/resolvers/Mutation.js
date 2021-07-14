import { createPokemon, updatePokemon, deletePokemon } from "../../orm/Pokemon";

export default {
    createPokemon: async(_, { pokemon }) => {
        const result = await createPokemon(pokemon);
        if (!result.status) return null;
        return result.data;
    },
    updatePokemon: async(_, { pokemon }) => {
        const result = await updatePokemon(pokemon);
        if (!result.status) return null;
        return result.data;
    },
    deletePokemon: async(_, { pokeId }) => {
        const result = await deletePokemon(pokeId);
        if (!result.status) return false;
        return true;
    }
}