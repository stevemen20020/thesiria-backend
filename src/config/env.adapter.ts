import 'dotenv/config';
import { get } from 'env-var';

export const env = {
    PORT: get('PORT').default(3000).asPortNumber(),
    JWT_SEED: get('JWT_SEED').default('THESIRIA').asString(),
    CLOUDINARY_CLOUD_NAME: get('CLOUDINARY_CLOUD_NAME').default("CLOUD").asString(),
    CLOUDINARY_API_KEY: get('CLOUDINARY_API_KEY').default("APIKEY").asString(),
    CLOUDINARY_API_SECRET: get('CLOUDINARY_API_SECRET').default("CLOUDINARY_API_SECRET").asString()
}