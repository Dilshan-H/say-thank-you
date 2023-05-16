function containsKeywords(str, keywords) {
  // check if the string contains any of the keywords
  for (let i = 0; i < keywords.length; i++) {
    if (str.toLowerCase().includes(keywords[i].trim().toLowerCase())) {
      return true;
    }
  }
  return false;
}

// Handle clear button
document.getElementById("clear-button").addEventListener("click", (event) => {
  event.preventDefault();
  const keywords = document.getElementById("keywords");
  const chatText = document.getElementById("chat-text");
  const generatedMessage = document.getElementById("generated-message-content");
  const tagline = document.getElementById("tagline");
  const stat = document.getElementById("stat");
  const replyText = document.getElementById("reply-text");

  // Set the values of the elements to an empty string
  generatedMessage.textContent = "";
  keywords.value = "";
  chatText.value = "";
  tagline.value = "";
  replyText.value = "";
  stat.textContent = "Matching Strings Count: 0 / 0";
});

document
  .getElementById("message-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // get chat text
    const chatText = document.getElementById("chat-text").value.trim();
    if (!chatText) {
      alert("Please enter a chat message.");
      return;
    }

    // get keywords
    const keywordsInput = document.getElementById("keywords").value.trim();
    if (!keywordsInput) {
      alert("Please enter proper keywords.");
      return;
    }
    const keywords = keywordsInput.split(",");

    // get tagline
    const inputTagline = document.getElementById("tagline").value.trim();
    if (!inputTagline) {
      alert("Please enter a tagline.");
      return;
    }

    // get reply text
    let replyText = document.getElementById("reply-text").value.trim();
    if (!replyText) {
      alert("Please enter a reply message.");
      return;
    }

    // Match the chat text pattern
    const pattern =
      /\[(\d{1,2}\/\d{1,2}),\s{1,2}(\d{1,2}:\d{2}\s(?:AM|PM))\]\s(.*?):\s(.*?)\s?(\@.*)/gm;
    const messages = Array.from(chatText.matchAll(pattern));

    const filteredMessages = new Set();
    for (const message of messages) {
      const sender = message[3];
      const content = message[4];
      const tagline = message[5];

      if (
        tagline.includes(inputTagline) &&
        containsKeywords(content, keywords)
      ) {
        filteredMessages.add(sender);
      }
    }

    const filteredMessagesArray = Array.from(filteredMessages);

    for (let i = 0; i < filteredMessagesArray.length; i++) {
      const tagger = filteredMessagesArray[i];
      replyText += ` @${tagger},`;
    }

    document.getElementById("generated-message-content").textContent =
      replyText.slice(0, -1);
    const stat = document.getElementById("stat");
    stat.textContent = `Matching Strings Count: ${filteredMessagesArray.length} / ${messages.length}`;
    stat.scrollIntoView({ behavior: "smooth" });
    document.getElementById("generated-message").classList.remove("hidden");
  });
