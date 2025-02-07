import { Injectable, Logger } from '@nestjs/common';

import { StringOutputParser } from '@langchain/core/output_parsers';

import { ConfigureAdapter } from '@leek/configure';
import { LanguageModels, LLMProvider } from '@leek/constants';
import { initModels } from '@leek/langchain';

import { GeneratorQaPrompt } from '../shared/prompts/generator.qa.prompt';
import { extractQAPairsFromText, QAPair } from '../shared/utils/extract.qa.pairs.from.text.util';

@Injectable()
export class LLMGeneratorService {
  private readonly logger = new Logger(LLMGeneratorService.name);

  constructor(private readonly configureService: ConfigureAdapter) {}

  /**
   * Generates a QA document based on input text and target language using an LLM.
   *
   * This method leverages OpenAI GPT models to process the input text and
   * generate formatted QA content using a custom prompt and output parser.
   *
   * @param {string} text - The raw input text to process.
   * @param {string} docLanguage - The target language for the QA document (e.g., "en" or "zh").
   * @returns {Promise<QAPair[]>} - An array of formatted QA segments.
   * @throws {Error} - If the LLM model invocation or parsing fails.
   *
   * @example
   * const qaSegments = await llmGeneratorService.generateQaDocumentFromTextAndLanguage('Some text', 'en');
   * console.log(qaSegments); // Output: [{ question: '...', answer: '...' }]
   */
  async generateQaDocumentFromTextAndLanguage(text: string, docLanguage: string): Promise<QAPair[]> {
    try {
      const chain = GeneratorQaPrompt.pipe(
        initModels({ maxTokens: 2000, model: LanguageModels[LLMProvider.OpenAI].GPT_4_O }),
      ).pipe(new StringOutputParser());

      const rawQaOutput = await chain.invoke({ text, language: docLanguage });

      const parsedQaPairs = extractQAPairsFromText(rawQaOutput);

      return parsedQaPairs;
    } catch (error) {
      this.logger.error('Failed to generate QA document.', error.stack || error.message);
      throw new Error(`LLM generation error: ${(error as Error).message}`);
    }
  }
}
