import ThoughtCard from "../ThoughtCard/ThoughtCard";

export default function ThoughtList({ thoughts }) {
  return (
    <div>
      {thoughts.map((thought) => (
        <ThoughtCard key={thought._id} thought={thought} />
      ))}
    </div>
  );
}
