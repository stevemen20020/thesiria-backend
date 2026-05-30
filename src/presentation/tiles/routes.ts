import { Router } from "express";
import { TilesDatasourceImplementation } from "../../infrastructure/datasources/tiles/tiles.datasource.impl";
import { TilesRepositoryImplementation } from "../../infrastructure/repositories/tiles/tiles.repository.impl";
import { TilesController } from "./controller";
import { multerMiddleware } from "../middlewares/upload.middleware";
import { CloudinaryDatasourceImpl } from "../../infrastructure/datasources/cloudinary/cloudinary.datasource.impl";
import { ImageRepositoryImpl } from "../../infrastructure/repositories/cloudinary/image.repository.impl";

export class tilesRoutes {

    static get routes() : Router {

        const router = Router();

        const datasource = new TilesDatasourceImplementation();
        const repository = new TilesRepositoryImplementation(datasource);

        const imageDatasource = new CloudinaryDatasourceImpl();
        const imageRepository = new ImageRepositoryImpl(imageDatasource)

        const controller = new TilesController(repository, imageRepository);

        router.get('/', controller.getTiles);
        router.get('/:id', controller.getTilesById);
        router.put('/:id', controller.updateTiles);
        router.delete('/:id', controller.deleteTiles);
        router.post('/', multerMiddleware.single("image"), controller.createTiles);

        return router
    }
}
