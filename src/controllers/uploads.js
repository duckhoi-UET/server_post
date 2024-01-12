// import * as Upload from "upload-js-full";
// import fetch from "node-fetch";

// const uploadManager = new Upload.UploadManager(
//   new Upload.Configuration({
//     fetchApi: fetch,
//     apiKey: "public_W142hwV26uUSoZG3pGai9paHC5e4",
//   })
// );

// export const uploadImage = async (req, res) => {
//   try {
//     const response = await uploadManager.upload({
//       accountId: "W142hwV",
//       data: req.file.buffer,
//       mime: "text/plain",
//       originalFileName: req.file.originalname,
//       maxConcurrentUploadParts: 4,
//       metadata: {
//         productId: 60891,
//       },
//     });
//     if (response) {
//       res.json({
//         message: "Success",
//         fileUrl: response.fileUrl,
//         file: req.file,
//       });
//     }
//   } catch (error) {
//     res.json({
//       message: "Upload failed",
//       error: error,
//     });
//   }
// };

// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// const connectS3 = async () => {
//   try {
//     return new S3Client({
//       credentials: {
//         accessKeyId: "AKIATE5ODWNJFHK5EOGQ",
//         secretAccessKey: "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",
//       },
//       region: "ap-southeast-1",
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const uploadImage = async (req, res) => {
//   const s3 = await connectS3();
//   const fileName = new Date().getTime() + "_" + req.files.file.name;
//   const params = {
//     Body: req.files.file.data,
//     Bucket: "d6-myforex-fxon-storage",
//     Key: `files/profile_picture/${fileName}`,
//   };
//   try {
//     const result = await s3.send(new PutObjectCommand(params));
//     res.json({
//       status: "success",
//       url: `https://${params.Bucket}.s3.ap-southeast-1.amazonaws.com/${params.Key}`,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Upload failed",
//       error: error,
//     });
//   }
// };

import admin from "firebase-admin";
import serviceAccount from "../utils/service-firebase/ecommerce-224b0-firebase-adminsdk-fpfay-90444c9d5b.json" assert { type: "json" };

const initializeFirebase = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://ecommerce-224b0.appspot.com",
  });

  return admin.storage().bucket();
};

const bucket = initializeFirebase();

export const uploadImage = async (req, res) => {
  try {
    const file = req.files.file;

    // Tạo tên tệp tin ngẫu nhiên hoặc sử dụng tên gốc
    const fileName = Date.now() + "-" + file.name;

    // Đường dẫn đến thư mục trên Firebase Storage
    const fileUpload = bucket.file(fileName);

    // Tải lên ảnh vào Firebase Storage
    await fileUpload.createWriteStream().end(file.data);

    // Lấy URL của ảnh sau khi tải lên
    const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileName}?alt=media`;

    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
