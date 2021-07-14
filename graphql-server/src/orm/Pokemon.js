const specialCharacter = /[`~!¡@#$%^&*()_|+\-=¿?;:'"¨,.<>\{\}\[\]\\\/]/gi;
import Pokemon from "../models/Pokemon";

export const getPokemons = async(keyword) => {
    try {
        let KEYWORDS, findOPTS = {};
        if (keyword) {
            KEYWORDS = keyword.toString().trim().replace(specialCharacter, '').split(' ').map(k => {
                return {
                    name: {
                        "$regex": new RegExp(k, "i")
                    }
                }
            })
            findOPTS.$or = KEYWORDS
        }
        const Pokemons = await Pokemon.find(findOPTS)
            .populate("image")
            .populate("evolutions")
            .sort('order');

        return { message: Pokemons.length === 0 ? "No pokemon found" : "Pokemons loaded!", status: true, data: Pokemons };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}

export const getPokemonByOrder = async(order) => {
    try {
        const Poke = await Pokemon.findOne({ order: order })
            .populate("image")
            .populate("evolutions");
        if (!Poke) return { message: "The pokemon doesn't exist!", status: false, data: null };
        return { message: "Pokemon found!", status: true, data: Poke };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}

export const createPokemon = async({ order, name, description, species, abilities, image, height, weight, evolutions, weakness, atack, defense }) => {
    try {
        const Poke = new Pokemon({
            order: order || 0,
            name: name || "",
            description: description || "",
            species: species || [],
            abilities: abilities || [],
            image: image || null,
            height: height || 0,
            weight: weight || 0,
            evolutions: evolutions || [],
            weakness: weakness || [],
            atack: atack || 0,
            defense: defense || 0,
        });

        const PokeSaved = await Poke.save()
        return await getPokemonByOrder(PokeSaved.order);
    } catch (error) {
        console.log(error);
        return { message: error.message || error, status: false, data: null };
    }
}

export const updatePokemon = async({ _id, order, name, description, species, abilities, image, height, weight, evolutions, weakness, atack, defense }) => {
    try {
        const PokeUpdated = await Pokemon.findOneAndUpdate({ _id: _id }, {
                $set: {
                    order: order || 0,
                    name: name || "",
                    description: description || "",
                    species: species || [],
                    abilities: abilities || [],
                    image: image || null,
                    height: height || 0,
                    weight: weight || 0,
                    evolutions: evolutions || [],
                    weakness: weakness || [],
                    atack: atack || 0,
                    defense: defense || 0,
                }
            }, { new: true })
            .populate("image")
            .populate("evolutions");

        return { message: "Pokemon updated!", status: true, data: PokeUpdated };

    } catch (error) {
        console.log(error);
        return { message: error.message || error, status: false, data: null };
    }
}

export const deletePokemon = async(pokeId) => {
    try {
        if (!pokeId) return { message: "You must provide a Pokemon Id!", status: false, data: null };
        await Pokemon.findByIdAndRemove(pokeId);
        return { message: "Pokemon removed!", status: true, data: null };
    } catch (error) {
        return { message: error.message || error, status: false, data: null };
    }
}