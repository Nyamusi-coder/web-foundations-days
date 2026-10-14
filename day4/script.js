// 1. Select all the elements we need from the HTML
const textarea = document.getElementById('note-text');
const charCount = document.getElementById('char-count');
const wordCount = document.getElementById('word-count');
const clearBtn = document.getElementById('clear-btn');
const themeBtn = document.getElementById('theme-toggle');

// 2. The updateCounts() function
function updateCounts() {
    const text = textarea.value;
    const length = text.length;
    
    // Calculate words (split by spaces, but handle empty text)
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;

    // Update the text on the screen
    charCount.textContent = `${length} / 200 characters`;
    wordCount.textContent = `${words} words`;

    // Handle warning classes
    charCount.classList.remove('warning', 'over'); // Clear old classes first
    
    if (length > 200) {
        charCount.classList.add('over');
    } else if (length > 180) {
        charCount.classList.add('warning');
    }

    // Save the draft to localStorage
    localStorage.setItem('noteDraft', text);
}

// 3. Listen for typing (input event)
textarea.addEventListener('input', updateCounts);

// 4. Clear button functionality
clearBtn.addEventListener('click', () => {
    textarea.value = ''; // Empty the textarea
    updateCounts(); // Reset the counters
    localStorage.removeItem('noteDraft'); // Remove the saved draft
});

// 5. Escape key functionality
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        textarea.value = '';
        updateCounts();
        localStorage.removeItem('noteDraft');
    }
});

// 6. Theme Toggle functionality
themeBtn.addEventListener('click', () => {
    // Toggle the 'dark' class on the body
    document.body.classList.toggle('dark');
    
    // Change the button label
    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = 'Light mode';
        localStorage.setItem('theme', 'dark'); // Remember choice
    } else {
        themeBtn.textContent = 'Dark mode';
        localStorage.setItem('theme', 'light'); // Remember choice
    }
});

// 7. When the page loads, restore draft and theme
window.addEventListener('DOMContentLoaded', () => {
    // Restore text draft
    const savedDraft = localStorage.getItem('noteDraft');
    if (savedDraft) {
        textarea.value = savedDraft;
    }
    
    // Restore theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
        themeBtn.textContent = 'Light mode';
    }

    // Run updateCounts once on load to set the initial numbers
    updateCounts();
});