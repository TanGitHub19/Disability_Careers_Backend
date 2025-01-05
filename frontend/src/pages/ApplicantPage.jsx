import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { jobStore } from "../stores/jobStore";
import FormatTimeDate from "../components/FormatTimeDate";
import Footer from "../components/Footer";
import SearchBar from "../components/Search";
import { Link } from "react-router-dom";

const ApplicantPage = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [location, setLocation] = useState("");
  const [showAllJobs, setShowAllJobs] = useState(false);

  const { getJobPosts, jobPosts, isLoading, error } = jobStore();

  useEffect(() => {
    getJobPosts();
  }, [getJobPosts]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  const filteredJobPosts = jobPosts.filter((job) => {
    const matchesKeyword =
      searchKeyword === "" ||
      job.jobTitle?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.jobDescription?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      job.employer?.fullName
        ?.toLowerCase()
        .includes(searchKeyword.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" || job.jobCategory === selectedCategory;

    return matchesKeyword && matchesCategory;
  });

  const categories = [
    "ALL",
    "DESIGN",
    "DEVELOPMENT",
    "MARKETING",
    "SALES",
    "ENGINEERING",
    "HR",
    "FINANCE",
    "MANAGEMENT",
    "PRODUCT",
    "CUSTOMER_SUPPORT",
    "OPERATIONS",
    "RESEARCH",
    "EDUCATION",
    "ADMINISTRATION",
    "IT",
    "CONSULTING",
    "HEALTHCARE",
    "CONSTRUCTION",
    "LEGAL",
    "ART",
    "MEDIA",
  ];

  const displayedJobPosts = showAllJobs
    ? filteredJobPosts
    : filteredJobPosts.slice(0, 6);

  const handleSearch = () => {
    console.log;
  };

  return (
    <div className="min-h-screen flex flex-col overflow-auto">
      <Navbar />

      <main className="flex-grow flex flex-col">
        <section className="bg-applicant-bg-1 bg-no-repeat bg-cover bg-center flex flex-col items-center justify-start h-screen pt-48">
          <h1 className="text-7xl font-bold text-center font-poppins text-white ">
            Disability Careers
          </h1>
          <p className="text-center text-md font-normal font-poppins text-white text-2xl py-6">
            Connecting Talents with Accessible Job Opportunities
          </p>

          <SearchBar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            location={location}
            setLocation={setLocation}
            categories={categories}
            onSearch={handleSearch}
          />
        </section>

        <section className="bg-white h-[150] mb-10">
          <h2 className="text-4xl font-bold text-center font-poppins text-BLUE mt-16 mb-5">
            Latest Job Posts
          </h2>
          <p className="text-xl font-normal text-center font-poppins text-BLUE mb-12">
            List of Featured Jobs for Disabled People
          </p>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 px-4">
            {displayedJobPosts.map((job) => (
              <div
                key={job.id}
                className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 flex flex-col justify-between"
              >
                <h3 className="text-xl font-semibold text-black mb-2 font-poppins">
                  {job.jobTitle || "Job Type Not Specified"}
                </h3>

                <p className="text-black font-light font-poppins bg-green-300 rounded-md w-24 text-center py-1 px-1 mb-1">
                  {job.jobType || "No job description available"}
                </p>
                <p className="text-black font-light font-poppins">
                  {job.expectedSalary &&
                  job.expectedSalary.minSalary &&
                  job.expectedSalary.maxSalary
                    ? `PHP ${job.expectedSalary.minSalary.toLocaleString()} - PHP ${job.expectedSalary.maxSalary.toLocaleString()}`
                    : "Salary information not available"}
                </p>

                <hr className="border-t-2 border-gray-300 my-6" />

                <p className="text-black font-poppins font-normal flex-grow">
                  {job.jobDescription || "No job description available"}
                </p>
                <button className="text-blue-500 font-poppins underline py-2 text-left">
                  See more
                </button>
                <p className="text-black mt-10 font-poppins">
                  <FormatTimeDate date={job.createdAt} formatType="date" />
                </p>
              </div>
            ))}
          </div>

          {filteredJobPosts.length > 6 && (
            <div className="text-center my-16">
              <button
                onClick={() => setShowAllJobs(!showAllJobs)}
                className="text-blue-500 font-poppins text-lg underline"
              >
                {showAllJobs ? "SHOW LESS" : "VIEW MORE JOB POSTS"}
              </button>
            </div>
          )}
        </section>

        <section className="bg-applicant-bg-2 bg-no-repeat bg-cover bg-center h-[500px] flex items-center justify-center flex-col">
          <div className="text-center">
            <h2 className="text-6xl font-medium font-poppins text-BLUE mt-16 mb-10">
              Empowering Abilities, Transforming Lives
            </h2>
            <p className="text-3xl font-normal font-poppins text-black mb-12">
              Your next chapter begins here. Let’s achieve together!
            </p>
          </div>
          <div className="flex space-x-7 mt-4">
            <Link
              to="/profile-info"
              className="px-20 py-3 bg-transparent rounded border-2 border-solid border-BLUE font-poppins text-BLUE font-semibold "
            >
              Profile
            </Link>
            <Link
              to="/jobs"
              className="px-24 py-3 bg-buttonBlue text-white rounded font-poppins font-semibold"
            >
              Find a Job
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default ApplicantPage;
