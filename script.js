// =========================
// API Configuration
// =========================
const apiKey = "530bfbaa583a1c4f65f472e27t9dbeo8";
const apiUrl = "https://api.shecodes.io/ai/v1/generate";
// =========================
// DOM Elements
// =========================
const messageForm = document.querySelector("#message-form");
const messageTypeInput = document.querySelector("#message-type");
const messageToneInput = document.querySelector("#message-tone");
const messageNotesInput = document.querySelector("#message-notes");
const recipientInput = document.querySelector("#recipient");
const senderNameInput = document.querySelector("#sender-name");

const generateButton = document.querySelector("#generate-button");
const messageResult = document.querySelector("#message-result");
const copyButton = document.querySelector("#copy-button");
// =========================
// Form Data
// =========================
function handleFormSubmit(event) {
  event.preventDefault();

  const messageType = messageTypeInput.value;
  const messageTone = messageToneInput.value.trim();
  const messageNotes = messageNotesInput.value.trim();
  const recipient = recipientInput.value.trim();
  const senderName = senderNameInput.value.trim();

  const prompt = buildPrompt(
    messageType,
    messageTone,
    messageNotes,
    recipient,
    senderName
  );

  const apiRequestUrl = buildApiRequestUrl(prompt);

setLoadingState();

fetch(apiRequestUrl)
  .then(function (response) {
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  })
  .then(displayMessage)
  .catch(handleApiError);
}
// =========================
// Prompt Builder
// =========================
function buildPrompt(
  messageType,
  messageTone,
  messageNotes,
  recipient,
  senderName
) {
  const recipientInstruction = recipient
    ? `Write the message for: ${recipient}.`
    : "The recipient was not provided. Do not invent a recipient name.";

  const signatureInstruction = senderName
    ? `Sign the message as: ${senderName}.`
    : "A name or signature was not provided. Do not invent one.";

  return `
You are an expert writing assistant.

Create or rewrite a ${messageTone} ${messageType} using the user's information.

${recipientInstruction}

${signatureInstruction}

User's message or rough notes:
${messageNotes}

Writing requirements:
- Preserve the user's original meaning and important details.
- Improve the clarity, grammar, organization, and natural flow.
- Match the requested ${messageTone} tone.
- Follow the normal structure of a ${messageType}.
- Do not invent names, dates, events, promises, or personal details.
- Return only the completed message.
- Do not include explanations, writing tips, or commentary.
`.trim();
}

function buildApiRequestUrl(prompt) {
  const context = `
You are a professional writing assistant.

Follow the user's requested message type and tone.
Preserve the user's meaning and important details.
Do not invent names, dates, promises, or personal information.
Return only the completed message.
`;

  const parameters = new URLSearchParams({
    prompt: prompt,
    context: context,
    key: apiKey,
  });

  return `${apiUrl}?${parameters.toString()}`;
}
// =========================
// Loading State
// =========================
function setLoadingState() {
  generateButton.disabled = true;
  generateButton.textContent = "Composing...";

  messageResult.textContent = "Composing your message...";
  copyButton.hidden = true;
}
// =========================
// Display Message
// =========================
function typeWriter(text) {
  messageResult.textContent = "";

  let index = 0;

  const typingSpeed = 18;

  const typing = setInterval(function () {
    messageResult.textContent += text.charAt(index);

    index++;

    if (index >= text.length) {
      clearInterval(typing);

      copyButton.hidden = false;

      generateButton.disabled = false;
      generateButton.textContent = "✨ Generate Message";
    }
  }, typingSpeed);
}

function displayMessage(data) {
  typeWriter(data.answer);
}
// =========================
// Error Handling
// =========================
function handleApiError(error) {
  console.error("API Error:", error);

  messageResult.textContent =
    "Something went wrong while generating your message. Please try again.";

  generateButton.disabled = false;
  generateButton.textContent = "✨ Generate Message";
}
// =========================
// Copy Message
// =========================
function copyGeneratedMessage() {
  navigator.clipboard.writeText(messageResult.textContent);

  copyButton.textContent = "✓ Copied!";

  setTimeout(function () {
    copyButton.textContent = "Copy Message";
  }, 2000);
}
// =========================
// Event Listeners
// =========================
messageForm.addEventListener("submit", handleFormSubmit);
copyButton.addEventListener("click", copyGeneratedMessage);