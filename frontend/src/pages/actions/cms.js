"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
// Prisma removed

const blockSchema = z.object({
  type: z.string(),
  title: z.string().optional(),
  content: z.string(), // JSON string
  order: z.number().default(0)
});

export async function addBlock(data) {
  try {
    const validatedData = blockSchema.parse(data);
    await prisma.pageBlock.create({
      data: validatedData
    });
    revalidatePath("/");
    revalidatePath("/admin/cms");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add block" };
  }
}

export async function updateBlock(id, data) {
  try {
    await prisma.pageBlock.update({
      where: { id },
      data
    });
    revalidatePath("/");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update block" };
  }
}

export async function deleteBlock(id) {
  try {
    await prisma.pageBlock.delete({ where: { id } });
    revalidatePath("/");
    revalidatePath("/admin/cms");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete block" };
  }
}

export async function getBlocks() {
  return await prisma.pageBlock.findMany({
    where: { isActive: true },
    orderBy: { order: "asc" }
  });
}

export async function getSystemConfig() {
  try {
    const config = await prisma.pageBlock.findFirst({
      where: { type: "SYSTEM_CONFIG" }
    });
    return config ? JSON.parse(config.content) : null;
  } catch (e) {
    console.error("Error fetching system config:", e);
    return null;
  }
}

export async function getNavLinks() {
  try {
    const nav = await prisma.pageBlock.findFirst({
      where: { type: "NAV_LINKS" }
    });
    return nav ? JSON.parse(nav.content) : [];
  } catch (e) {
    console.error("Error fetching nav links:", e);
    return [];
  }
}

export async function getEvents() {
  try {
    const events = await prisma.pageBlock.findMany({
      where: {
        type: "TEXT_BLOCK",
        title: "Global Events Configuration",
        isActive: true
      },
      orderBy: { order: "asc" }
    });
    return events.map((e) => ({ id: e.id, ...JSON.parse(e.content) }));
  } catch (e) {
    console.error("Error fetching events:", e);
    return [];
  }
}

export async function createForm(name, fields) {
  try {
    await prisma.pageBlock.create({
      data: {
        type: "FORM_BUILDER",
        title: name,
        content: JSON.stringify({ fields })
      }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to create form" };
  }
}

export async function submitForm(formId, formName, data) {
  try {
    const prismaAny = prisma;
    if (!prismaAny.formSubmission) {
      throw new Error("FormSubmission model not ready");
    }
    await prismaAny.formSubmission.create({
      data: {
        formId,
        formName,
        data: JSON.stringify(data)
      }
    });
    return { success: true };
  } catch (error) {
    console.error("Submission error:", error);
    return { error: "Form system is currently updating. Please try again in a moment." };
  }
}

export async function getFormSubmissions() {
  try {
    const prismaAny = prisma;
    if (!prismaAny.formSubmission) return [];
    return await prismaAny.formSubmission.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    return [];
  }
}