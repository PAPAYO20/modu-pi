import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getClients = async (req, res) => {
  const clients = await prisma.client.findMany();
  res.json(clients);
}

export const createClient = async (req, res) => {
  const newClient = await prisma.client.create({
    data: req.body,
  });
  res.json(newClient);
}