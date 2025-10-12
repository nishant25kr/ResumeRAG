import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Resumes = () => {
  const navigate = useNavigate();
  const [resumes, setResumes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  // Fetch all resumes on mount
  useEffect(() => {
    const fetchResumes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${backendURL}/api/resume/getallresume`,
          {},
          { withCredentials: true }
        );
        setResumes(res.data);
      } catch (err) {
        console.error("❌ Error fetching resumes:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchResumes();
  }, []);

  // Handle search query
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendURL}/api/resume/get-resume`,
        { query: search },
        { withCredentials: true }
      );
      setResumes(res.data);
    } catch (err) {
      console.error("❌ Error searching resumes:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async () => {
    console.log("hi")
  }

  // Summary cards data
  const totalResumes = resumes.length;
  const processedResumes = resumes.filter(r => r.score).length;
  const pendingResumes = totalResumes - processedResumes;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Gradient Header */}
      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-24 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Resume Management Hub
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Streamline your recruitment process with intelligent resume analytics
            </p>
          </div>

          {/* Enhanced Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="group relative bg-white/70 backdrop-blur-sm border border-blue-100 rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Total Resumes</h3>
                <p className="text-4xl font-bold text-gray-800 mb-2">{totalResumes}</p>
                <p className="text-sm text-gray-500">Documents uploaded</p>
              </div>
            </div>

            <div className="group relative bg-gradient-to-br from-white/80 to-orange-50/50 backdrop-blur-sm border-2 border-dashed border-orange-200 hover:border-orange-400 rounded-2xl p-8 text-center hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
              <div className="relative z-10 space-y-4">
                {/* Upload Icon */}
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>

                {/* Text Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    Upload Your Resume
                  </h3>
                  <p className="text-sm text-gray-500">
                    Drag & drop or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                </div>

                {/* File Input */}
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload(e)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />

                {/* Custom Button */}
                <label className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Choose File
                </label>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/20 rounded-full blur-3xl -z-10 group-hover:bg-orange-300/30 transition-colors" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-100/20 rounded-full blur-2xl -z-10 group-hover:bg-orange-200/30 transition-colors" />
            </div>



            <div className="group relative bg-white/70 backdrop-blur-sm border border-green-100 rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Processed</h3>
                <p className="text-4xl font-bold text-gray-800 mb-2">{processedResumes}</p>
                <p className="text-sm text-gray-500">Analysis complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 -mt-4">
        {/* Enhanced Search Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Search & Filter</h2>
              <p className="text-gray-600">Find specific resumes using keywords and criteria</p>
            </div>
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 lg:w-1/2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search by skills, experience, keywords..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-700 placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:shadow-none"
              >
                {loading ? "Searching..." : "Search"}
              </button>
            </form>
          </div>
        </div>

        {/* Enhanced Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100">
            <h3 className="text-xl font-bold text-gray-800">Resume Database</h3>
            <p className="text-gray-600 mt-1">Manage and review all uploaded resumes</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80">
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Content Preview</th>
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Upload Date</th>
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Embedding Length</th>
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Match Score</th>
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-8 font-semibold text-gray-700 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12">
                      <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                        <p className="text-gray-500 font-medium">Loading resumes...</p>
                      </div>
                    </td>
                  </tr>
                ) : resumes.length > 0 ? (
                  resumes.map((r, index) => (
                    <tr key={r._id} className="hover:bg-blue-50/50 transition-colors duration-200 group">
                      <td className="py-6 px-8">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-4">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="text-gray-800 font-medium line-clamp-2">
                              {r.text?.slice(0, 80) || "No content available"}...
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Resume #{index + 1}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="text-gray-700 font-medium">
                          {new Date(r.metadata?.uploadedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) || "N/A"}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(r.metadata?.uploadedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          }) || ""}
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                          <span className="text-gray-700 font-medium">{r.embedding?.length || 0}</span>
                        </div>
                      </td>
                      <td className="py-6 px-8">
                        {r.score ? (
                          <div className="flex items-center">
                            <div className="w-12 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                                style={{ width: `${Math.min(r.score * 100, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-blue-600 font-bold">{(r.score * 100).toFixed(1)}%</span>
                          </div>
                        ) : (
                          <span className="text-gray-400 font-medium">Pending</span>
                        )}
                      </td>
                      <td className="py-6 px-8">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${r.score
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : "bg-orange-100 text-orange-700 border border-orange-200"
                          }`}>
                          <div className={`w-2 h-2 rounded-full mr-2 ${r.score ? "bg-green-500" : "bg-orange-500"
                            }`}></div>
                          {r.score ? "Processed" : "Pending"}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <button
                          onClick={() => navigate(`/resumes/pdf/${r._id}`)}
                          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group-hover:scale-105"
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          View PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-16">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No resumes found</h3>
                        <p className="text-gray-500">Try adjusting your search criteria or upload new resumes</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Info */}
        {resumes.length > 0 && (
          <div className="mt-8 text-center pb-8">
            <p className="text-gray-500">
              Showing <span className="font-semibold text-gray-700">{resumes.length}</span> resume{resumes.length !== 1 ? 's' : ''}
              {search && <span> matching "<span className="font-semibold text-blue-600">{search}</span>"</span>}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resumes;
