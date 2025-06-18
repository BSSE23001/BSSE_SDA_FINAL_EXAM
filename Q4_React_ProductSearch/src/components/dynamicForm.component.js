import React, { useState } from 'react';
import { Form, Button, Row, Col, Modal, Container } from 'react-bootstrap';

const DynamicForm = ({
  fields = [],               // Array of input field definitions
  onSubmit,                  // Function to receive form data
  defaultValues = {},        // Optional default values
  showModal = false,         // Optional modal wrapper toggle
  modalTitle = null,         // Optional modal title
  modalShow = false,         // Controls modal visibility
  onModalClose = () => {},   // Function to close modal
  submitText = 'Submit',     // Text for submit button
}) => {
  const [formData, setFormData] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  // Handles value change for inputs
  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // clear error on change
  };

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    fields.forEach(({ name, required }) => {
      if (required && !formData[name]) {
        validationErrors[name] = 'This field is required';
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
    setFormData(defaultValues);
  };

  // Renders a field based on its type
  const renderField = (field) => {
    const { name, label, type, placeholder, options, rows = 3 } = field;
    const value = formData[name] || '';

    return (
      <Form.Group key={name} className="mb-3">
        <Form.Label>{label}</Form.Label>
        {type === 'select' ? (
          <Form.Select
            value={value}
            onChange={e => handleChange(name, e.target.value)}
          >
            <option value="">-- Select --</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>{opt.label}</option>
            ))}
          </Form.Select>
        ) : type === 'textarea' ? (
          <Form.Control
            as="textarea"
            rows={rows}
            value={value}
            onChange={e => handleChange(name, e.target.value)}
            placeholder={placeholder}
          />
        ) : type === 'checkbox' ? (
          <Form.Check
            type="checkbox"
            label={label}
            checked={!!value}
            onChange={e => handleChange(name, e.target.checked)}
          />
        ) : (
          <Form.Control
            type={type}
            value={value}
            onChange={e => handleChange(name, e.target.value)}
            placeholder={placeholder}
          />
        )}
        {errors[name] && <Form.Text className="text-danger">{errors[name]}</Form.Text>}
      </Form.Group>
    );
  };

  const formBody = (
    <Form onSubmit={handleSubmit}>
    <Row>
        {fields.map(field => (
        <Col md={field.fullWidth ? 12 : 6} key={field.name}>
            {renderField(field)}
        </Col>
        ))}
    </Row>
    <Button variant="primary" type="submit" className="mt-2">
        {submitText}
    </Button>
    </Form>
  );

  // Render inside modal if showModal = true
  if (showModal) {
    return (
      <Modal show={modalShow} onHide={onModalClose} centered>
        {modalTitle && (
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
        )}
        <Modal.Body>{formBody}</Modal.Body>
      </Modal>
    );
  }

  return (
    <Container fluid="md" className='m-5 p-5 border border-success'>
        {formBody}
    </Container>
  );
};

export default DynamicForm;