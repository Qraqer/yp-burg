import { useState } from 'react';

import type { ChangeEvent } from 'react';

const useForm = <T extends Record<string, string>>(
  baseForm: T
): [T, (e: ChangeEvent<HTMLInputElement>) => void] => {
  const [form, setForm] = useState<T>(baseForm);

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const element = e.target;
    setForm((pastForm) => ({ ...pastForm, [element.name]: element.value }));
  }

  return [form, handleChange];
};

export default useForm;
