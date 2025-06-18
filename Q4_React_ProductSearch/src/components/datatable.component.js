import React, { useEffect, useState } from 'react';
import { Table, Form, InputGroup, Row, Col, Card } from 'react-bootstrap';
import { ArrowUpCircleFill, ArrowDownCircleFill } from 'react-bootstrap-icons';

// Reusable, dynamic DataTable component
const DataTable = ({
  data = [],                     // Main data (array of objects)
  title = "",                   // Optional table title
  searchable = true,            // Enable/disable search
  filterable = true,            // Enable/disable column filters
  sortable = true,              // Enable/disable sorting
  actions = null,               // Optional JSX to render in action column
}) => {
  const [columns, setColumns] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [filters, setFilters] = useState({});

  // Extract column keys once
  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
      setFilteredData(data);
    }
  }, [data]);

  // Handle global search across all fields
  useEffect(() => {
    let result = [...data];

    // Global search
    if (searchable && searchTerm.trim()) {
      result = result.filter((item) =>
        Object.values(item).some((val) =>
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Column filters
    if (filterable) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value.trim()) {
          result = result.filter((item) =>
            String(item[key]).toLowerCase().includes(value.toLowerCase())
          );
        }
      });
    }

    // Sorting
    if (sortable && sortConfig.key) {
      result.sort((a, b) => {
        const valA = a[sortConfig.key];
        const valB = b[sortConfig.key];

        if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
        if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(result);
  }, [searchTerm, filters, sortConfig, data, searchable, filterable, sortable]);

  const handleSort = (key) => {
    if (!sortable) return;
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="shadow-sm p-3 mb-4 bg-white rounded">
      {title && <Card.Header className="bg-primary text-white">{title}</Card.Header>}
      <Card.Body>
        {searchable && (
          <Row className="mb-3">
            <Col md={6}>
              <InputGroup>
                <InputGroup.Text>Search</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Type to filter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        )}

        <Table striped bordered hover responsive>
          <thead className='table-success'>
            <tr>
              {columns.map((col) => (
                <th key={col} onClick={() => handleSort(col)} style={{ cursor: sortable ? 'pointer' : 'default' }}>
                  {col}
                  {/* Sort arrows shown only for the sorted column */}
                  {sortable && sortConfig.key === col && (
                    sortConfig.direction === 'asc' ? <ArrowUpCircleFill className="ms-2" /> : <ArrowDownCircleFill className="ms-2" />
                  )}
                </th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
            {filterable && (
              <tr>
                {columns.map((col) => (
                  <th key={col}>
                    <Form.Control
                      size="sm"
                      placeholder={`Filter ${col}`}
                      value={filters[col] || ''}
                      onChange={(e) => handleFilterChange(col, e.target.value)}
                    />
                  </th>
                ))}
                {actions && <th></th>}
              </tr>
            )}
          </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col}>{String(item[col])}</td>
                  ))}
                  {actions && <td>{actions(item)}</td>}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="text-center">
                  No matching data found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default DataTable;