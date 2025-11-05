import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function Jobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [loading, setLoading] = useState(false);

  const [locationsList, setLocationsList] = useState([]);
  const [companiesList, setCompaniesList] = useState([]);
  const [typesList, setTypesList] = useState([]);

  const fetchJobs = async (filters = {}) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(filters);
      const res = await api.get(`/jobs?${params.toString()}`);
      const jobsData = res.data || [];
      setJobs(jobsData);

      const uniqueLocations = [
        ...new Set(jobsData.map((j) => j.location).filter(Boolean)),
      ];
      const uniqueCompanies = [
        ...new Set(jobsData.map((j) => j.company).filter(Boolean)),
      ];
      const uniqueTypes = [
        ...new Set(jobsData.map((j) => j.type).filter(Boolean)),
      ];

      setLocationsList(uniqueLocations);
      setCompaniesList(uniqueCompanies);
      setTypesList(uniqueTypes);
    } catch {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs({
      location: location || undefined,
      type: jobType || undefined,
      category: category || undefined,
      company: company || undefined,
    });
  };

  const handleClear = () => {
    setLocation("");
    setJobType("");
    setCategory("");
    setCompany("");
    fetchJobs();
  };

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
        Jobs Ready to Apply
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 bg-white rounded-2xl shadow-lg p-6 h-fit sticky top-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Filter Jobs</h2>

          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-2">Location</label>
            <input
              list="locationOptions"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search or type location"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="locationOptions">
              {locationsList.map((loc, idx) => (
                <option key={idx} value={loc} />
              ))}
            </datalist>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-2">Company</label>
            <input
              list="companyOptions"
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Search company"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="companyOptions">
              {companiesList.map((comp, idx) => (
                <option key={idx} value={comp} />
              ))}
            </datalist>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-2">Job Type</label>
            <input
              list="typeOptions"
              type="text"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              placeholder="Search or type job type"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <datalist id="typeOptions">
              {typesList.length > 0
                ? typesList.map((type, idx) => <option key={idx} value={type} />)
                : ["Full-time", "Part-time", "Internship", "Freelance"].map(
                    (type) => <option key={type} value={type} />
                  )}
            </datalist>
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-2">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="Software Development">Software Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Design">Design</option>
              <option value="Data Science">Data Science</option>
              <option value="HR">HR</option>
            </select>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleSearch}
              className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Apply
            </button>
            <button
              onClick={handleClear}
              className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition"
            >
              Clear
            </button>
          </div>
        </aside>

        <section className="flex-1">
          {loading ? (
            <div className="text-center text-gray-500 py-12">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              No jobs found for the selected filters.
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition border border-gray-100 flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-blue-700 mb-1">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {job.companyName || "Confidential Company"}
                  </p>
                  <p className="text-gray-600 flex-grow">{job.description.slice(0, 100)}...</p>

                  <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md">
                      {job.type}
                    </span>
                    <span>{job.location}</span>
                  </div>

                  <button
                    onClick={() => navigate(`/jobs/${job._id}`)}
                    className="mt-5 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Jobs;
