const Joi = require("joi");
const { isEmpty, isbu } = require("lodash");
const base64Validator = require("is-base64");

const uploadFileValidator = async (req, res, next) => {
  try {
    const { document } = req.body.data;
    const schema = Joi.object()
      .keys({
        data: Joi.object({
          code: Joi.string().required(),
          document: Joi.object({
            fileName: Joi.string().required(),
            fileContent: Joi.string().required(),
          }).required(),
        }).required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({ ...req.body });
    const isBase64 = base64Validator(document.fileContent, {
      allowEmpty: false,
      allowMime: true,
    });
    if (isEmpty(result.error) && isBase64) next();
    else {
      const error = !isBase64
        ? '"data.document.fileContent" must be base64'
        : result.error.message;
      return res.status(400).json({
        success: false,
        message: !isBase64
          ? '"data.document.fileContent" must be base64'
          : error || "Please check your data again!",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      data: null,
    });
  }
};

const findAllByCodeValidatior = async (req, res, next) => {
  try {
    const schema = Joi.object()
      .keys({
        subbucket: Joi.string(),
        id: Joi.string().required(),
      })
      .options({ allowUnknown: true });
    const result = schema.validate({ ...req.query });
    if (isEmpty(result.error)) next();
    else {
      const error = result.error.message;
      return res.status(400).json({
        success: false,
        message: error || "Please check your data again!",
        data: null,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error!",
      data: null,
    });
  }
};

module.exports = { uploadFileValidator, findAllByCodeValidatior };
