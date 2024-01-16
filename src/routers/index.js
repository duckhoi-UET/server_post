import posts from "./posts.js";
import rooms from "./rooms.js";
import auth from "./auth.js";
import uploads from "./uploads.js";
import selections from "./selections.js";
import booking from "./booking.js";
import products from "./products.js";
import category from "./category.js";
import brand from "./brand.js";

export const route = (app) => {
  app.use("/", auth);
  app.use("/", uploads);
  app.use("/posts", posts);
  app.use("/rooms", rooms);
  app.use("/products", products);
  app.use("/category", category);
  app.use("/brand", brand);
  app.use("/selections", selections);
  app.use("/booking", booking);
  app.use("/", (req, res) => {
    res.json({ message: "Welcome to Khoi's blog page" });
  });
};
