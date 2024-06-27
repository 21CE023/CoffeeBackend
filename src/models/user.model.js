import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      uniquie: true,
      lowercase: true,
      trim: true,
      index: true, // Expensive for performance
    },
    email: {
      type: String,
      require: true,
      uniquie: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      require: true,
      trim: true,
      index: true, // Expensive for performance
    },
    avtar: {
      type: String, //cloudinary url
      require: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Please enter your password!!"],
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", () => {}) // This is not good practice to use callback inside pre hook, Because this doesn't have access to the schema That's why we are gonna use function(){} instead of callback which is mentioned below
userSchema.pre("save", function (next) {
    if(!this.isModified("password")) return next();
     
    this.password = bcrypt.hash(this.password, 10)
    next();
}) 

userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.genrateAccessToken = function (){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiryIn: process.env.ACCESS_TOKEN_EXPIRY 
        }
    )
}
userSchema.methods.genrateRefreshToken = function (){
    jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiryIn: process.env.REFRESH_TOKEN_EXPIRY 
        }
    )
}

export const User = mongoose.model("User", userSchema);