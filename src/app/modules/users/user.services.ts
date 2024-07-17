import { Prisma, UserRole } from "@prisma/client";
import * as bcrypt from "bcrypt";
import { helperFunction } from "../../../helpers/calculate.pagination";
import { TpaginationItems } from "../../../interface/pagination.interface";
import prisma from "../../../shared/prisma";

import { userSearchAbleFields } from "./user.constant";
type TInputData = {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profession?: string;
  address?: string;
};

const createAdminIntoDB = async (body: any) => {
  const hashPassword = await bcrypt.hash(body.password, 12);
  const userData = {
    email: body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };
  const adminData = {
    name: body.admin.name,
    username: body.admin.username,
    email: body.admin.email,
    contactNumber: body.admin.contactNumber,
  };

  const result = await prisma.$transaction(async (tx) => {
    const createUser = await tx.users.create({
      data: userData,
    });
    const createAdmin = await tx.admin.create({
      data: adminData,
    });
    const createUserProfile = await tx.userProfile.create({
      data: {
        user: {
          connect: {
            id: createUser.id,
          },
        },
        bio: body.admin.bio,
        profession: body.admin.profession,
        address: body.admin.address,
      },
    });
    return createAdmin;
  });
  return result;
};

const createUserIntoDB = async (body: any) => {};

const getAllUserFromDB = async (params: any, options: TpaginationItems) => {
  const { searchTerm, ...filterData } = params;

  const { limit, sortBy, sortOrder, skip, page } =
    helperFunction.calculatePaginationFiltering(options);

  const andCondition: Prisma.UsersWhereInput[] = [];
  //This condition for only search any items
  if (params.searchTerm) {
    andCondition.push({
      OR: userSearchAbleFields.map((field) => ({
        [field]: {
          contains: params.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  //This condition for specific field, for example name, email, contactnumber, etc
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereCondition: Prisma.UsersWhereInput =
    andCondition.length > 0 ? { AND: andCondition } : {};

  const result = await prisma.users.findMany({
    where: whereCondition,
    skip,
    take: limit,
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : {
            createdAt: "desc",
          },
    select: {
      id: true,
      email: true,
      role: true,
      needPasswordChange: true,
      status: true,
      createdAt: true,
      updatedAt: true,
      admin: true,

      profile: true,
    },
  });

  const totalCount = await prisma.users.count({
    where: whereCondition,
  });
  return {
    meta: {
      page,
      limit,
      totalCount,
    },

    data: result,
  };
};

const getAllAdminFromDB = async () => {
  const result = await prisma.admin.findMany({
    where: {
      isDeleted: false,
      user: {
        role: UserRole?.ADMIN,
      },
    },
    include: {
      user: true,
    },
  });

  return result;
};

export const userServices = {
  createUserIntoDB,
  createAdminIntoDB,
  getAllUserFromDB,

  getAllAdminFromDB,
};
