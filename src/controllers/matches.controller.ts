import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { MatchesService } from '../services/matches.service.js';
import type { Prisma, MATCHES } from '../generated/prisma/client.js';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  // ✅ Create match with players and plays
  @Post()
  async createMatch(
    @Body()
    body: {
      ID_PLAYER1: number;
      ID_PLAYER2: number;
      MATCH_DATE?: string;
      ID_OPENING?: number;
      PLAYS?: { PLAY_CODE: string; PLAY_TIME?: string }[];
    }
  ) {
    if (!body) {
      throw new Error('Request body is missing ', body);
    }

    const data: Prisma.MATCHESCreateInput = {
      MATCH_DATE: body.MATCH_DATE ? new Date(body.MATCH_DATE) : undefined,
      PLAYERS_MATCHES_ID_PLAYER1ToPLAYERS: { connect: { ID_PLAYER: body.ID_PLAYER1 } },
      PLAYERS_MATCHES_ID_PLAYER2ToPLAYERS: { connect: { ID_PLAYER: body.ID_PLAYER2 } },
      OPENINGS: body.ID_OPENING ? { connect: { ID_OPENING: body.ID_OPENING } } : undefined,
      PLAYS: body.PLAYS
        ? { create: body.PLAYS.map(p => ({ PLAY_CODE: p.PLAY_CODE, PLAY_TIME: p.PLAY_TIME ? new Date(`1970-01-01T${p.PLAY_TIME}`) : undefined })) }
        : undefined,
    };

    return this.matchesService.createMatch(data);
  }

  // ✅ Get all matches (optional includes)
  @Get()
  async getMatches(@Param() params: MATCHES) {
    return this.matchesService.matches({});
  }

  // ✅ Get one match by ID (include players and plays)
  @Get(':id')
  async getMatch(@Param('id') id: string) {
    return this.matchesService.match(
      { ID_MATCH: Number(id) },
      {
        PLAYERS_MATCHES_ID_PLAYER1ToPLAYERS: true,
        PLAYERS_MATCHES_ID_PLAYER2ToPLAYERS: true,
        OPENINGS: true,
        PLAYS: true,
        ELO_TRANSACTION: true
      }
    );
  }



}