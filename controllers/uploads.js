import * as Upload from "upload-js-full";
import fetch from "node-fetch";

const uploadManager = new Upload.UploadManager(
  new Upload.Configuration({
    fetchApi: fetch,
    apiKey: "public_W142hwV26uUSoZG3pGai9paHC5e4",
  })
);

export const uploadImage = async (req, res) => {
  try {
    const response = await uploadManager.upload({
      accountId: "W142hwV",
      data: req.file.buffer,
      mime: "text/plain",
      originalFileName: req.file.originalname,
      maxConcurrentUploadParts: 4,
      metadata: {
        productId: 60891,
      },
    });
    if (response) {
      res.json({
        message: "Success",
        fileUrl: response.fileUrl,
        file: req.file,
      });
    }
  } catch (error) {
    res.json({
      message: "Upload failed",
      error: error,
    });
  }
};
