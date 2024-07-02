import ThoughtContainer from "../../ThoughtContainer/ThoughtContainer"
import "./Home.css"

export default function Home() {

  return (
    <>
      <div className="bg-secondary">
        <div className="bg-secondary">
        <ThoughtContainer />
        </div>
        
        <div className="container">
          {/* display feed here -- eventually map the data*/}
          <div className="card text-center bg-dark text-light my-2">
            <h1 className="border border-secondary m-2 rounded">article name</h1>
            <p className="border border-secondary m-2 rounded">article text</p>
            <a href="">View author</a>
            <div className="d-flex justify-content-center my-2">
              <button className="btn btn-primary mx-2">comment</button>
              <button className="btn btn-primary mx-2">like this</button>
            </div>
          </div>
          <div className="card text-center bg-dark text-light my-2">
            <h1 className="border border-secondary m-2 rounded">article name</h1>
            <p className="border border-secondary m-2 rounded">article text</p>
            <a href="">View author</a>
            <div className="d-flex justify-content-center my-2">
              <button className="btn btn-primary mx-2">comment</button>
              <button className="btn btn-primary mx-2">like this</button>
            </div>
          </div>
          <div className="card text-center bg-dark text-light my-2">
            <h1 className="border border-secondary m-2 rounded">article name</h1>
            <p className="border border-secondary m-2 rounded">article text</p>
            <a href="">View author</a>
            <div className="d-flex justify-content-center my-2">
              <button className="btn btn-primary mx-2">comment</button>
              <button className="btn btn-primary mx-2">like this</button>
            </div>
          </div>  
        </div>
      </div>
    </>
  )
}