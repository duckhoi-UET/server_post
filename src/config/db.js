import mongoose from "mongoose";

const URI_DB =
  "mongodb+srv://khoinguyen2000bg:123456789aA%40@mern-app.j110qj0.mongodb.net/test";

export const connectDb = async () => {
  try {
    await mongoose.connect(URI_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB Connect Success!!");
  } catch (error) {
    console.log(error);
  }
};
