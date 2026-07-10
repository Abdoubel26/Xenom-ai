async function runChat(prompt) {
  try {
    console.log("Sending request to http://localhost:3001/api/chat");
    
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt }),
    });
    
    console.log("Response status:", res.status);
    
    if (!res.ok) {
      const error = await res.json();
      console.error("API Error:", error);
      throw new Error(error.error || `Server error: ${res.status}`);
    }
    
    const data = await res.json();
    console.log("Response received successfully");
    return data.text;
  } catch (error) {
    console.error("Chat Error:", error);
    throw error;
  }
}


export default runChat;

