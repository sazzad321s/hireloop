import type { JobFormData } from "@/app/dashboard/recruiter/jobs/new/page"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const createJob = async (data: JobFormData) => {
    const res = await fetch(`${BASE_URL}/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
   const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Job creation failed");
    }

    return result;
};

export const deleteJob = async (jobId: string) => {
    const res = await fetch(`${BASE_URL}/jobs/${jobId}`, {
        method: "DELETE",
    });
    return res.json();
}