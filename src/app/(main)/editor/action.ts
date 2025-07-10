"use server";

import { canCreateResume, canUseCustomizations } from "@/lib/permission";
import prisma from "@/lib/prisma";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import { resumeSchema, ResumeValues } from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { del, put } from "@vercel/blob";
import path from "path";

export async function saveResume(values: ResumeValues) {
  const { id } = values;

  console.log("received values", values);

  const {
    photo,
    workExperiences,
    educations,
    awards,
    certificates,
    projects,
    ...resumeValues
  } = resumeSchema.parse(values);

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  // TODO: Check resume count for non-premium users
  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!id) {
    const resumeCount = await prisma.resume.count({
      where: {
        userId,
      },
    });

    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error("Resume limit reached");
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }

  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("Customizations not allowed");
  }

  let newPhotoUrl: string | undefined | null = undefined;

  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }

    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
      allowOverwrite: true, // Allow overwriting to handle same filenames
    });

    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  }

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        photoUrl: newPhotoUrl,

        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString()
              : undefined,
          })),
        },

        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString()
              : undefined,
          })),
        },

        awards: {
          deleteMany: {},
          create: awards?.map((award) => ({
            ...award,
            dateReceived: award.dateReceived
              ? new Date(award.dateReceived).toISOString()
              : undefined,
          })),
        },

        certificates: {
          deleteMany: {},
          create: certificates?.map((cert) => ({
            ...cert,
            issueDate: cert.issueDate
              ? new Date(cert.issueDate).toISOString()
              : undefined,
          })),
        },

        projects: {
          deleteMany: {},
          create: projects?.map((project) => ({
            ...project,
            publicationDate: project.publicationDate
              ? new Date(project.publicationDate).toISOString()
              : undefined,
          })),
        },

        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        userId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate
              ? new Date(exp.startDate).toISOString()
              : undefined,
            endDate: exp.endDate
              ? new Date(exp.endDate).toISOString()
              : undefined,
          })),
        },

        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate
              ? new Date(edu.startDate).toISOString()
              : undefined,
            endDate: edu.endDate
              ? new Date(edu.endDate).toISOString()
              : undefined,
          })),
        },

        awards: {
          create: awards?.map((award) => ({
            ...award,
            dateReceived: award.dateReceived
              ? new Date(award.dateReceived).toISOString()
              : undefined,
          })),
        },

        certificates: {
          create: certificates?.map((cert) => ({
            ...cert,
            issueDate: cert.issueDate
              ? new Date(cert.issueDate).toISOString()
              : undefined,
          })),
        },

        projects: {
          create: projects?.map((project) => ({
            ...project,
            publicationDate: project.publicationDate
              ? new Date(project.publicationDate).toISOString()
              : undefined,
          })),
        },
      },
    });
  }
}
