import { PrismaClient } from "@prisma/client";
import { PubSub } from "@graphql-yoga/node";

export interface IContext {
  prisma: PrismaClient;
  pubsub: PubSub<any>;
  request?: any;
}
