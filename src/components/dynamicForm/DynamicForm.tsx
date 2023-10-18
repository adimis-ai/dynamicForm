import { useState, FormEvent } from 'react';
import configData from '../../config/config.json';
import FormField from './FormField';
import { JsonFormConfig, DynamicFormConfig, DynamicFormField } from '../../interfaces/dynamicForm';

const jsonData: JsonFormConfig = configData;

function DynamicForm() {
  const formFields: DynamicFormConfig = {};

  // Initialize formFields based on jsonData
  for (const key in jsonData) {
    if (Object.prototype.hasOwnProperty.call(jsonData, key)) {
      const jsonField = jsonData[key];
      const dynamicField: DynamicFormField = {
        field_name: jsonField.field_name,
        field_name_with_param_prefix: jsonField.field_name_with_param_prefix,
        field_display_name: jsonField.field_display_name,
        field_type: mapFieldType(jsonField.field_type),
        field_help_text: jsonField.field_help_text,
        field_is_required: jsonField.field_is_required,
        field_default_value: jsonField.field_default_value,
        field_options: jsonField.field_options,
      };
      formFields[key] = dynamicField;
    }
  }

  // Define a mapping function for field types
  function mapFieldType(jsonType: string): DynamicFormField['field_type'] {
    switch (jsonType) {
      case 'String':
        return 'String';
      case 'File':
        return 'File';
      case 'Boolean':
        return 'Boolean';
      case 'Password':
        return 'Password';
      case 'Resource':
        return 'Resource';
      case 'Select':
        return 'Select';
      case 'Radio':
        return 'Radio';
      case 'Int':
        return 'Int';
      default:
        return 'String';
    }
  }

  // Define the form state using useState
  const [formData, setFormData] = useState<Record<string, string | boolean | File | undefined>>({});

  // Handle input changes and update formData
  const handleInputChange = (fieldName: string, value: string | boolean | File | undefined) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  // Validate the form before submission
  const validateForm = () => {
    for (const fieldName in formFields) {
      if (Object.prototype.hasOwnProperty.call(formFields, fieldName)) {
        const field = formFields[fieldName];

        if (field.field_is_required === 'true' && !formData[fieldName]) {
          alert(`Field "${field.field_display_name}" is required.`);
          return false;
        }
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form Data:', formData);

      // Log uploaded files
      for (const key in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, key)) {
          const value = formData[key];

          if (value instanceof File) {
            console.log(`File uploaded for field "${key}":`, value);
          }
        }
      }
    }
  };

  return (
    <section className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Dynamic Form</h1>
        <form onSubmit={handleSubmit}>
          {Object.keys(formFields).map((fieldName) => {
            const field = formFields[fieldName];
            return (
              <FormField
                key={fieldName}
                fieldName={fieldName}
                field={field}
                formData={formData}
                handleInputChange={handleInputChange}
              />
            );
          })}
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default DynamicForm;
