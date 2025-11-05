import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

function JobDetails() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${jobId}`);
        setJob(res.data);
      } catch (error) {
        navigate('/jobs');
      } finally {
        setLoading(false);
      }
    };
    fetchJobDetails();
  }, [jobId, navigate]);

  if (loading) {
    return <div className="text-center p-10 text-gray-500">Loading job details...</div>;
  }

  if (!job) {
    return <div className="text-center p-10 text-gray-500">Job not found.</div>;
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-block text-blue-600 hover:text-blue-800 font-semibold focus:outline-none"
        aria-label="Go back to jobs"
      >
        &larr; Back to all jobs
      </button>

      <article className="bg-white shadow-lg rounded-lg border border-gray-200 p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 leading-snug">{job.jobTitle}</h1>
          <h2 className="text-xl text-gray-700 font-medium">{job.companyName || 'Confidential Company'}</h2>
          <p className="text-sm text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</p>
        </header>

        <section className="mb-8 text-gray-700 leading-relaxed text-lg">
          <p>{job.description}</p>
        </section>

        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-8 text-gray-600">
          <div>
            <dt className="font-semibold text-gray-900">Location</dt>
            <dd>{job.location}</dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-900">Job Type</dt>
            <dd>{job.jobType}</dd>
          </div>
          {job.salary && (
            <div>
              <dt className="font-semibold text-gray-900">Salary</dt>
              <dd>₹{job.salary.toLocaleString()}</dd>
            </div>
          )}
          {job.requiredSkills?.length > 0 && (
            <div>
              <dt className="font-semibold text-gray-900">Required Skills</dt>
              <dd className="flex flex-wrap gap-2 mt-1">
                {job.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          )}
        </dl>

        <div className="text-center">
          <a
            href={job.applyUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition"
          >
            Apply Now
          </a>
        </div>
      </article>
    </main>
  );
}

export default JobDetails;
