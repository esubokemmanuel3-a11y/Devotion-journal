export const PROMPTS = {
  morning: [
    "What does this reading ask you to carry into today?",
    "Where do you need this truth most this morning?",
    "What's one thing you want to remember by evening?",
    "What are you anxious about that this reading speaks to?",
    "What would it look like to trust God with today?",
  ],
  evening: [
    "Where did you see this at work today?",
    "What does this reading ask you to let go of tonight?",
    "What are you grateful for from today?",
    "Where did you fall short today, and where did grace meet you?",
    "What's weighing on you as the day ends?",
  ],
};

export function getRandomPrompt(slot, excluding) {
  const list = PROMPTS[slot] ?? PROMPTS.morning;
  const options = excluding ? list.filter((p) => p !== excluding) : list;
  return options[Math.floor(Math.random() * options.length)];
}