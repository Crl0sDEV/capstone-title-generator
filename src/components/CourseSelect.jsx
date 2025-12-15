"use client";

export default function CourseSelect({ course, setCourse }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Select Course:</label>
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="w-full p-3 pl-4 pr-10 border border-gray-200 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-black/5 bg-white text-base sm:text-sm cursor-pointer text-gray-700 truncate">
        <option value="BSIT">BSIT</option>
        <option value="BSIS">BSIS</option>
        <option value="BSCS">BSCS</option>
      </select>
    </div>
  );
}