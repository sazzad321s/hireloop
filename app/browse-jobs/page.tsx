import { getJobs } from '@/lib/api/jobs';
import React from 'react';

const BrowseJobsPage = async ({searchParams}:{searchParams: Promise<{ [key: string]: string | string[] } | undefined>}) => {
 
    const search = await searchParams;
    const urlSearch = new URLSearchParams(search as Record<string, string>);
    const query = urlSearch.toString();
    
    const jobs = await getJobs(query);

    return (
        <div>
            <ul>
                {jobs.map((job) => (
                    <li key={job._id}>{job.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default BrowseJobsPage;