"use client";

export default function CourseSelect({ course, setCourse }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Select Course:</label>
      <select
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        className="w-full p-3 border rounded-xl bg-[#fafafa] focus:ring-2 focus:ring-black transition cursor-pointer"
      >
        <option value="BSIT">BSIT</option>
        <option value="BSIS">BSIS</option>
        <option value="BSCS">BSCS</option>
      </select>
    </div>
  );
}