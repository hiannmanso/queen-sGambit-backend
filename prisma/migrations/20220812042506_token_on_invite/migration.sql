-- CreateTable
CREATE TABLE "invites" (
    "id" SERIAL NOT NULL,
    "to" INTEGER NOT NULL,
    "from" INTEGER NOT NULL,
    "status_invite" TEXT NOT NULL,
    "last_status" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "invites_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_fk0" FOREIGN KEY ("to") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_fk1" FOREIGN KEY ("from") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
