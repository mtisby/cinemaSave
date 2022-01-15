import mongoose from "mongoose"

const Schema = mongoose.Schema;

const streamSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: false
    },
    logo_100px: {
        type: String,
        required: false
    },
    ios_applestore_url: {
        type: String,
        required: false
    },
    android_playstore_url: {
        type: String,
        required: false
    },
    android_scheme: {
        type: String,
        required: false
    },
    ios_scheme: {
        type: String,
        required: false
    },
    regions: {
        type: Array,
        required: false
    }
})

const Stream = mongoose.model('Stream', streamSchema);

export { Stream }