"use server";

// Prisma removed
import { revalidatePath } from "next/cache";
import { z } from "zod";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  mobile: z.string().min(10, "Invalid mobile number"),
  email: z.string().email("Invalid email address"),
  qualification: z.string().min(2, "Please enter your qualification"),
  interestedRole: z.string().min(2, "Please select or enter a role"),
  resumeUrl: z.string().optional()
});

export async function submitApplication(data) {
  try {
    const validated = applicationSchema.parse(data);

    await prisma.jobApplication.create({
      data: {
        ...validated,
        status: "PENDING"
      }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message };
    }
    return { error: "Failed to submit application. Please try again." };
  }
}

export async function getApplications() {
  try {
    return await prisma.jobApplication.findMany({
      orderBy: { createdAt: "desc" }
    });
  } catch (error) {
    return [];
  }
}

export async function updateApplicationStatus(id, status) {
  try {
    await prisma.jobApplication.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update status" };
  }
}