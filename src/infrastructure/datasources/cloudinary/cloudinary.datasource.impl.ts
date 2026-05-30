import { cloudinary } from "../../../config/cloudinary.config";
import { ImageDatasource, UploadImageResponse } from "../../../domain/datasources/cloudinary/image.datasource";
import { createReadStream } from "streamifier"

export class CloudinaryDatasourceImpl
  implements ImageDatasource
{
  async uploadImage(
    file: Buffer,
    folder = "dnd-app"
  ): Promise<UploadImageResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve({
            secureUrl: result!.secure_url,
            publicId: result!.public_id,
          });
        }
      );

      createReadStream(file).pipe(stream);
    });
  }

  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId);
  }
}