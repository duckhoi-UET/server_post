import axios from "axios";
import FormData from "form-data";

export const uploadImage = async (req, res) => {
  console.log(req.file);
  const formData = new FormData();
  formData.append("source", req.file.originalname);
  const url = "https://freeimage.host/api/1/upload";
  const apiKey = "6d207e02198a847aa98d0a2a901485a5";

  try {
    const response = await axios.post(`${url}?key=${apiKey}`, {
      source: formData,
    });

    console.log(response); // Process the API response data
  } catch (error) {
    console.log(error);
  }
};
