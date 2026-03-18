import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { PLAYS, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class PlaysService {
  constructor(private prisma: PrismaService) {}

  async play(where: Prisma.PLAYSWhereUniqueInput): Promise<PLAYS | null> {
    return this.prisma.pLAYS.findUnique({ where });
  }

  async plays(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PLAYSWhereUniqueInput;
    where?: Prisma.PLAYSWhereInput;
    orderBy?: Prisma.PLAYSOrderByWithRelationInput;
  }): Promise<PLAYS[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pLAYS.findMany({ skip, take, cursor, where, orderBy });
  }

  async createPlay(data: Prisma.PLAYSCreateInput): Promise<PLAYS> {
    return this.prisma.pLAYS.create({ data });
  }

  async updatePlay(params: {
    where: Prisma.PLAYSWhereUniqueInput;
    data: Prisma.PLAYSUpdateInput;
  }): Promise<PLAYS> {
    const { data, where } = params;
    return this.prisma.pLAYS.update({ data, where });
  }

  async deletePlay(where: Prisma.PLAYSWhereUniqueInput): Promise<PLAYS> {
    return this.prisma.pLAYS.delete({ where });
  }
}