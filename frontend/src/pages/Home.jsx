import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearchClick = () => {
    const params = new URLSearchParams();
    if(searchKeyword) params.append('keyword', searchKeyword);
    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-100">
      <section className="flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>

        <p className="text-lg text-gray-600 mb-8 max-w-2xl">
          Discover thousands of opportunities that match your skills, passion,
          and career goals — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search job title or skill..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="border rounded-md p-3 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          >
            Search Jobs
          </button>
        </div>
      </section>

      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">
            Why Choose Our Platform?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Verified Employers
              </h3>
              <p className="text-gray-600">
                Work only with trusted companies and startups verified by our
                platform.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Internship + Full-time
              </h3>
              <p className="text-gray-600">
                Whether you're a student or professional, find roles that fit
                your experience.
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold text-blue-600 mb-2">
                Smart Recommendations
              </h3>
              <p className="text-gray-600">
                Our AI-based system recommends jobs tailored to your interests
                and location.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Career Journey?
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            Sign up today and explore hundreds of job openings waiting for you.
          </p>
          <button
            onClick={() => navigate("/jobs")}
            className="bg-white text-blue-600 px-8 py-3 rounded-md font-medium shadow hover:bg-blue-50 transition"
          >
            Explore Jobs
          </button>
        </div>
      </section>

      {/* ---------- FOOTER ---------- */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p>
            © {new Date().getFullYear()} JobConnect — All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

export default Home;
