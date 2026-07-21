
import './App.css'
import Hero from './components/Hero'
import Navbar from './components/Navbar'



function App() {
return (
  <>
  <Navbar>
    <button>Upload</button>
  </Navbar>

  <Navbar>
    <p>Login</p>
  </Navbar>

  <Hero
  title="Echo Script"
  subtitle="Your AI notes maker with audio transcript "
  />
  
  </>
);
}

export default App
