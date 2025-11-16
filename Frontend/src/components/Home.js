import React from "react";
import AddNote from "./AddNote";
import Notes from "./Notes";

export default function Home() {
  
  return (
    <div>
      <div className="container mt-3">
        <h1></h1>
        <AddNote />
        <h1 className="mt-3">Your Notes</h1>
        <div>
          <Notes/>
        </div>
      </div>
    </div>
  );
}
