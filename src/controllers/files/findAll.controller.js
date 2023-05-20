const { findDataOnBucket } = require("../../services/minio.service");

const findAllReportData = async (req, res) => {
  try {
    const { data, error } = await findDataOnBucket(req.query);
    if (!data || error) {
      return res.status(404).json({
        success: false,
        message: "Data is not found",
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Find all files successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error!",
      data: null,
    });
  }
};

module.exports = { findAllReportData };
