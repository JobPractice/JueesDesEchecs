import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { OPENING_PLAYS, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class OpeningPlaysService {
  constructor(private prisma: PrismaService) {}

  async openingPlay(where: Prisma.OPENING_PLAYSWhereUniqueInput): Promise<OPENING_PLAYS | null> {
    return this.prisma.oPENING_PLAYS.findUnique({ where });
  }

  async openingPlays(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.OPENING_PLAYSWhereUniqueInput;
    where?: Prisma.OPENING_PLAYSWhereInput;
    orderBy?: Prisma.OPENING_PLAYSOrderByWithRelationInput;
  }): Promise<OPENING_PLAYS[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.oPENING_PLAYS.findMany({ skip, take, cursor, where, orderBy });
  }

  async createOpeningPlay(data: Prisma.OPENING_PLAYSCreateInput): Promise<OPENING_PLAYS> {
    return this.prisma.oPENING_PLAYS.create({ data });
  }

  async updateOpeningPlay(params: {
    where: Prisma.OPENING_PLAYSWhereUniqueInput;
    data: Prisma.OPENING_PLAYSUpdateInput;
  }): Promise<OPENING_PLAYS> {
    const { data, where } = params;
    return this.prisma.oPENING_PLAYS.update({ data, where });
  }

  async deleteOpeningPlay(where: Prisma.OPENING_PLAYSWhereUniqueInput): Promise<OPENING_PLAYS> {
    return this.prisma.oPENING_PLAYS.delete({ where });
  }
}