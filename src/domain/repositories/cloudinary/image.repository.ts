import { UploadImageResponse } from "../../datasources/cloudinary/image.datasource";

export abstract class ImageRepository {
  abstract uploadImage(
    file: Buffer,
    folder?: string
  ): Promise<UploadImageResponse>;

  abstract deleteImage(
    publicId: string
  ): Promise<void>;
}