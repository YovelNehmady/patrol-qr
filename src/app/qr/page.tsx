'use client'

import React, { useState } from 'react'

// function qr() {
//   return (
//     <div>
//       מייצא qr
//     </div>
//   )
// }
const Form = () => {
  const [formData, setFormData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      address: "",
      age: "",
      gender: "",
      interests: [],
  });

  const handleChange = (e:any) => {
      const { name, value, type, checked, options } = e.target;
      if (type === "checkbox") {
          const selectedOptions = Array.from(options)
              .filter((option:any) => option.selected)
              .map((option:any) => option.value);
          setFormData({ ...formData, [name]: selectedOptions });
      } else if (type === "radio" && checked) {
          setFormData({ ...formData, [name]: value });
      } else {
          setFormData({ ...formData, [name]: value });
      }
  };

  const handleSubmit = (e:any) => {
      e.preventDefault();
      console.log("Form Data:", formData);
  };

  return (
      <form  onSubmit={handleSubmit}>
          <label htmlFor="firstName" >
              First Name:
          </label>
          <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              />

          <label htmlFor="lastName">
              Last Name:
          </label>
          <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              />

          <label htmlFor="email" >
              Email:
          </label>
          <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
               />

          <label htmlFor="address" >
              Address:
          </label>
          <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              />

          <label htmlFor="age" >
              Age:
          </label>
          <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
               />

          <label >Gender:</label>

          <span style={{ display: "flex" }}>
              <label
                  style={{ width: "20px" }}
                  htmlFor="male"
                  >
                  Male
              </label>
              <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                   />
          </span>
          <span style={{ display: "flex" }}>
              <label
                  style={{ width: "20px" }}
                  htmlFor="female"
                  >
                  Female
              </label>
              <input
                  type="checkbox"
                  id="female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                   />
          </span>

          <label htmlFor="interests" >
              Interests:
          </label>
          <select
              id="interests"
              name="interests"
              multiple
              value={formData.interests}
              onChange={handleChange}
              >
              <option value="coding">Coding</option>
              <option value="reading">Reading</option>
              <option value="music">Music</option>
          </select>

          <button type="submit" >
              Submit
          </button>
          <button type="reset" >
              Reset
          </button>
      </form>
  );
};

export default Form