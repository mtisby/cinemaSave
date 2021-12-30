import mongoose from "mongoose"
import pkg from "passport-local-mongoose"

const passportLocalMongoose = pkg
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    topGenres: {
        type: Array,
        required: true
    },
    pins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    boards:  [
        {
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: false
            },
            pins: [
                {
                    type: Schema.Types.ObjectId,
                    ref: 'Movie'
                }
            ]
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
export { User }