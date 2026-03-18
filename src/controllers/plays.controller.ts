import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PlaysService } from '../services/plays.service.js';
import type { Prisma, PLAYS } from '../generated/prisma/client.js';
@Controller('plays')
export class PlaysController {
  constructor(private readonly playsService: PlaysService) {}

  // ✅ Get all plays
  @Get()
  async getPlays() {
    return this.playsService.plays({});
  }

  @Get("match/:id")
    async getPlaysByMatch(@Param('id') id: string): Promise<PLAYS[]> {
    return this.playsService.plays({
        where: { ID_MATCH: Number(id) },
    });
    }

  // ✅ Get one play by ID
  @Get(':id')
  async getPlay(@Param('id') id: string) {
    return this.playsService.play({ ID_PLAY: Number(id) });
  }

  // ✅ Create a play
  @Post()
  async createPlay(@Body() body: PLAYS): Promise<PLAYS | null> {
    const data: Prisma.PLAYSCreateInput = {
      PLAY_CODE: body.PLAY_CODE,
      MATCHES: { connect: { ID_MATCH: body.ID_MATCH } },
      PLAY_TIME: body.PLAY_TIME ? new Date(`1970-01-01T${body.PLAY_TIME}`) : undefined,
    };
    return this.playsService.createPlay(data);
  }

  // ✅ Update a play
  @Put(':id')
  async updatePlay(
    @Param('id') id: string,
    @Body() body: { PLAY_CODE?: string; PLAY_TIME?: string }
  ) {
    const data: Prisma.PLAYSUpdateInput = {
      PLAY_CODE: body.PLAY_CODE,
      PLAY_TIME: body.PLAY_TIME ? new Date(`1970-01-01T${body.PLAY_TIME}`) : undefined,
    };
    return this.playsService.updatePlay({
      where: { ID_PLAY: Number(id) },
      data,
    });
  }

  // ✅ Delete a play
  @Delete(':id')
  async deletePlay(@Param('id') id: string) {
    return this.playsService.deletePlay({ ID_PLAY: Number(id) });
  }
}