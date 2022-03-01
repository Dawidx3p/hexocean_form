import './App.css';

import {Formik, Field, Form, ErrorMessage} from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialValues = {
    name: '',
    preparation_time: '',
    type: '',
    slices_of_bread: 1,
    spiciness_scale: 1,
    no_of_slices: 8,
    diameter: 35
  }

  const onSubmit = (values) => {
    const {
      name, 
      preparation_time, 
      type, no_of_slices, 
      diameter, 
      spiciness_scale, 
      slices_of_bread
    } = values;

    setIsSubmitting(true);

    const getData = () => {
      switch(values.type){
        case 'pizza':
          return {name, preparation_time, type, no_of_slices, diameter}
        case 'soup':
          return {name, preparation_time, type, spiciness_scale}
        case 'sandwich':
          return {name, preparation_time, type, slices_of_bread}
        default:
          return {}
    }}

    fetch('https://frosty-wood-6558.getsandbox.com:443/dishes', {
      headers:{
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify(getData())
    })
    .then(response => response.json())
    .then(JSONdata => {
      setIsSubmitting(false);
      console.log(JSONdata)
    })
  }

  return (
    <div className="App">
      <Formik 
      initialValues={initialValues}
      validationSchema={yup.object({
        name: yup.string().required('Required'),
        preparation_time: yup.string().required('Required'),
        type: yup.string().required('Required'),
        no_of_slices: yup.number(),
        diameter: yup.number(),
        spiciness_scale: yup.number(),
        slices_of_bread:  yup.number().required('Required')
      })}
      onSubmit={onSubmit}
      >
        {({values, handleChange}) => <>
          <Form>
            <label htmlFor='name'>Name</label>
            <ErrorMessage name="name">
              {msg => <div className="field-error">{msg}</div>}
            </ErrorMessage>
            <Field name="name" type="text"/>

            <label htmlFor='preparation_time'>Preperation Time</label>
            <ErrorMessage name="preparation_time">
              {msg => <div className="field-error">{msg}</div>}
            </ErrorMessage>
            <Field name="preparation_time" type="time" step="1" min="00:00:00" />

            <label htmlFor='type'>Type</label>
            <ErrorMessage name="type">
              {msg => <div className="field-error">{msg}</div>}
            </ErrorMessage>
            <div className="select">
              <select name="type" onChange={handleChange}>
                <option value="">Choose option</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="sandwich">Sandwich</option>
              </select>
            <span className="focus"></span>
            </div>

            {values.type==='soup' && <>
              <label htmlFor='spiciness_scale'>Spiciness Scale</label>
              <ErrorMessage name="spiciness_scale">
                {msg => <div className="field-error">{msg}</div>}
              </ErrorMessage>
              <div>
                <Field name="spiciness_scale" type="range" min="1" max="10" step="1" />
              </div>
            </>}

            {values.type==='sandwich' && <>
              <label htmlFor='slices_of_bread'>Slices of Bread</label>
              <ErrorMessage name="slices_of_bread">
                {msg => <div className="field-error">{msg}</div>}
              </ErrorMessage>
              <Field name="slices_of_bread" type="number"/>
            </>}

            {values.type==='pizza' && <>
              <label htmlFor='no_of_slices'>Number of Slices</label>
              <ErrorMessage name="no_of_slices">
                {msg => <div className="field-error">{msg}</div>}
              </ErrorMessage>
              <Field name="no_of_slices" type="number"/>

              <label htmlFor='diameter'>Diameter</label>
              <ErrorMessage name="diameter">
                {msg => <div className="field-error">{msg}</div>}
              </ErrorMessage>
              <Field name="diameter" type="number" step="0.1"/>
            </>}

            <button 
            type="submit" 
            disabled={isSubmitting}>
              Submit
            </button>
            
          </Form>
        </>}
      </Formik>
    </div>
  );
}

export default App;
