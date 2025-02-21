import nodemailer from 'nodemailer'
import { configDotenv } from 'dotenv'

configDotenv()


export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "cmabdulkareem@gmail.com",
      pass: process.env.NODEMAILER_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

