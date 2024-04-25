import { getAllChatMembers } from "../../api/getAllChatMembers";

export async function allChatsLoader({ request }) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const id = searchParams.get("id");
  console.log(id);
  console.log(token);

  const chatMembers = await getAllChatMembers(token, id);
  console.log(chatMembers);
  return chatMembers;
}
