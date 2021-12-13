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
    pins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Movie'
        }
    ],
    boards:  [
        {
            type: Schema.Types.ObjectId,
            ref: 'Board'
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);
export { User }