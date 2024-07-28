"use client";
import { useState } from "react";

export default function DoctorForm() {
  const [formData, setFormData] = useState<{
    [key: string]: string;
  }>({
    name: "",
    age: "",
    education: "",
    address: "",
    walletAddress: "",
    fees: "",
    contact: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form Data:", formData);
  };

  return (
    <div className="min-h-screen bg-[#faeee7] flex items-center justify-center p-5">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Doctor Registration Form</h1>
        
        {["name", "age", "education", "address", "walletAddress", "fees", "contact"].map((field) => (
          <div key={field} className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
              {field.charAt(0).toUpperCase() + field.slice(1)} *
            </label>
            {field === "address" ? (
              <textarea
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows={3}
              />
            ) : (
              <input
                type={field === "age" || field === "fees" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            )}
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-[#ff8ba7] hover:bg-[#ff6b85] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
