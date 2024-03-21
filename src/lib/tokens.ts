import { getVerificationTokenByEmail } from "@/data/token/verification-token";
import { v4 as uuidV4 } from "uuid";
import prisma from "@lib/prisma";
import { getPasswordResetTokenByEmail } from "@/data/token/password-reset-token";
import crypto from "crypto";

export const createExpirationDate = (params: {
  duration: number;
  type: "byHour" | "byDay" | "byMinute";
}) => {
  const { duration, type } = params;
  const now = new Date();
  let expiresAt = new Date();

  if (type === "byHour") {
    expiresAt = new Date(now.getTime() + 3600 * duration);
  } else if (type === "byDay") {
    expiresAt = new Date(now.getTime() + 3600 * 24 * duration);
  } else if (type === "byMinute") {
    expiresAt = new Date(now.getTime() + 60 * duration);
  }

  return expiresAt;
};

export const generateVerificationToken = async (params: { email: string }) => {
  const { email } = params;
  const token = uuidV4();
  const expiresAt = createExpirationDate({ duration: 1, type: "byHour" });

  const existingToken = await getVerificationTokenByEmail({ email });

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return verificationToken;
};

export const generatePasswordResetToken = async (params: { email: string }) => {
  const { email } = params;
  const token = uuidV4();
  const expiresAt = createExpirationDate({ duration: 1, type: "byHour" });

  const existingToken = await getPasswordResetTokenByEmail({ email });

  if (existingToken) {
    await prisma.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const passwordResetToken = await prisma.passwordResetToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });

  return passwordResetToken;
};
