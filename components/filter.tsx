import React, { useState } from 'react';

type FilterProps = {
  onApplyFilters: (filters: any) => void;
};

const Filter = ({ onApplyFilters }: FilterProps) => {
  const [filters, setFilters] = useState({
    gender: '',
    experienceMin: '',
    experienceMax: '',
    feeMin: '',
    feeMax: '',
    location: '',
  });
  


  const handleChange = (e : any ) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  return (
    <div className="p-4 bg-[#fffffe] text-black rounded w-full  center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
      <div className="mb-4">
        <div
          className="w-full text-left"
        >
          Gender
        </div>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleChange}
            className="w-full p-2 bg-[#ff8ba7] rounded mt-2"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
      </div>

      <div className="mb-4">
        <div
          className="w-full text-left"
        >
          Experience
        </div>
          <div className="flex space-x-2 mt-2">
            <input
              type="number"
              name="experienceMin"
              value={filters.experienceMin}
              placeholder="Min"
              onChange={handleChange}
              className="w-full p-2 bg-[#ff8ba7] rounded text-[black] "
            />
            <input
              type="number"
              name="experienceMax"
              value={filters.experienceMax}
              placeholder="Max"
              onChange={handleChange}
              className="w-full p-2 bg-[#ff8ba7] rounded text-[black]"
            />
          </div>
      </div>

      <div className="mb-4">
        <div
          className="w-full text-left"
         
        >
          Fee
        </div>
          <div className="flex space-x-2 mt-2">
            <input
              type="number"
              name="feeMin"
              value={filters.feeMin}
              placeholder="Min"
              onChange={handleChange}
              className="w-full p-2 bg-[#ff8ba7] rounded"
            />
            <input
              type="number"
              name="feeMax"
              value={filters.feeMax}
              placeholder="Max"
              onChange={handleChange}
              className="w-full p-2 bg-[#ff8ba7] rounded"
            />
          </div>
      </div>

      <div className="mb-4">
        <div
          className="w-full text-left"
      
        >
          Location
        </div>
          <select
            name="location"
            value={filters.location}
            onChange={handleChange}
            className="w-full p-2 bg-[#ff8ba7] rounded mt-2"
          >
            <option value="">All</option>
            <option value="north-america">North America</option>
            <option value="south-america">South America</option>
            <option value="asia">Asia</option>
            <option value="australia">Australia</option>
            <option value="europe">Europe</option>
          </select>
      </div>
      <button
        onClick={handleApplyFilters}
        className="mt-7 pt-[10px] py-2 bg-[#faeeee] text-black rounded h-[40px] hover:bg-[#faeee1] mb-4"
      >
        Apply Filters
      </button>
      
    </div>
  );
};

export default Filter;