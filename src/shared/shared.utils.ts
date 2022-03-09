import AWS from "aws-sdk";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_KEY,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

export const uploadToS3 = async (file, userId, folderName) => {
  const { filename, createReadStream } = await file;
  const readStream = createReadStream();
  const objectName = `${folderName}/${userId}-${Date.now()}-${filename}`;
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: "dwarf-instaclone-upload", //버켓 이름
      Key: objectName, // File이름
      ACL: "public-read", //object 의 프라이버시
      Body: readStream, //file (stream)
    })
    .promise();
  return Location;
};
