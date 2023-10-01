import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createPost = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const getAllPost = async (options: any) => {
  const { sortBy, orderBy, searchTerm, page, limit } = options;

  // pagination
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit) || 0;
  const take = parseInt(limit) || 10;

  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
      skip,
      take,
      include: {
        author: true,
        category: true,
      },
      orderBy:
        sortBy && orderBy
          ? {
              [sortBy]: orderBy,
            }
          : { createdAt: "desc" },
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              // case sensitivity dur korbe
              mode: "insensitive",
            },
          },
          {
            author: {
              name: {
                contains: searchTerm,
                mode: "insensitive",
              },
            },
          },
        ],
      },
    });
    const total = await tx.post.count();
    return { data: result, total };
  });
};

const getSinglePost = async (id: number) => {
  const result = await prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
    },
  });
  return result;
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post> => {
  const result = await prisma.post.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });
  return result;
};

// aggregation and groping
const aggregateAndGrouping = async () => {
  // aggregation
  //   const result = await prisma.post.aggregate({
  //     _avg: {
  //       categoryId: true,
  //       authorId: true,
  //     },
  //     _count: {
  //       categoryId: true,
  //     },
  //     _sum: {
  //       categoryId: true,
  //     },
  //   });

  // groping
  const result = await prisma.post.groupBy({
    by: ["title", "categoryId"],
    _count: {
      title: true,
    },
  });
  return result;
};

export const PostService = {
  createPost,
  getAllPost,
  getSinglePost,
  updatePost,
  deletePost,
  aggregateAndGrouping,
};
