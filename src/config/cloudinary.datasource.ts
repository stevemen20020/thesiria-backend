import { UploadApiResponse } from "cloudinary";
import { cloudinary } from "./cloudinary.config";

export class CloudinaryDatasource {
  async uploadImage(
    fileBuffer: Buffer,
    folder: string
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder,
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);

            resolve(result!);
          }
        )
        .end(fileBuffer);
    });
  }
}