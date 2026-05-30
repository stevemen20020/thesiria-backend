export abstract class ImageDatasource {
  abstract uploadImage(
    file: Buffer,
    folder?: string
  ): Promise<UploadImageResponse>;

  abstract deleteImage(
    publicId: string
  ): Promise<void>;
}

export interface UploadImageResponse {
  secureUrl: string;
  publicId: string;
}