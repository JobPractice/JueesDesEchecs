import { Controller, Get, Param, Body, Post, Put, Delete} from "@nestjs/common";
import { PlayersService } from "../services/players.service.js";
import { EloTransactionService } from "../services/eloTransaction.service.js";
import type {PLAYERS} from "../generated/prisma/client.js";


@Controller("players")
export class PlayersController {
    constructor(
        private readonly playersService: PlayersService,
        private readonly eloTransactionService: EloTransactionService
    ){}


    @Get("/:ID_PLAYER")
    async getPlayerById(@Param("ID_PLAYER") ID_PLAYER: String): Promise<PLAYERS | null> {
        return this.playersService.player({ ID_PLAYER: Number(ID_PLAYER) });
    }

    @Get()
    async getAllPlayers(): Promise<PLAYERS[]> {
        return this.playersService.players({});
    }

    @Post()
    async createPlayer(@Body() playerData: PLAYERS): Promise<PLAYERS> {
        return this.playersService.createPlayer(playerData);
    }
    @Post('/bulk')
    async createMany(@Body() players: { PLAYER_NAME: string }[]): Promise<PLAYERS[] | null>{
        if (!players || !Array.isArray(players)) {
            throw new Error('Request body must be an array of players');
        }
    return Promise.all(players.map(p => this.playersService.createPlayer(p)));
    }

    @Put("/:ID_PLAYER")
    async updatePlayer(@Param("ID_PLAYER") ID_PLAYER: String, @Body() playerData: PLAYERS): Promise<PLAYERS> {
        return this.playersService.updatePlayer({ where: { ID_PLAYER: Number(ID_PLAYER) }, data: playerData });
    }

    @Delete("/:ID_PLAYER")
    async deletePlayer(@Param("ID_PLAYER") ID_PLAYER: String): Promise<PLAYERS> {
        return this.playersService.deletePlayer({ID_PLAYER: Number(ID_PLAYER)})
    }

}







