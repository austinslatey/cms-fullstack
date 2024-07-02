export default function ThoughtCard({ thought }) {
  return (
    <div className="card bg-dark text-light my-2">
      <p className="text-left m-2">{thought.username}</p>
      <h1 className="border border-secondary m-2 rounded text-center">{thought.thoughtTitle}</h1>
      <p className="border border-secondary m-2 rounded text-center">{thought.thoughtText}</p>
      <p className="text-light text-center m-4">{thought.createdAt}</p>
      <div className="d-flex justify-content-center my-2">
        <button className="btn btn-primary mx-2">Comment</button>
        <button className="btn btn-primary mx-2">Like this</button>
      </div>
    </div>
  );
}
