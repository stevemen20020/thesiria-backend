import { Request, Response, NextFunction } from "express";

export async function tenantMiddleware(req: Request, res: Response, next: NextFunction) {
  const tenantId = req.headers["x-tenant-id"] as string; // El cliente manda el ID del tenant

  if (!tenantId) {
    return res.status(400).json({ error: "Tenant ID es requerido" });
  }

  try {
    // req.prisma = await getTenantPrismaClient(tenantId);
    next();
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo la BD del tenant" });
  }
}
