import { Controller, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";
import { OpeningsService } from "../services/openings.service.js";
import type { Prisma } from "../generated/prisma/client.js";
import type { OPENINGS } from "../generated/prisma/client.js";

@Controller("openings")
export class OpeningsController {
    constructor(private readonly openingsService: OpeningsService) { }

    @Get()
    async getOpenings(@Query("includePlays") includePlays?: String): Promise<OPENINGS[]> {
        return this.openingsService.openings({
            include: includePlays === "true" ? { OPENING_PLAYS: true } : undefined,
        } as any)
    }


    @Get(":id")
    async getOpeningById(@Param("id") id: string): Promise<OPENINGS | null> {
        return this.openingsService.opening({
            ID_OPENING: Number(id),
        }, {
            OPENING_PLAYS: true
        } as any)
    }


    @Post()
    async createOpening(@Body() body: {
        OPENING_NAME: string;
        plays?: { OP_PLAY_CODE: string }[];
    }) {
        const data: Prisma.OPENINGSCreateInput = {
            OPENING_NAME: body.OPENING_NAME,
            OPENING_PLAYS: body.plays
                ? {
                    create: body.plays.map(p => ({
                        OP_PLAY_CODE: p.OP_PLAY_CODE,
                    })),
                }
                : undefined,
        };

        return this.openingsService.createOpening(data);
    }

    @Put(':id')
    async updateOpening(
        @Param('id') id: string,
        @Body() body: { OPENING_NAME?: string }
    ) {
        return this.openingsService.updateOpening({
            where: { ID_OPENING: Number(id) },
            data: {
                OPENING_NAME: body.OPENING_NAME,
            },
        });
    }

    @Delete(':id')
    async deleteOpening(@Param('id') id: string) {
        return this.openingsService.deleteOpening({
            ID_OPENING: Number(id),
        });
    }

}

