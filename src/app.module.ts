import {Module} from "@nestjs/common";
import { PlayersController } from "./controllers/players.controller.js";
import {ConfigModule} from "@nestjs/config";
import { PlayersService } from "./services/players.service.js";
import { PrismaService } from "./services/prisma.service.js";
import { EloTransactionService } from "./services/eloTransaction.service.js";
import { MatchesController } from "./controllers/matches.controller.js";
import { OpeningsController } from "./controllers/openings.controller.js";
import { OpeningsService } from "./services/openings.service.js";
import { MatchesService } from "./services/matches.service.js";
import { PlaysController } from "./controllers/plays.controller.js";
import { PlaysService } from "./services/plays.service.js";


@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [PlayersController, MatchesController, OpeningsController, MatchesController, PlaysController],
    providers: [PlayersService, PrismaService, EloTransactionService, OpeningsService, MatchesService, MatchesService, PlaysService]
})

export class AppModule {}
