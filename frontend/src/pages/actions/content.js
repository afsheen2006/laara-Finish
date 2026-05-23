"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const prisma = new PrismaClient();

const contentSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  body: z.string().min(1)
});

export async function saveContent(data) {
  // Authentication check removed - Public Access
  try {
    const validatedData = contentSchema.parse(data);

    // In our new schema, we need an editorId. 
    // Since auth is deleted, we'll use a placeholder or the first admin found.
    const firstAdmin = await prisma.user.findFirst({
      where: { role: "MASTER" }
    });

    if (!firstAdmin) {
      throw new Error("No administrator found to assign content to.");
    }

    await prisma.content.upsert({
      where: { slug: validatedData.slug },
      update: {
        title: validatedData.title,
        body: validatedData.body,
        editorId: firstAdmin.id
      },
      create: {
        slug: validatedData.slug,
        title: validatedData.title,
        body: validatedData.body,
        editorId: firstAdmin.id
      }
    });

    revalidatePath("/admin");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Save content error:", error);
    return { error: "Failed to save content" };
  }
}

export async function getContent(slug) {
  try {
    return await prisma.content.findUnique({
      where: { slug }
    });
  } catch (error) {
    return null;
  }
}