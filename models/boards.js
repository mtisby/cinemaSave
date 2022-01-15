import mongoose from "mongoose"

const Schema = mongoose.Schema;

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    pins: {
        type: Array,
        required: false
    }
})

const Board = mongoose.model('Board', boardSchema);

export { Board }