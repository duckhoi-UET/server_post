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

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const connectS3 = async () => {
  try {
    return new S3Client({
      credentials: {
        accessKeyId: "AKIATE5ODWNJFHK5EOGQ",
        secretAccessKey: "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",
      },
      region: "ap-southeast-1",
    });
  } catch (error) {
    console.log(error);
  }
};

export const uploadImage = async (req, res) => {
  const s3 = await connectS3();
  const fileName = new Date().getTime() + "_" + req.files.file.name;
  const params = {
    Body: req.files.file.data,
    Bucket: "d6-myforex-fxon-storage",
    Key: `files/profile_picture/${fileName}`,
  };
  try {
    const result = await s3.send(new PutObjectCommand(params));
    res.json({
      status: "success",
      url: `https://${params.Bucket}.s3.ap-southeast-1.amazonaws.com/${params.Key}`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Upload failed",
      error: error,
    });
  }
};
