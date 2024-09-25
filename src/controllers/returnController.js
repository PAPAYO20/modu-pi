import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getReturns = async (req, res) => {
  const returns = await prisma.returns.findMany({
    include: {
      product: true,
      client: true,
    },
  });
  res.json(returns);
};

export const getReturnById = async (req, res) => {
  const { id } = req.params;
  const returnItem = await prisma.returns.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      product: true,
      client: true,
    },
  });
  res.json(returnItem);
};

export const createReturn = async (req, res) => {
  try {
    const { productId, clientId, reason, quantity, returnDate } = req.body;

    const newReturn = await prisma.returns.create({
      data: {
        productId,
        clientId,
        reason,
        quantity,
        returnDate,
      },
    });

    res.json(newReturn);
  } catch (error) {
    console.error("Error creating return:", error);
  }
};

export const updateReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId, clientId, reason, quantity, returnDate } = req.body;

    const updatedReturn = await prisma.returns.update({
      where: {
        id: parseInt(id),
      },
      data: {
        productId,
        clientId,
        reason,
        quantity,
        returnDate,
      },
    });

    res.json(updatedReturn);
  } catch (error) {
    console.error("Error updating return:", error);
  }
};

export const deleteReturn = async (req, res) => {
  const { id } = req.params;
  const returnItem = await prisma.returns.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(returnItem);
};
