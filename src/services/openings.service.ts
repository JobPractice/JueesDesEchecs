import { Injectable } from "@nestjs/common";
import { PrismaService } from "./prisma.service.js";
import { OPENINGS, Prisma } from "../generated/prisma/client.js";

@Injectable()
export class OpeningsService {
    constructor(private prisma: PrismaService) { }


    async openings(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.OPENINGSWhereUniqueInput;
        where?: Prisma.OPENINGSWhereInput;
        orderBy?: Prisma.OPENINGSOrderByWithRelationInput;
        include?: Prisma.OPENINGSInclude;
    }) {
        const { skip, take, cursor, where, orderBy, include } = params;
        return this.prisma.oPENINGS.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
            include,
        });
    }

    async createOpening(data: Prisma.OPENINGSCreateInput): Promise<OPENINGS> {
        return this.prisma.oPENINGS.create({ data });
    }

    async updateOpening(params: {
        where: Prisma.OPENINGSWhereUniqueInput;
        data: Prisma.OPENINGSUpdateInput;
    }): Promise<OPENINGS> {
        const { data, where } = params;
        return this.prisma.oPENINGS.update({ data, where });
    }

    async deleteOpening(where: Prisma.OPENINGSWhereUniqueInput): Promise<OPENINGS> {
        return this.prisma.oPENINGS.delete({ where });
    }

    async opening(
        where: Prisma.OPENINGSWhereUniqueInput,
        include?: Prisma.OPENINGSInclude
    ) {
        return this.prisma.oPENINGS.findUnique({
            where,
            include,
        });
    }
}