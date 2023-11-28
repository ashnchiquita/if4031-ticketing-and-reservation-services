import {S3Client} from '@aws-sdk/client-s3'
import {Upload} from '@aws-sdk/lib-storage'

const config = {
  accessKeyId: process.env.AWS_ACCESS_KEY as string,
  secretAccessKey: process.env.AWS_SECRET_KEY as string,
  bucket: process.env.S3_BUCKET_NAME as string,
  region: process.env.S3_REGION as string,
}

const client = new S3Client({
  credentials: {
    accessKeyId: config.accessKeyId,
    secretAccessKey: config.secretAccessKey,
  },
  region: config.region,
})

const upload = async (fileName: string, file: Blob) => {
  return await new Upload({
    client: client,
    params: {
      Bucket: config.bucket,
      Key: fileName,
      Body: file,
    },
  })
    .done()
    .then((data: any) => {
      return data.Location as string
    })
}

export default upload
