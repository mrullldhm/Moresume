import { Metadata } from "next"; // Import Next.js Metadata type for page metadata
import ResumeEditor from "./ResumeEditor"; // Import the ResumeEditor component
import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { resumeDataInclude } from "@/lib/types";

interface Pageprops {
  searchParams: Promise<{ resumeId: string }>; // Define the type for searchParams
}

// Define page metadata (appears in browser tab and SEO)
export const metadata: Metadata = {
  title: "Resume Editor", // Page title (shown in browser tab)
  description: "Create and edit your professional resume", // Brief page description (for SEO)
};

// Default page component that renders the ResumeEditor
export default async function Page({ searchParams }: Pageprops) {
  const { resumeId } = await searchParams;

  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const resumeToEdit = resumeId
    ? await prisma.resume.findUnique({
        where: { id: resumeId, userId },
        include: resumeDataInclude,
      })
    : null;

  return <ResumeEditor resumeToEdit={resumeToEdit} />; // Simply renders the ResumeEditor component
}