import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export const Viewemployee = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    id: "",
    name: "",
    dept: "",
    age: "",
  });
  const [isNew, setIsNew] = useState(false); 

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios.get("http://localhost:8082/getemployee")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching employee data.");
        setLoading(false);
        console.error(error);
      });
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios.get(`http://localhost:8082/deleteEmp/${id}`)
        .then(() => {
          alert("Employee deleted successfully!");
          fetchEmployees(); 
        })
        .catch((error) => {
          console.error("Error deleting employee:", error);
          alert("Error deleting employee.");
        });
    }
  };

  const handleNewClick = () => {
    setCurrentEmployee({ id: "", name: "", dept: "", age: "" });
    setIsNew(true);
    setShowModal(true);
  };

  const handleEditClick = (employee) => {
    setCurrentEmployee(employee); 
    setIsNew(false);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEmployee({
      ...currentEmployee,
      [name]: value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isNew) {

      axios.post("http://localhost:8082/addemp", currentEmployee)
        .then(() => {
          alert("Employee added successfully!");
          setShowModal(false);
          fetchEmployees();
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
          alert("Error adding employee.");
        });
    } else {
      axios.post("http://localhost:8082/updateemployee", currentEmployee)
        .then(() => {
          alert("Employee updated successfully!");
          setShowModal(false);
          fetchEmployees(); 
        })
        .catch((error) => {
          console.error("Error updating employee:", error);
          alert("Error updating employee.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2 style={{ textAlign: "center" }}>Employee List</h2>
      <div className="text-end mb-3">
        <Button variant="success" onClick={handleNewClick}>
          New Employee
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Si.No</th>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.dept}</td>
                  <td>{employee.age}</td>
                  <td>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleEditClick(employee)}
                      className="me-2"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(employee.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isNew ? "Add Employee" : "Edit Employee"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentEmployee.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                name="dept"
                value={currentEmployee.dept}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={currentEmployee.age}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="success" type="submit">
              {isNew ? "Add Employee" : "Save Changes"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Viewemployee;
