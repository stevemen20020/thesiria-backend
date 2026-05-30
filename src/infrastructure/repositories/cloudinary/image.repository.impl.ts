import { ImageDatasource } from "../../../domain/datasources/cloudinary/image.datasource";
import { ImageRepository } from "../../../domain/repositories/cloudinary/image.repository";

export class ImageRepositoryImpl
  implements ImageRepository
{
  constructor(
    private readonly datasource: ImageDatasource
  ) {}

  uploadImage(file: Buffer, folder?: string) {
    return this.datasource.uploadImage(file, folder);
  }

  deleteImage(publicId: string) {
    return this.datasource.deleteImage(publicId);
  }
}