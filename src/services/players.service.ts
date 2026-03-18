import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { PLAYERS, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class PlayersService {
  constructor(private prisma: PrismaService) {}

  async player(where: Prisma.PLAYERSWhereUniqueInput): Promise<PLAYERS | null> {
    return this.prisma.pLAYERS.findUnique({ where });
  }

  async players(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PLAYERSWhereUniqueInput;
    where?: Prisma.PLAYERSWhereInput;
    orderBy?: Prisma.PLAYERSOrderByWithRelationInput;
  }): Promise<PLAYERS[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pLAYERS.findMany({ skip, take, cursor, where, orderBy });
  }

  async createPlayer(data: Prisma.PLAYERSCreateInput): Promise<PLAYERS> {
    return this.prisma.pLAYERS.create({ data });
  }


  async updatePlayer(params: {
    where: Prisma.PLAYERSWhereUniqueInput;
    data: Prisma.PLAYERSUpdateInput;
  }): Promise<PLAYERS> {
    const { data, where } = params;
    return this.prisma.pLAYERS.update({ data, where });
  }

  async deletePlayer(where: Prisma.PLAYERSWhereUniqueInput): Promise<PLAYERS> {
    return this.prisma.pLAYERS.delete({ where });
  }
}