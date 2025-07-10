"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permission";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: Block for non-premium users
  const {userId} = await auth()

  if(!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("AI tools are not available for your subscription level");
  }

  const {
    jobTitle,
    workExperiences,
    educations,
    awards,
    certificates,
    projects,
    skills,
  } = generateSummarySchema.parse(input);

  const systemMessage = `
You are an expert resume writer AI helping users craft their own resume summaries.

Your task is to write a concise, natural-sounding professional summary that feels like the user personally wrote it — not AI-generated. Write in a confident, humble tone that reflects real human expression.

Guidelines:
- Write in **first-person** ("I am...", "I bring...") unless the data suggests otherwise.
- Highlight strengths, relevant skills, and career focus based on provided data.
- Keep it under 120 words.
- Avoid buzzwords, clichés, and robotic phrasing.
- Output only the summary — no labels, headings, or extra comments.
`;

  const userMessage = `
Here’s my background. Please write a short, professional resume summary that sounds like I personally wrote it — clear, confident, and under 120 words.

Job Title:
${jobTitle || "Not specified"}

Work Experience:
${
  workExperiences?.length
    ? workExperiences
        .map(
          (exp) =>
            `- ${exp.position || "Position"} at ${exp.company || "Company"} (${exp.startDate || "Start"} – ${exp.endDate || "Present"}): ${exp.description || ""}`,
        )
        .join("\n")
    : "No formal work experience yet."
}

Education:
${
  educations?.length
    ? educations
        .map(
          (edu) =>
            `- ${edu.fieldOfStudy || "Field"} at ${edu.institution || "Institution"} (${edu.startDate || "Start"} – ${edu.endDate || "End"}): ${edu.description || ""}`,
        )
        .join("\n")
    : "Not specified"
}

Awards:
${
  awards?.length
    ? awards
        .map(
          (award) =>
            `- ${award.title || "Title"} from ${award.issuer || "Issuer"} (${award.dateReceived || "Date"}): ${award.description || ""}`,
        )
        .join("\n")
    : "None"
}

Certificates:
${
  certificates?.length
    ? certificates
        .map(
          (cert) =>
            `- ${cert.title || "Title"} from ${cert.issuer || "Issuer"} (${cert.issueDate || "Date"}): ${cert.description || ""}`,
        )
        .join("\n")
    : "None"
}

Projects:
${
  projects?.length
    ? projects
        .map(
          (proj) =>
            `- ${proj.title || "Title"} (${proj.publicationDate || "Date"}): ${proj.description || ""}`,
        )
        .join("\n")
    : "None"
}

Skills:
${skills || "None"}
`;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate summary");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  // TODO: Block for non-premium users
  const {userId} = await auth()

  if(!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("AI tools are not available for your subscription level");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
You are a helpful assistant that generates **one** structured work experience entry for a resume, based strictly on the user's description.

Respond ONLY with the following fields in **this exact format**:

Job title: <job title>
Company: <company name>
Start date: <YYYY-MM-DD> (if available)
End date: <YYYY-MM-DD> (if available)
Description:
- <bullet point 1>
- <bullet point 2>
- <etc.>

⚠️ IMPORTANT:
- Do NOT make up dates or company names unless clearly provided.
- Description must be **concise, action-oriented bullet points**, relevant to the job title.
- Use professional language suitable for a modern resume.
- Do not add extra commentary or text outside of the format.
`;

  const userMessage = `
Based on the following notes, generate one work experience entry:

"${description}"
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: userMessage },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate summary");
  }

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
