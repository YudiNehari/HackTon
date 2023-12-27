import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';

const BusinessRegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    business_name: '',
    city: '',
    user_id: typeof window !== 'undefined'&& sessionStorage.getItem('user_id') || '', // Get user_id from sessionStorage
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // @ts-ignore
    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    try {
      // Send the form data using Axios
      const response = await axios.post(
        'http://13.51.64.28/register_business',
        formData
      );

      // Handle the response (e.g., show a success message)
      console.log('Response:', response.data);
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label="Business Name"
        name="business_name"
        value={formData.business_name}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Register Business
      </Button>
    </form>
  );
};

export default BusinessRegistrationForm;
