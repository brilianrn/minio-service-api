const Minio = require("minio");
const fs = require("fs");

const minioConfig = {
  endPoint: process.env.MINIO_BASE_URL,
  port: +process.env.MINIO_PORT,
  useSSL: process.env.MINIO_USE_SSL === "true" || false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
};

const uploadFileToMinio = (file) => {
  try {
    const existDir = "./src/assets/files";
    if (!fs.existsSync(existDir)) {
      fs.mkdirSync(existDir);
    }

    const name = `${file.fileName.replace(/\s/g, "-")}_${Date.now()}`;
    const path = "./src/assets/files/" + `${name}${file.fileExtention}`;
    const base64 = file.fileContent;
    const base64Data = base64.replace(/^data:([A-Za-z-+/]+);base64,/, "");
    fs.writeFileSync(path, base64Data, { encoding: "base64" });

    const minioClient = new Minio.Client(minioConfig);
    minioClient.makeBucket(
      process.env.MINIO_BUCKET_NAME,
      process.env.MINIO_BUCKET_REGION,
      (err) => {
        if (err) console.log(err);
        console.log(
          `Bucket created successfully in ${process.env.MINIO_BUCKET_REGION}.`
        );
      }
    );
    const metaData = {
      "Content-Type": "application/octet-stream",
    };
    minioClient.fPutObject(
      process.env.MINIO_BUCKET_NAME,
      `/${file.code}/${process.env.MINIO_SUB_BUCKET_2}/${name}${file.fileExtention}`,
      path,
      metaData,
      (err, res) => {
        if (err) console.log(err);
        console.log("File uploaded successfully.", res);
        fs.unlinkSync(path);
      }
    );
    return {
      data: {
        name,
        url: `https://${file.fileName.replace(/\s/g, "-")}_${Date.now()}.com`,
      },
      error: null,
    };
  } catch (error) {
    return { error, data: null };
  }
};

const findDataOnBucket = async ({ subbucket, id }) => {
  try {
    const minioClient = new Minio.Client(minioConfig);
    console.log(
      `/${id}/${process.env.MINIO_SUB_BUCKET_2}${
        subbucket ? `/${subbucket}` : ""
      }`
    );
    const objectsList = await new Promise((resolve, reject) => {
      const objectsListTemp = [];
      const stream = minioClient.listObjectsV2(
        process.env.MINIO_BUCKET_NAME,
        `/${id}/${subbucket || process.env.MINIO_SUB_BUCKET_2}`,
        true,
        ""
      );

      stream.on("data", (obj) => objectsListTemp.push(obj.name));
      stream.on("error", reject);
      stream.on("end", () => {
        resolve(objectsListTemp);
      });
    });
    return { data: objectsList, error: null };
  } catch (error) {
    return { error, data: null };
  }
};

module.exports = { uploadFileToMinio, findDataOnBucket };
