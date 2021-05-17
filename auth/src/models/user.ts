import mongoose from "mongoose";

// An interface that describes the properties
// that are required to create a new user
interface UserAttributes {
    email: string;
    password: string;
}

// An interface that describes the methods
// that a User Model has
interface UserModel extends mongoose.Model<any> {
    build(attributes: UserAttributes): any;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

userSchema.statics.build = (attributes: UserAttributes) => {
    return new User(attributes);
};

const User = mongoose.model<any, UserModel>("User", userSchema);

export { User };
