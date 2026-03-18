import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import type { MATCHES, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class MatchesService {
  constructor(private prisma: PrismaService) {}

  // ✅ Get one match
  async match(
    where: Prisma.MATCHESWhereUniqueInput,
    include?: Prisma.MATCHESInclude
  ): Promise<MATCHES | null> {
    return this.prisma.mATCHES.findUnique({
      where,
      include,
    });
  }

  // ✅ Get many matches
  async matches(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MATCHESWhereUniqueInput;
    where?: Prisma.MATCHESWhereInput;
    orderBy?: Prisma.MATCHESOrderByWithRelationInput;
    include?: Prisma.MATCHESInclude;
  }): Promise<MATCHES[]> {
    const { skip, take, cursor, where, orderBy, include } = params;

    return this.prisma.mATCHES.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include,
    });
  }

  // ✅ Create match
  async createMatch(data: Prisma.MATCHESCreateInput): Promise<MATCHES> {
    return this.prisma.mATCHES.create({
      data,
    });
  }

  // ✅ Update match
  async updateMatch(params: {
    where: Prisma.MATCHESWhereUniqueInput;
    data: Prisma.MATCHESUpdateInput;
  }): Promise<MATCHES> {
    const { where, data } = params;

    return this.prisma.mATCHES.update({
      where,
      data,
    });
  }

  // ✅ Delete match
  async deleteMatch(where: Prisma.MATCHESWhereUniqueInput): Promise<MATCHES> {
    return this.prisma.mATCHES.delete({
      where,
    });
  }
}