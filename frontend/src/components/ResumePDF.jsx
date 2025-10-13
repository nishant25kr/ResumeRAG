import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResumePDF = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Resume PDF</h2>
        <iframe
          src={`${backendURL}/api/resume/pdf/${id}`}
          title="Resume PDF"
          width="100%"
          height="800px"
          className="border rounded-lg"
        />

      </div>
    </div>
  );
};

export default ResumePDF;
