import { Request, Response, NextFunction } from "express";
import { requireAuth } from "./requireAuth";

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // First, rely on the main requireAuth to populate req.user
  requireAuth(req, res, () => {
    if (!req.user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    if (!adminEmail || req.user.email !== adminEmail) {
      res.status(403).json({ error: "Forbidden: Admin access required" });
      return;
    }

    next();
  });
}
