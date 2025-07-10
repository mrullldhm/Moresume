import resumePreview from "@/assets/resume-preview.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12"
      style={{
        backgroundImage: `url(${resumePreview.src})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-prose space-y-6  p-6 md:p-8 backdrop-blur-sm 2xl:backdrop-blur-none">
        <h1 className="scroll-m-20 text-4xl font-extralight lg:text-5xl">
          <span className="font-bold tracking-tighter">ATS-Friendly</span> Resume That Gets
          Noticed
        </h1>
        <p className="font">
          Build a professional resume that passes applicant tracking systems.
          Customize layouts, highlight your strengths, and get AI-powered
          guidance. <br /> <br />
          All in one place <span className="font-bold tracking-tighter">MORESUME</span> 
        </p>
        <Button asChild size="lg" variant="default">
          <Link href="/resumes">Get started</Link>
        </Button>
      </div>
    </main>
  );
}
