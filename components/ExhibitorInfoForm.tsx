import React from 'react';

interface ExhibitorInfo {
  name: string;
  company: string;
  email: string;
  phone: string;
}

interface Props {
  data: ExhibitorInfo;
  onChange: (data: ExhibitorInfo) => void;
}

const ExhibitorInfoForm: React.FC<Props> = ({ data, onChange }) => {
  const [errors, setErrors] = React.useState<{
    email?: string;
    phone?: string;
  }>({});

  const validateEmail = (email: string): string | undefined => {
    if (!email) return undefined;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return undefined;
  };

  const validatePhone = (phone: string): string | undefined => {
    if (!phone) return undefined;
    // Allow various phone formats: (123) 456-7890, 123-456-7890, 1234567890, etc.
    const phoneRegex = /^[\d\s\-()+.]+$/;
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phoneRegex.test(phone) || digitsOnly.length < 10) {
      return 'Please enter a valid phone number (at least 10 digits)';
    }
    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedData = { ...data, [name]: value };
    onChange(updatedData);

    // Validate on change
    if (name === 'email') {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error }));
    } else if (name === 'phone') {
      const error = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error }));
    } else if (name === 'phone') {
      const error = validatePhone(value);
      setErrors((prev) => ({ ...prev, phone: error }));
    }
  };

  return (
    <div className="bg-brand-medium p-6 rounded-lg shadow-xl mb-6 text-white">
      <h2 className="text-2xl font-bold text-white border-b-2 border-brand-orange pb-2 mb-6">
        Exhibitor Information
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Name"
            value={data.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Company"
            value={data.company}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-orange"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.email ? 'focus:ring-red-500 ring-red-500' : 'focus:ring-brand-orange'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Phone"
            value={data.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 ${
              errors.phone ? 'focus:ring-red-500 ring-red-500' : 'focus:ring-brand-orange'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExhibitorInfoForm;
export type { ExhibitorInfo };

