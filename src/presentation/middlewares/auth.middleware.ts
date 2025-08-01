import { Request, Response, NextFunction, RequestHandler } from "express";
import { AppCustomError } from "../../domain/errors/AppCustom.error";
import { UserRepository } from "../../domain/repositories/user/user.repository";
// import { prisma } from "../../data";
import { UserDatasource } from '../../domain/datasources/user/user.datasource';
import { ErrorMessage } from "../../domain/errors/Messages.error";
import { UserDatasourceImplementation } from "../../infrastructure/datasources/user/user.datasource.impl";
import { UserRepositoryImplementation } from "../../infrastructure/repositories/user/user.repository.impl";
import { JwtAdapter } from "../../config/jwt.adapter";

export class AuthMiddleware {

  private static userDatasource: UserDatasource =
    new UserDatasourceImplementation();
  private static userRepository: UserRepository =
    new UserRepositoryImplementation(this.userDatasource);

  static jwtMiddleware = () =>
    async (req: Request, _: Response, next: NextFunction) => {
      try {
        //Checamos si es valido el token es valido
        const authorization = req.header("Authorization");
        if (!authorization || !authorization.startsWith("Bearer"))
          throw AppCustomError.unauthorized(ErrorMessage["InvalidToken"]);

        const token = authorization.split(" ").at(1) || "";

        //Validamos si el token es correcto
        const payload = await JwtAdapter.validateToken<{ id: string }>(token);
        if (!payload)
          throw AppCustomError.unauthorized(ErrorMessage["ExpiredToken"]);

        // Verificamos si hay un usuario con el id del token que sacamos
        const user = await this.userRepository.getUserById(payload.id);

        if (!user)
          throw AppCustomError.unauthorized(ErrorMessage["InvalidToken"]);
        //Lo agregamos al body para que si en dado caso se usa

        req.body.user = user;
        return next();
 
      } catch (error) {
        console.log(error);
        next(error);
      }
    };
}
