import React from 'react';
import { FormFieldProps } from '../../interfaces/dynamicForm';

const FormField: React.FC<FormFieldProps> = ({ fieldName, field, formData, handleInputChange }) => {
    return (
        <div key={fieldName} className="mb-6">
            <label htmlFor={fieldName} className="text-lg text-gray-600">
                {field.field_display_name}
            </label>
            <div className="mt-2">
                {/* Input field for String type */}
                {field.field_type === 'String' && (
                    <input
                        type="text"
                        id={fieldName}
                        name={fieldName}
                        value={formData[fieldName] ? formData[fieldName]?.toString() : ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    />
                )}
                {/* Input field for File type */}
                {field.field_type === 'File' && (
                    <input
                        type="file"
                        id={fieldName}
                        name={fieldName}
                        onChange={(e) => handleInputChange(fieldName, e.target.files?.[0])}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    />
                )}
                {/* Input field for Boolean type (checkbox) */}
                {field.field_type === 'Boolean' && (
                    <label className="flex items-center mt-2 text-gray-600">
                        <input
                            type="checkbox"
                            id={fieldName}
                            name={fieldName}
                            checked={formData[fieldName] === true}
                            onChange={(e) => handleInputChange(fieldName, e.target.checked)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2">{field.field_display_name}</span>
                    </label>
                )}
                {/* Input field for Password type */}
                {field.field_type === 'Password' && (
                    <input
                        type="password"
                        id={fieldName}
                        name={fieldName}
                        value={String(formData[fieldName]) || ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    />
                )}
                {/* Input field for Resource type (file upload) */}
                {field.field_type === 'Resource' && (
                    <input
                        type="file"
                        id={fieldName}
                        name={fieldName}
                        onChange={(e) => handleInputChange(fieldName, e.target.files?.[0])}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    />
                )}
                {/* Input field for Select type (dropdown) */}
                {field.field_type === 'Select' && (
                    <select
                        id={fieldName}
                        name={fieldName}
                        value={formData[fieldName] ? String(formData[fieldName]) : ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    >
                        <option value="">Select an option</option>
                        {/* Map and render select options */}
                        {field.field_options?.map((option, index) => (
                            <option key={index} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
                {/* Input field for Radio type (radio buttons) */}
                {field.field_type === 'Radio' && (
                    <div>
                        <label className="block text-gray-600">{field.field_display_name}</label>
                        {/* Map and render radio options */}
                        {field.field_options?.map((option, index) => (
                            <label key={index} className="flex items-center mt-2 text-gray-600">
                                <input
                                    type="radio"
                                    id={`${fieldName}-${index}`}
                                    name={fieldName}
                                    value={option.value}
                                    checked={formData[fieldName] === option.value}
                                    onChange={() => handleInputChange(fieldName, option.value)}
                                    className="form-radio h-5 w-5 text-blue-600"
                                />
                                <span className="ml-2">{option.label}</span>
                            </label>
                        ))}
                    </div>
                )}
                {/* Input field for Int type (number input) */}
                {field.field_type === 'Int' && (
                    <input
                        type="number"
                        id={fieldName}
                        name={fieldName}
                        value={formData[fieldName] ? formData[fieldName]?.toString() : ''}
                        onChange={(e) => handleInputChange(fieldName, e.target.value)}
                        required={field.field_is_required === 'true' ? true : false}
                        className="border rounded-lg py-2 px-3 focus:outline-none focus:ring focus:border-blue-500 w-full"
                    />
                )}
            </div>
            <p className="text-sm text-gray-500 mt-2">{field.field_help_text}</p>
        </div>
    );
};

export default FormField;
