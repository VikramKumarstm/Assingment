import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Student from './components/Student/Student';
import CreateStudent from './components/CreateStudent/CreateStudent';
import UpdateStudent from './components/UpdateStudent/UpdateStudent';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Student />}></Route>
          <Route path="/create" element={<CreateStudent />}></Route>
          <Route path="/update/:id" element={<UpdateStudent />}></Route>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
