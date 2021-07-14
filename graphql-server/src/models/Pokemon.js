import { Schema, model, Types } from "mongoose";


const PokemonSchema = new Schema({
    order: {
        type: Number,
        required: ["The pokemon number is required!"],
        unique: true
    },
    name: {
        type: String,
        default: "",
        required: ["The pokemon name is required!"]
    },
    description: {
        type: String,
        default: "",
        required: ["The pokemon description is required!"]
    },
    species: {
        type: Array,
        default: [],
    },
    abilities: {
        type: Array,
        default: [],
    },
    image: {
        type: Types.ObjectId,
        required: false,
        ref: "File"
    },
    height: {
        type: Number,
        default: "",
        required: ["The pokemon height is required!"]
    },
    weight: {
        type: Number,
        default: "",
        required: ["The pokemon weight is required!"]
    },
    evolutions: {
        type: Array,
        default: [],
        ref: "Pokemon",
        required: false
    },
    weakness: {
        type: Array,
        default: [],
        required: false
    },
    atack: {
        type: Number,
        default: 0,
        required: ["The pokemon atack is required!"]
    },
    defense: {
        type: Number,
        default: 0,
        required: ["The pokemon atack is required!"]
    },
})

export default model("Pokemon", PokemonSchema);