import React from 'react';
import AddNote from './AddNote';
import Notes from './Notes';



const Home = (props) => {


  return (
    <>
    
      <section>
      
        <AddNote showAlert={props.showAlert} />
      </section>
      <section>
        <div className="container">
          <Notes showAlert={props.showAlert} />
        </div>
      </section>

    </>
  )
}

export default Home