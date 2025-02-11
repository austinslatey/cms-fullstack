import ThoughtCard from "../ThoughtCard/ThoughtCard";

function ThoughtList({ thoughts, onUpdate, onDelete }) {

  const parseCustomDate = (dateStr) => {
    // Handle missing dates
    if (!dateStr) return null; 

    try {
       // Remove "th", "st", "nd", "rd"
      const cleanedStr = dateStr
        .replace(/(\d+)(st|nd|rd|th)/, "$1")
        
        // Remove " at"
        .replace(" at", ""); 

      return new Date(cleanedStr);
    } catch (error) {
      console.error("Invalid date format:", dateStr);
      return null;
    }
  };

  const sortedThoughts = thoughts.slice().sort((a, b) => {
    const dateA = parseCustomDate(a.createdAt);
    const dateB = parseCustomDate(b.createdAt);

    // Skip invalid dates
    if (!dateA || !dateB) return 0; 

    // Sort descending (newest first)
    return dateB - dateA; 
  });

  return (
    <div>
      {sortedThoughts.map((thought) => (
        <ThoughtCard key={thought._id} thought={thought} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ThoughtList;
