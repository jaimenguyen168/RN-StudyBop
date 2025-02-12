import { model, generationConfig } from "@/configs/gemini";

export const generateTopics = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: "As your are coaching teacher\n    - User want to learn about the topic\n    - Generate 5-7 Course title for study (Short)\n    - Make sure it is releated to description\n    - Output will be ARRAY of String in JSON FORMAT only\n    - Do not add any plain text in output,\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  "Classroom Management Essentials",\n  "Effective Lesson Planning",\n  "Assessment & Feedback Strategies",\n  "Engaging Students: Active Learning",\n  "Differentiated Instruction Techniques",\n  "Building Positive Relationships",\n  "Technology Integration in Teaching"\n]\n```\n',
        },
      ],
    },
  ],
});

export const generateCourse = model.startChat({
  generationConfig,
  history: [],
});
