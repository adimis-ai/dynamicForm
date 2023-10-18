// Define the structure of field options
interface FieldOptions {
    value: string;
    label: string;
}

// Define the structure of dynamic form fields
export interface DynamicFormField {
    field_name: string;
    field_name_with_param_prefix: string;
    field_display_name: string;
    field_type: 'String' | 'File' | 'Boolean' | 'Password' | 'Resource' | 'Select' | 'Radio' | 'Int';
    field_help_text: string;
    field_is_required: string;
    field_default_value: string | boolean | number;
    field_options?: FieldOptions[];
}

// Define props for form fields
export interface FormFieldProps {
    fieldName: string;
    field: DynamicFormField;
    formData: { [key: string]: string | boolean | File | number | undefined };
    handleInputChange: (fieldName: string, value: string | boolean | File | undefined) => void;
}

// Define configurations for JSON and dynamic forms
export type JsonFormConfig = Record<string, any>;
export type DynamicFormConfig = Record<string, DynamicFormField>;
