import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { PrismaClient } from "@prisma/client";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { id, table } = req.body;

  if (req.method === "DELETE") {
    try {
      const model = (prisma as PrismaClient & Record<string, any>)[table];
      if (model && typeof id === "number") {
        await model.delete({
          where: { id },
        });
        res.status(200).json({ message: `${table} deleted successfully` });
      } else {
        res.status(400).json({ message: "Invalid table name or id" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting record", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
