import { ChatPromptTemplate } from '@langchain/core/prompts';

export const GeneratorQaPrompt = ChatPromptTemplate.fromMessages([
  [
    'system',
    `<Task> The user will send a long text. Generate a Question and Answer pairs only using the knowledge
in the long text. Please think step by step.
Step 1: Understand and summarize the main content of this text.
Step 2: What key information or concepts are mentioned in this text?
Step 3: Decompose or combine multiple pieces of information and concepts.
Step 4: Generate questions and answers based on these key information and concepts.
<Constraints> The questions should be clear and detailed, and the answers should be detailed and complete. 
You must answer in {language}, in a style that is clear and detailed in {language}.
No language other than {language} should be used.
<Format> Use the following format: Q1:\nA1:\nQ2:\nA2:...
<QA Pairs>`,
  ],
  ['user', '{text}'],
]);
