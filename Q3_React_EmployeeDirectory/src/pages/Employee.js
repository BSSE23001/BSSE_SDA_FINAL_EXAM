// pages/Employee.jsx
import React, { useState } from 'react';
import DynamicTabs from '../components/dynamicTabs.component';
import DynamicForm from '../components/dynamicForm.component';
import DataTable from '../components/datatable.component';
import { PersonAdd, Table } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

const EmployeePage = () => {
  const formSchema = [
    { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter employee name', required: true },
    { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter employee email', required: true },
    { name: 'position', label: 'Position', type: 'text', placeholder: 'e.g. Developer, HR', required: true },
    { name: 'department', label: 'Department', type: 'select', required: true,
      options: [
        { label: 'Engineering', value: 'Engineering' },
        { label: 'HR', value: 'HR' },
        { label: 'Sales', value: 'Sales' },
        { label: 'Support', value: 'Support' },
      ]
    }
  ];

  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('employees');
    return stored ? JSON.parse(stored) : [];
  });

  const handleFormSubmit = (formData) => {
    const newData = { ...formData, id: data.length + 1 };
    const updatedData = [...data, newData];
    setData(updatedData);
    localStorage.setItem('employees', JSON.stringify(updatedData));
    alert("Data Added Successfully!");
  };

  const tabs = [
    {
      eventKey: 'form',
      title: 'Add Employee',
      icon: <PersonAdd />,
      tooltip: 'Add a new employee',
      content: (
        <DynamicForm
          fields={formSchema}
          onSubmit={handleFormSubmit}
          submitLabel="Add Employee"
        />
      )
    },
    {
      eventKey: 'table',
      title: 'Employee List',
      icon: <Table />,
      tooltip: 'View all employees',
      content: (
        <DataTable
          data={data}
          title="All Employees"
          actions={(row) => (
              <>
              <button className="btn btn-sm btn-outline-danger"onClick={() => handleDelete(row.id)}>Delete</button>
              </>
          )}
        />
      )
    }
  ];

    const handleDelete = (id) => {
    const filteredData = data.filter((item) => item.id !== id);
    setData(filteredData);
    localStorage.setItem('employees', JSON.stringify(filteredData));
    alert("Data Deleted Successfully!");
  };

  return (
    <Container className="mt-4">
      <h3 className="mb-3 text-success">Employee Management</h3>
      <DynamicTabs tabs={tabs} />
    </Container>
  );
};

export default EmployeePage;