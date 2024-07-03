import ThoughtCard from "../ThoughtCard/ThoughtCard";

function ThoughtList({ thoughts, onUpdate, onDelete }) {
  return (
    <div>
      {thoughts.map(thought => (
        <ThoughtCard key={thought._id} thought={thought} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

export default ThoughtList;
