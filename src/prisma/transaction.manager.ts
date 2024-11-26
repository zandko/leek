import { Injectable } from '@nestjs/common';

import { TransactionOptions } from '@leek/common';
import { ContextProvider } from '@leek/providers';

import { PrismaService } from './prisma.service';

const TRANSACTIONAL_TIMEOUT = 1000 * 10; // Default transaction timeout in milliseconds

/**
 * TransactionManager handles running database operations within a transactional context.
 *
 * This service integrates Prisma transactions with contextual management to ensure
 * consistent transactional states across the application.
 */
@Injectable()
export class TransactionManager {
  constructor(private readonly prismaService: PrismaService) {}

  /**
   * Executes a callback function within a transactional context.
   *
   * The Prisma transaction instance is set in the ContextProvider during the transaction
   * and cleared afterward, ensuring clean state management.
   *
   * @template T - The return type of the callback.
   * @param {() => Promise<T>} callback - The function to execute within the transaction.
   * @param {TransactionOptions} [options] - Additional options for the transaction.
   * @returns {Promise<T>} - The result of the callback execution.
   * @throws {Error} - If the transaction or callback execution fails.
   *
   * @example
   * const result = await transactionManager.runInTransaction(async () => {
   *   await prisma.user.create({ data: { name: 'John Doe' } });
   *   return await prisma.user.findMany();
   * });
   */
  async runInTransaction<T>(callback: () => Promise<T>, options?: TransactionOptions): Promise<T> {
    const transactionOptions: TransactionOptions = {
      timeout: TRANSACTIONAL_TIMEOUT,
      ...options,
    };
    return this.prismaService.$transaction(async (prisma) => {
      ContextProvider.setTransactionPrisma(prisma);
      try {
        return await callback();
      } finally {
        ContextProvider.setTransactionPrisma(null);
      }
    }, transactionOptions);
  }
}
