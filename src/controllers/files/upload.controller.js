const { uploadFileToMinio } = require("../../services/minio.service");

const uploadFile = async (req, res) => {
  try {
    const { code, document } = req.body.data;
    uploadFileToMinio({ ...document, code });
    return res.status(200).json({
      success: true,
      message: "Upload file successfully",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error!",
      data: null,
    });
  }
};

module.exports = { uploadFile };
