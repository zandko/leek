export const CONTEXT = `Use the following context as your learned knowledge, inside <context></context> XML tags.

<context>
{{#context#}}
</context>

When answer to user:
- If you don't know, just say that you don't know.
- If you don't know when you are not sure, ask for clarification.
Avoid mentioning that you obtained the information from the context.
And answer according to the language of the user's question.\n\n`;

export const b = `Here is the chat histories between human and assistant, inside <histories></histories> XML tags.

<histories>
{{#histories#}}
</histories>\n\n`;

export const GENERATOR_QA_PROMPT = `<Task> The user will send a long text. Generate a Question and Answer pairs only using the knowledge
in the long text. Please think step by step.
Step 1: Understand and summarize the main content of this text.
Step 2: What key information or concepts are mentioned in this text?
Step 3: Decompose or combine multiple pieces of information and concepts.
Step 4: Generate questions and answers based on these key information and concepts.
<Constraints> The questions should be clear and detailed, and the answers should be detailed and complete. 
You must answer in {language}, in a style that is clear and detailed in {language}.
No language other than {language} should be used.
<Format> Use the following format: Q1:\nA1:\nQ2:\nA2:...
<QA Pairs>`;

export const QUESTION_GENERATOR_TEMPLATE = `Given the following question history and a follow up question, rephrase the follow up question to be a standalone question.
Your are only permitted to rephrase the question, not to provide an answer.
Your are only permitted to rephrase the question in Chinese.
Your need to streamline the question, emphasize the theme, and remove irrelevant or unnecessary details.

If you encounter questions related to finding goods, finding a store or finding a hotel, please rephrase the question in a commanding way.
If a following question is unrelated to the previous one, ensure to rephrase it as a completely independent new question, avoiding any connection with the previous one. However, if a following question needs to be related to the previous one, then when rephrase the question, make sure to effectively link this independent question with the previous one.

----------------
QUESTION HISTORY:

{newQuestionHistory}
----------------
FOLLOW UP INPUT: {question}
----------------

Your answer(请用中文简体白话文回答)(Let's work this out in a step by step way to be sure we have the right answer):`;
