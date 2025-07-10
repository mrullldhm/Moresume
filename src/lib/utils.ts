import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ResumeServerData } from "./types";
import { ResumeValues } from "./validation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    firstName: data.firstName || undefined,
    lastName: data.lastName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate
        ? new Date(exp.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: exp.endDate
        ? new Date(exp.endDate).toISOString().split("T")[0]
        : undefined,
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      institution: edu.institution || undefined,
      fieldOfStudy: edu.fieldOfStudy || undefined,
      startDate: edu.startDate
        ? new Date(edu.startDate).toISOString().split("T")[0]
        : undefined,
      endDate: edu.endDate
        ? new Date(edu.endDate).toISOString().split("T")[0]
        : undefined,
      description: edu.description || undefined,
    })),
    awards: data.awards.map((award) => ({
      title: award.title || undefined,
      issuer: award.issuer || undefined,
      dateReceived: award.dateReceived
        ? new Date(award.dateReceived).toISOString().split("T")[0]
        : undefined,
      description: award.description || undefined,
    })),
    certificates: data.certificates.map((cert) => ({
      title: cert.title || undefined,
      issuer: cert.issuer || undefined,
      issueDate: cert.issueDate
        ? new Date(cert.issueDate).toISOString().split("T")[0]
        : undefined,
      credentialId: cert.credentialId || undefined,
      credentialUrl: cert.credentialUrl || undefined,
      description: cert.description || undefined,
    })),
    projects: data.projects.map((project) => ({
      title: project.title || undefined,
      publicationDate: project.publicationDate
        ? new Date(project.publicationDate).toISOString().split("T")[0]
        : undefined,
      publicationUrl: project.publicationUrl || undefined,
      description: project.description || undefined,
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
  };
}
