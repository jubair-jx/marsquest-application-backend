import { PrismaClient } from "@prisma/client";
import prisma from "../../../shared/prisma";
const prismaForUpdate = new PrismaClient();

const getAllProfilesFromDB = async () => {
  const result = await prisma.userProfile.findMany({
    select: {
      id: true,
      user: true,
      bio: true,
      profession: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return result;
};

export const profileServices = {
  getAllProfilesFromDB,
};
