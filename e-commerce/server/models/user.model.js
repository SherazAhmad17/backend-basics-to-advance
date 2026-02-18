import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false,
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
        trim: true,
    },
    address: {
        type: String,
        required: [true, "address is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "city is required"],
        trim: true,
    },
    country: {
        type: String,
        required: [true, "country is required"],
        trim: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// hash password before saving
userSchema.pre("save", async function() {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// compare password method
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
