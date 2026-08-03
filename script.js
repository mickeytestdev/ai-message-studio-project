// =========================
// API Configuration
// =========================

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

  console.log(prompt);
}
// =========================
// Prompt Builder
// =========================
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
// =========================
// Loading State
// =========================

// =========================
// Display Message
// =========================

// =========================
// Error Handling
// =========================

// =========================
// Copy Message
// =========================

// =========================
// Event Listeners
// =========================
messageForm.addEventListener("submit", handleFormSubmit);