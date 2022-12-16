import { PubSub } from "@graphql-yoga/node";
import { PrismaClient } from "@prisma/client";

export interface IContext {
  prisma: PrismaClient;
  pubsub: PubSub<any>;
  request: Request;
}
