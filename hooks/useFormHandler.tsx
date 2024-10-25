import { useState } from 'react';

export function useFormHandler() {
  const [formInput, setFormInput] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormInput(event.target.value);
  };

  return { formInput, handleChange };
}
