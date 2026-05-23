"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { signIn as authSignIn } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

const prisma = new PrismaClient();

const addAdminSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  occupation: z.string().optional(),
  role: z.enum(["ADMIN", "USER"])
});

export async function addAdmin(data) {
  try {
    const validatedData = addAdminSchema.parse(data);
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });

    if (existingUser) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    await prisma.user.create({
      data: { ...validatedData, password: hashedPassword }
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to add user" };
  }
}

export async function deleteUser(targetUserId) {
  try {
    await prisma.user.delete({ where: { id: targetUserId } });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete user" };
  }
}

export async function updateRole(userId, newRole) {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    return { error: "Failed to update role" };
  }
}

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  occupation: z.string().min(2, "Occupation is required")
});

export async function signUp(data) {
  try {
    const validatedData = signupSchema.parse(data);
    const existingUser = await prisma.user.findUnique({ where: { email: validatedData.email } });

    if (existingUser) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(validatedData.password, 10);
    const user = await prisma.user.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        password: hashedPassword,
        occupation: validatedData.occupation,
        role: "USER"
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Signup error:", error);
    return { error: "Failed to create account" };
  }
}

export async function login(formData, callbackUrl) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: formData.email }
    });

    const roleRedirect = user?.role === "ADMIN" || user?.role === "MASTER" ? "/admin" : "/";
    const redirectTo = callbackUrl || roleRedirect;

    await authSignIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirectTo
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "An error occurred during sign in." };
      }
    }
    throw error;
  }
}