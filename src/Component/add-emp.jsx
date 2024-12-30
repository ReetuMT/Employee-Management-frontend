import { useState } from 'react';
import Form from 'react-bootstrap/Form'; 
import Button from 'react-bootstrap/Button';
import axios from 'axios';  

function AddEmployee() {   
  const [formData, setFormData] = useState({
    name: "",
    dept: "",
    age: ""
  });
  const [loading, setLoading] = useState(false);  
  const [error, setError] = useState("");  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const validateForm = () => {
    return formData.name && formData.dept && formData.age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");  
    
    axios.post("http://localhost:8082/addemp", formData)
  .then((response) => {
    alert("Employee added successfully!");
  })
  .catch((error) => {
    console.error("Error adding employee:", error);
    alert("Error adding employee.");
  });
  };

  return (     
    <div className='container'>     
      <h2 style={{ textAlign: "center" }}>Add Employee</h2>      
      <Form onSubmit={handleSubmit}>        
        <Form.Group className="mb-3" controlId="nameInput">
          <Form.Label>Employee Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter employee name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="deptInput">
          <Form.Label>Department</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter department" 
            name="dept" 
            value={formData.dept} 
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ageInput">
          <Form.Label>Age</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Enter age" 
            name="age" 
            value={formData.age} 
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? 'Added' : 'Submit'}
        </Button>
      </Form>
      {error && <p className="text-danger mt-3">{error}</p>} 
    </div>       
  ); 
}

export default AddEmployee;
