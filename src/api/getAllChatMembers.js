export async function getAllChatMembers(token,id) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const params = {
    id
  };

  const queryString = new URLSearchParams(params).toString();

  const url = `http://localhost:8080/api/v1/message/allChats?${queryString}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data)
    return data.chatMembers;
  } catch (error) {
    console.error("Error:", error);
  }
}
