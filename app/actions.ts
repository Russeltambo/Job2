"use server";

import { z } from "zod";
import { companySchema, jobSchema, jobSeekerSchema } from "./utils/ZodSchemas";
import { requireUser } from "./utils/requireUser";
import { prisma } from "./utils/db";
import { redirect } from "next/navigation";
import arcjet, { detectBot, shield } from "./utils/arcjet";
import { request } from "@arcjet/next";


const aj = arcjet.withRule(
    shield({
        mode: "LIVE",
    })
).withRule(
    detectBot({
        mode: "LIVE",
        allow: [],
    })
)
export async function createCompany(data: z.infer<typeof companySchema>) {
    const session = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const validateData = companySchema.parse(data);

    await prisma.user.update({
        where: {
            id: session.id,
        },
        data: {
            onboardingCompleted: true,
            userType: "COMPANY",
            Company: {
                create: {
                    ...validateData,
                },
            },
        },
    });

    return redirect("/");
}



export async function createJobSeeker(data: z.infer<typeof jobSeekerSchema>) {
    const user = await requireUser();

    const req = await request();

    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const validateData = jobSeekerSchema.parse(data);

    await prisma.user.update({
        where: {
            id: user.id as string,
        },
        data: {
            onboardingCompleted: true,
            userType: "JOB_SEEKER",
            JobSeeker: {
                create: {
                    ...validateData,
                },
            },
        },
    });

    return redirect("/");
}


export async function createJob(data: z.infer<typeof jobSchema>) {
    const user = await requireUser();

    const req = await request();
    
    const decision = await aj.protect(req);

    if (decision.isDenied()) {
        throw new Error("Forbidden");
    }

    const validateData = jobSchema.parse(data);

    const Company = await prisma.company.findUnique({
        where: {
            userId: user.id
        },
        select: {
            id: true
        }
    })

    if(!Company?.id) {
        return redirect("/")
    }

     await prisma.jobPost.create({
        data: {
            jobDescription: validateData.jobDescription,
            jobTitle: validateData.jobTitle,
            employmentType: validateData.employmentType,
            location: validateData.location,
            salaryFrom: validateData.salaryFrom,
            salaryTo: validateData.salaryTo,
            listingDuration: validateData.listingDuration,
            benefits: validateData.benefits,
            companyId: Company.id
        },
    });
    return redirect("/");
}