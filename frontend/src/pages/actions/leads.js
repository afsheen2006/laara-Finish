"use server";

// Prisma removed
import { z } from "zod";
import { revalidatePath } from "next/cache";

const leadSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters")
});

export async function createLead(data) {
  try {
    const validated = leadSchema.parse(data);

    await prisma.lead.create({
      data: {
        ...validated,
        status: "NEW"
      }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    console.error("Lead creation error:", error);
    return { error: "Failed to send message. Please try again later." };
  }
}

export async function getLeads() {
  try {
    return await prisma.lead.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    return [];
  }
}

export async function updateLeadStatus(id, status) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update lead status" };
  }
}