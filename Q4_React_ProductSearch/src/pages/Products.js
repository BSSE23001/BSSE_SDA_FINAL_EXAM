// pages/Products.jsx
import React, { useState } from 'react';
import DynamicTabs from '../components/dynamicTabs.component';
import DynamicForm from '../components/dynamicForm.component';
import DataTable from '../components/datatable.component';
import { Table, BoxArrowInDown } from 'react-bootstrap-icons';
import { Container } from 'react-bootstrap';

const ProductsPage = () => {
  const formSchema = [
    { name: 'productName', label: 'Product Name', type: 'text', placeholder: 'Enter product name', required: true },
    { name: 'category', label: 'Category', type: 'select', required: true,
      options: [
        { label: 'Electronics', value: 'Electronics' },
        { label: 'Apparel', value: 'Apparel' },
        { label: 'Books', value: 'Books' },
        { label: 'Furniture', value: 'Furniture' }
      ]
    },
    { name: 'price', label: 'Price ($)', type: 'number', placeholder: 'Enter price', required: true },
    { name: 'stock', label: 'Stock Quantity', type: 'number', placeholder: 'Enter stock count', required: true }
  ];

  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('products');
    return stored ? JSON.parse(stored) : [];
  });

  const handleFormSubmit = (formData) => {
    const newData = { ...formData, id: data.length + 1 };
    const updatedData = [...data, newData];
    setData(updatedData);
    localStorage.setItem('products', JSON.stringify(updatedData));
    alert("Data Added Successfully!");
  };

  const tabs = [
    {
      eventKey: 'form',
      title: 'Add Product',
      icon: <BoxArrowInDown />,
      tooltip: 'Add a new product',
      content: (
        <DynamicForm
          fields={formSchema}
          onSubmit={handleFormSubmit}
          submitLabel="Add Product"
        />
      )
    },
    {
      eventKey: 'table',
      title: 'Product List',
      icon: <Table />,
      tooltip: 'View all products',
      content: (
        <DataTable
          data={data}
          title="All Products"
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
      <h3 className="mb-3 text-info">Product Management</h3>
      <DynamicTabs tabs={tabs} />
    </Container>
  );
};

export default ProductsPage;
