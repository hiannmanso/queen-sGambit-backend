-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "last_status" TEXT NOT NULL,

    CONSTRAINT "accounts_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "game_history" (
    "id" SERIAL NOT NULL,
    "starting_position" TEXT NOT NULL,
    "final_position" TEXT NOT NULL,
    "piece" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "game_token" TEXT NOT NULL,

    CONSTRAINT "game_history_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" SERIAL NOT NULL,
    "first_player_id" INTEGER NOT NULL,
    "second_player_id" INTEGER NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "games_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" SERIAL NOT NULL,
    "position" TEXT NOT NULL,
    "contains" TEXT NOT NULL,
    "line" INTEGER NOT NULL,
    "column" TEXT NOT NULL,
    "index_of_column" INTEGER NOT NULL,
    "index" INTEGER NOT NULL,
    "color" TEXT NOT NULL,
    "game_token" TEXT NOT NULL,

    CONSTRAINT "table_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_username_key" ON "accounts"("username");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_email_key" ON "accounts"("email");

-- CreateIndex
CREATE UNIQUE INDEX "game_history_starting_position_key" ON "game_history"("starting_position");

-- CreateIndex
CREATE UNIQUE INDEX "game_history_final_position_key" ON "game_history"("final_position");

-- CreateIndex
CREATE UNIQUE INDEX "games_token_key" ON "games"("token");

-- CreateIndex
CREATE UNIQUE INDEX "table_position_key" ON "table"("position");

-- CreateIndex
CREATE UNIQUE INDEX "table_index_key" ON "table"("index");

-- AddForeignKey
ALTER TABLE "game_history" ADD CONSTRAINT "game_history_fk0" FOREIGN KEY ("game_token") REFERENCES "games"("token") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_fk0" FOREIGN KEY ("first_player_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games" ADD CONSTRAINT "games_fk1" FOREIGN KEY ("second_player_id") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_fk0" FOREIGN KEY ("game_token") REFERENCES "games"("token") ON DELETE NO ACTION ON UPDATE NO ACTION;
