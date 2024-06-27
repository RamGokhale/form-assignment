import { useState, useEffect } from 'react';
import axios from 'axios';
import "./CustomerForm.css";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:5000/employees');
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching Customer:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fname) newErrors.fname = 'First name is required';
    if (!formData.lname) newErrors.lname = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await axios.post('http://localhost:5000/employees', formData);
      fetchCustomer();
      setFormData({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="main-container">
      <div className="content-wrapper">
        <div className="form-card">
          <h1 className="customer-heading">Customer Form</h1>
          <form onSubmit={handleSubmit} className="form-box">
            <div className="form-group">
              <label htmlFor="fname">First Name : </label>
              <input
                type="text"
                id="fname"
                name="fname"
                value={formData.fname}
                onChange={handleChange}
                placeholder="Enter the first name"
                className="form-input"
              />
              {errors.fname && <span className="error">{errors.fname}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="lname">Last Name : </label>
              <input
                type="text"
                id="lname"
                name="lname"
                value={formData.lname}
                onChange={handleChange}
                placeholder="Enter the last name"
                className="form-input"
              />
              {errors.lname && <span className="error">{errors.lname}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email : </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter the email"
                className="form-input"
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone : </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter the phone number"
                className="form-input"
              />
              {errors.phone && <span className="error">{errors.phone}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="address">Address : </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter the address"
                className="form-input"
              />
              {errors.address && <span className="error">{errors.address}</span>}
            </div>
            <button type="submit" className="submitBtn">Add Customer</button>
          </form>
        </div>
       

<div className="customer-table-card">
  <table className="customer-table">
    <thead>
      <tr>
      <th>Sr. No.</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      {customer.map((customer, index) => (
        <tr key={customer._id} className="customer-row">
           <td>{index + 1}</td>
          <td>{customer.fname}</td>
          <td>{customer.lname}</td>
          <td>{customer.email}</td>
          <td>{customer.phone}</td>
          <td>{customer.address}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      </div>
    </div>
  );
};

export default CustomerForm;
