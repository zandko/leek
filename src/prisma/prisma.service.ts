import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { ContextProvider } from '@leek/providers';

/**
 * PrismaService integrates Prisma ORM with NestJS lifecycle hooks.
 * It provides transactional support via ContextProvider.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private readonly prismaClient: PrismaClient;

  constructor() {
    super();
    this.prismaClient = new PrismaClient(); // Creates a new instance of PrismaClient
  }

  /**
   * Returns the current Prisma client instance.
   *
   * If a transactional Prisma client is available in the context, it is returned instead.
   *
   * @returns {PrismaClient} - The active Prisma client.
   */
  get prisma(): PrismaClient {
    const transactionalPrisma = ContextProvider.getTransactionPrisma<PrismaClient>();
    if (transactionalPrisma) {
      return transactionalPrisma;
    }
    return this.prismaClient;
  }

  /**
   * Handles the module initialization lifecycle hook.
   *
   * Establishes the connection to the database.
   */
  public async onModuleInit() {
    try {
      await this.prismaClient.$connect();
    } catch (error) {
      this.logger.error('Failed to connect to the database.', error.stack || error.message);
    }
  }

  /**
   * Handles the module destruction lifecycle hook.
   *
   * Disconnects from the database to clean up resources.
   */
  public async onModuleDestroy() {
    await this.prismaClient.$disconnect();
  }
}
