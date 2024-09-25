import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getBranches = async (req, res) => {
  const branches = await prisma.branch.findMany();
  res.json(branches);
}

export const getBranch = async (req, res) => {
  const { id } = req.params;
  const branch = await prisma.branch.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  res.json(branch);
}

export const createBranch = async (req, res) => {
  const newBranch = await prisma.branch.create({
    data: req.body,
  });
  res.json(newBranch);
}

export const updateBranch = async (req, res) => {
  const { id } = req.params;
  const branch = await prisma.branch.update({
    where: {
      id: parseInt(id),
    },
    data: req.body,
  });
  res.json(branch);
}

export const deleteBranch = async (req, res) => {
  const { id } = req.params;
  const branch = await prisma.branch.delete({
    where: {
      id: parseInt(id),
    },
  });
  res.json(branch);
}
