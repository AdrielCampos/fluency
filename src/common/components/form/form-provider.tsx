'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type FormProps = {
  children: React.ReactNode;
  onSubmit: (values: Record<string, unknown>) => void;
  onChange?: (values: Record<string, unknown>) => void;
} & Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit' | 'onChange'>;

type FormContextProps = {
  fields: Record<string, unknown>;
  errors: Record<string, string>;
  errorMessages: Record<string, boolean>;
  setFields: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setErrorMessages: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
};

const FormContext = createContext<FormContextProps>(undefined!);

export const Form = ({ children, onSubmit, onChange, ...rest }: FormProps) => {
  const [fields, setFields] = useState<Record<string, unknown>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, boolean>>({});

  const values = useMemo(
    () => ({ fields, errors, errorMessages, setFields, setErrors, setErrorMessages }),
    [fields, errors, errorMessages, setFields, setErrors, setErrorMessages],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (Object.keys(errors).length > 0) {
        setErrorMessages((errorMessages) => {
          const newErrorMessages = { ...errorMessages };
          Object.keys(errors).forEach((key) => {
            newErrorMessages[key] = true;
          });
          return newErrorMessages;
        });
        return;
      }
      onSubmit(fields);
    },
    [fields, onSubmit, errors],
  );

  useEffect(() => {
    if (!onChange) return;
    onChange(fields);
  }, [fields, onChange]);

  return (
    <FormContext.Provider value={values}>
      <form method="POST" onSubmit={(e) => handleSubmit(e)} {...rest}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  return context;
};
