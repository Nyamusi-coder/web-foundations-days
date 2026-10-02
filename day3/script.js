// Starting data
let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];

// 1. searchNotes(word)
function searchNotes(word) {
  return notes.filter(note => note.text.toLowerCase().includes(word.toLowerCase()));
}
console.log(searchNotes("milk")); 
// Expected: [{ id: 1, text: "Buy milk and bread", category: "personal" }]
console.log(searchNotes("groceries")); 
// Expected: []

// 2. longestNote()
function longestNote() {
  if (notes.length === 0) return null;
  return notes.reduce((longest, current) => 
    current.text.length > longest.text.length ? current : longest
  );
}
console.log(longestNote()); 
// Expected: { id: 3, text: "Email the project report to Grace", category: "work" }

// Edge case for longestNote: empty array
let tempNotes = notes;
notes = [];
console.log(longestNote()); 
// Expected: null
notes = tempNotes; // Restore notes for remaining tests

// 3. countByCategory()
function countByCategory() {
  let counts = {};
  for (let note of notes) {
    if (counts[note.category]) {
      counts[note.category]++;
    } else {
      counts[note.category] = 1;
    }
  }
  return counts;
}
console.log(countByCategory()); 
// Expected: { personal: 2, study: 2, work: 1 }

// 4. getSummary()
function getSummary() {
  let counts = countByCategory();
  let total = notes.length;
  let noteWord = total === 1 ? "note" : "notes";
  
  let categoryStrings = [];
  for (let category in counts) {
    categoryStrings.push(`${counts[category]} ${category}`);
  }
  
  return `${total} ${noteWord}: ${categoryStrings.join(", ")}.`;
}
console.log(getSummary()); 
// Expected: "5 notes: 2 personal, 2 study, 1 work." (order may vary)

// Edge case for getSummary: exactly one note
notes = [{ id: 1, text: "One note", category: "work" }];
console.log(getSummary()); 
// Expected: "1 note: 1 work."
notes = tempNotes; // Restore notes

// 5. isDuplicate(text)
function isDuplicate(text) {
  let normalizedText = text.trim().toLowerCase();
  return notes.some(note => note.text.trim().toLowerCase() === normalizedText);
}
console.log(isDuplicate("  buy milk and bread  ")); 
// Expected: true
console.log(isDuplicate("Buy new shoes")); 
// Expected: false

// 6. addNote(text, category)
function addNote(text, category) {
  const validCategories = ["personal", "work", "study"];
  
  if (text.length < 1 || text.length > 200) {
    console.log("Failed: Text must be between 1 and 200 characters.");
    return false;
  }
  
  if (isDuplicate(text)) {
    console.log("Failed: This note already exists.");
    return false;
  }
  
  if (!validCategories.includes(category)) {
    console.log("Failed: Category must be personal, work, or study.");
    return false;
  }
  
  let newId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) + 1 : 1;
  notes.push({ id: newId, text: text, category: category });
  console.log("Success: Note added.");
  return true;
}

console.log(addNote("Learn Git", "study")); 
// Expected: "Success: Note added." and returns true
console.log(addNote("Learn Git", "study")); 
// Expected: "Failed: This note already exists." and returns false (duplicate test)
console.log(addNote("", "work")); 
// Expected: "Failed: Text must be between 1 and 200 characters." and returns false
console.log(addNote("Test note", "invalid")); 
// Expected: "Failed: Category must be personal, work, or study." and returns false