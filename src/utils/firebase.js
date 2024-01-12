import admin from "firebase-admin";
import serviceAccount from "./service-firebase/ecommerce-224b0-firebase-adminsdk-fpfay-90444c9d5b.json" assert { type: "json" };

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ecommerce-224b0.appspot.com",
  });

  return admin.storage().bucket();
};

export default initializeFirebase;
