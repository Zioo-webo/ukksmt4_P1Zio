// lib/prisma-middleware.ts
import { Prisma } from "@prisma/client";

export const softDeleteMiddleware: Prisma.Middleware = async (params, next) => {
  // Hanya intercept model yang punya deleted_at
  const modelsWithSoftDelete = ["User", "Alat", "Kegiatan"]; // tambahkan sesuai kebutuhan

  if (!modelsWithSoftDelete.includes(params.model)) {
    return next(params);
  }

  // ✅ Auto-filter: exclude soft-deleted records
  if (params.action === "findMany" || params.action === "findFirst" || params.action === "findUnique") {
    if (params.args?.where) {
      params.args.where = {
        ...params.args.where,
        deleted_at: null, // Hanya yang belum dihapus
      };
    } else {
      params.args = {
        ...params.args,
        where: { deleted_at: null },
      };
    }
  }

  // ✅ Auto-filter untuk count
  if (params.action === "count") {
    if (params.args?.where) {
      params.args.where = {
        ...params.args.where,
        deleted_at: null,
      };
    } else {
      params.args = {
        ...params.args,
        where: { deleted_at: null },
      };
    }
  }

  return next(params);
};