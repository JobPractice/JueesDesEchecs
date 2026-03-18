import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { ELO_TRANSACTION, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class EloTransactionService {
  constructor(private prisma: PrismaService) {}

  async eloTransaction(where: Prisma.ELO_TRANSACTIONWhereUniqueInput): Promise<ELO_TRANSACTION | null> {
    return this.prisma.eLO_TRANSACTION.findUnique({ where });
  }

  async eloTransactions(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ELO_TRANSACTIONWhereUniqueInput;
    where?: Prisma.ELO_TRANSACTIONWhereInput;
    orderBy?: Prisma.ELO_TRANSACTIONOrderByWithRelationInput;
  }): Promise<ELO_TRANSACTION[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.eLO_TRANSACTION.findMany({ skip, take, cursor, where, orderBy });
  }

  async createEloTransaction(data: Prisma.ELO_TRANSACTIONCreateInput): Promise<ELO_TRANSACTION> {
    return this.prisma.eLO_TRANSACTION.create({ data });
  }

  async updateEloTransaction(params: {
    where: Prisma.ELO_TRANSACTIONWhereUniqueInput;
    data: Prisma.ELO_TRANSACTIONUpdateInput;
  }): Promise<ELO_TRANSACTION> {
    const { data, where } = params;
    return this.prisma.eLO_TRANSACTION.update({ data, where });
  }

  async deleteEloTransaction(where: Prisma.ELO_TRANSACTIONWhereUniqueInput): Promise<ELO_TRANSACTION> {
    return this.prisma.eLO_TRANSACTION.delete({ where });
  }
}