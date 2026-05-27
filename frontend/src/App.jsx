import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar1 from './Navbar1';
import HeroSection from './HeroSection';
import Card1 from './Card1';
import Card2 from './Card2';
import Login1 from './Login1';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

function App() {

const [complaints, setComplaints] = useState([]);

const[department, setDepartment] = useState("");
const[description, setDescription] = useState("");
const[image, setImage] = useState("");

const [isLoggedIn, setIsLoggedIn] = useState(false);

const addComplaint=async()=>{
  const newComplaint={
    department:department,
    description:description,
    image:image
  }
  await axios.post(
    "http://localhost:3000/complaints",
    newComplaint
  )
getComplaints()
}
const getComplaints=async()=>{
  const response=await axios.get("http://localhost:3000/complaints")
  setComplaints(response.data)
}
const deleteComplaint=(index)=>{
  const updatedComplaints=complaints.filter((item, i)=>i!==index);
  setComplaints(updatedComplaints);
}

  return(
    isLoggedIn ? 
    <div>
      <Navbar1
      setIsLoggedIn={setIsLoggedIn}></Navbar1>
      <HeroSection
      setDepartment={setDepartment}
      setDescription={setDescription}
      setImage={setImage}
      addComplaint={addComplaint}
      ></HeroSection>
      <div className='d-flex justify-content-around mt-5'>
      
      {
        complaints.map((item, index)=>(
      <Card1 department={item.department} description={item.description} image={item.image} 
      deleteComplaint={deleteComplaint}index={index}></Card1>
        ))}
      
      </div>
      
      
      <Footer></Footer>
    </div>
    :
    <Login1 setIsLoggedIn={setIsLoggedIn}></Login1>
  )
}

export default App
