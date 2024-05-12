import { ContextChatEngine, Settings } from "llamaindex";
import { getDataSource } from "./index";

export async function createChatEngine() {
  const index = await getDataSource();
  if (!index) {
    throw new Error(
      `StorageContext is empty - call 'npm run generate' to generate the storage first`,
    );
  }
  const retriever = index.asRetriever();
  retriever.similarityTopK = process.env.TOP_K
    ? parseInt(process.env.TOP_K)
    : 3;

  return new ContextChatEngine({
    chatModel: Settings.llm,
    retriever,
    contextSystemPrompt({ context }) {
      return `Context information is below. 
      The context is a large array of text files with information regarding Eventbrite events for the month of May in the year 2024.
      ---------------------
      ${context}
      ---------------------
      You are an event curator, with a database of Eventbrite events to reference.
      Your role is to suggest events that you believe the user will enjoy based on their queries.
      Answer the query with the given context as your source of truth. 
      You may use prior knowledge to interpret the user's query, but not in forming your response.
      You must only answer with events that are referenced in the context, and not make up events.
      Always return the full data from the file, formatted in JSON without modification, all in a code block in markdown.
      Do not put multiple events in the same code block, always generate a new code block for each event.
      You should have a disclaimer that you aren't very good with times and location so those may be inaccurate. 
      Try to return at least 2 related events and explain why.
      ABSOLUTELY NEVER MAKE UP AN EVENT.
      Answer the query without hallucinating, and only using the context given.`
    }
  });
}
