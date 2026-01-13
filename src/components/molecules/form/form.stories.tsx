import type { Meta, StoryFn as Story } from '@storybook/react-vite'

import { Form } from '~/components/molecules/form/form'
import type { FormFieldConfig, FormProps } from '~/components/molecules/form/form.types'

export default {
  title: 'components/molecules/form/Form',
  component: Form,
  parameters: {
    notes: `
# Form

A dynamic Form component that generates forms based on field configurations.
It uses React Hook Form for form state management and Zod for schema validation.

## Features
- Dynamic field rendering based on configuration
- Automatic Zod schema generation
- Built-in validation for email, phone, and text fields
- Support for required fields, min/max length, and custom patterns
    `,
  },
} as Meta

const FormTemplate: Story<FormProps> = (args) => (
  <div className="flex w-full max-w-md p-8">
    <Form {...args} />
  </div>
)

/**
 * Example with name, email, and phone fields
 */
const contactFormFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Full Name',
    type: 'text',
    placeholder: 'Enter your full name',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'name@example.com',
    validation: {
      required: 'Email is required',
    },
  },
  {
    name: 'phone',
    label: 'Phone Number',
    type: 'tel',
    placeholder: '+1 (555) 123-4567',
    validation: {
      required: false,
    },
    validate: async (value) => {
      if (value === '123') {
        return false
      }
      return true
    },
    validateMessage: 'This phone number is not , too short, too strange',
  },
]

export const ContactForm: Story<FormProps> = (args, context) => FormTemplate(args, context)

ContactForm.args = {
  fields: contactFormFields,
  onSubmit: (data) => {
    console.log('Form submitted:', data)
    alert(JSON.stringify(data, null, 2))
  },
  submitLabel: 'Submit',
  showReset: true,
}

/**
 * Example with all field types
 */
const allFieldsConfig: FormFieldConfig[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'Enter username',
    validation: { required: true, minLength: 3 },
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'name@example.com',
    validation: { required: true },
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    validation: { required: true, minLength: 8 },
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    placeholder: '25',
    validation: { required: true, min: 18, max: 120 },
  },
  {
    name: 'country',
    label: 'Country',
    type: 'select',
    placeholder: 'Select your country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'ca', label: 'Canada' },
      { value: 'de', label: 'Germany' },
    ],
    validation: { required: true },
  },
  {
    name: 'bio',
    label: 'Biography',
    type: 'textarea',
    placeholder: 'Tell us about yourself...',
    validation: { maxLength: 500 },
  },
]

export const AllFieldTypes: Story<FormProps> = (args, context) => FormTemplate(args, context)

AllFieldTypes.args = {
  fields: allFieldsConfig,
  onSubmit: (data) => {
    console.log('Form submitted:', data)
    alert(JSON.stringify(data, null, 2))
  },
  submitLabel: 'Register',
  showReset: true,
  resetLabel: 'Clear Form',
}
