// Quick test to check day alignment
const testDate = new Date(2024, 11, 24); // December 24, 2024 (month is 0-indexed)
const firstDayOfMonth = new Date(2024, 11, 1); // December 1, 2024
const dayOfWeek = testDate.getDay(); // 0=Sunday, 1=Monday, etc.
const firstDayOfWeek = firstDayOfMonth.getDay();

console.log("December 24, 2024 is day of week:", dayOfWeek, "(0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, etc.)");
console.log("December 1, 2024 is day of week:", firstDayOfWeek);
console.log("Day names:", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayOfWeek]);

// Calculate position in calendar grid
const position = firstDayOfWeek + 23; // 24th day is 23 positions after 1st (0-indexed)
const row = Math.floor(position / 7);
const col = position % 7;
console.log("Calendar grid position - Row:", row, "Column:", col);
console.log("Column corresponds to:", ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][col]);
