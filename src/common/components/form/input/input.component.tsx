'use client';
import { memo, useCallback, useEffect, useState } from 'react';
import { useFormContext } from '../form-provider';
import { FormMask } from '../form-mask';
import { FormValidation } from '../form-validation';

type InputProps = {
  name: string;
  label?: string;
  mask?: keyof typeof FormMask;
  validation?: (keyof typeof FormValidation)[];
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  equalsTo?: string;
  prefix?: string;
  suffix?: string;
  minLength?: number;
  initialValue?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'className' | 'minLength'>;

export const Input = memo(function Input({
  name,
  label,
  mask,
  onChange,
  value: valueProp,
  validation,
  className,
  equalsTo,
  initialValue,
  minLength,
  prefix = '',
  suffix = '',
  ...rest
}: InputProps) {
  const { setFields, errors, setErrors, errorMessages, setErrorMessages } = useFormContext();
  const [value, setValue] = useState<string>('');

  const maskFn = mask && FormMask[mask];

  const handleError = useCallback(
    (value: string = '') => {
      if (!validation) return;
      let error: string = '';
      if (equalsTo) {
        error = value !== equalsTo ? 'Os campos não são iguais' : '';
      }
      if (minLength) {
        error = value.length < minLength ? `O campo precisa ter ao menos ${minLength} caracteres` : '';
      }
      error =
        validation.reduce((acc, key) => {
          const validationFn = FormValidation[key];
          return validationFn(value) || acc;
        }, '') || error;
      if (error && errors[name] !== error) {
        setErrors((errors) => ({ ...errors, [name]: error }));
        return;
      }
      setErrors((errors) => {
        const { [name]: _, ...rest } = errors;
        return rest;
      });
    },
    [equalsTo, minLength, validation, name, errors, setErrors],
  );

  const handleChange = useCallback(
    (value: string) => {
      maskFn && (value = maskFn(value));
      setValue(value);
      onChange && onChange(value);
      handleError(value);
      setFields((fields) => {
        const { [name]: _, ...rest } = fields;
        value && (rest[name] = value);
        return rest;
      });
      setErrorMessages((errorMessages) => ({ ...errorMessages, [name]: false }));
    },
    [handleError, maskFn, onChange, name, setFields, setErrorMessages],
  );

  useEffect(() => {
    handleError();
    setErrorMessages((errorMessages) => ({ ...errorMessages, [name]: false }));
  }, []);

  useEffect(() => {
    if ((!valueProp && valueProp !== '') || valueProp === value) return;
    console.log(valueProp);
    handleChange(valueProp);
  }, [valueProp, handleChange]);

  useEffect(() => {
    if (initialValue) {
      handleChange(initialValue);
    }
  }, [initialValue]);

  return (
    <div className={`flex flex-col gap-2 ${className} ${errorMessages?.[name] && '[&_div]:border-danger'}`}>
      {label && (
        <label htmlFor={name} className="text-base">
          {label}
        </label>
      )}
      <div className="flex flex-col gap-1 relative">
        <div className="flex border-2 border-primary rounded-xl">
          {prefix && (
            <span className="flex items-center justify-center px-4 border-r bg-background-light rounded-l-lg border-background-lighter">
              {prefix}
            </span>
          )}
          <input
            className={'border-0 w-full rounded-xl p-2 px-4 focus:outline-none'}
            onChange={(e) => handleChange(e.target.value)}
            name={name}
            value={value}
            {...rest}
          />
          {suffix && (
            <span className="flex items-center justify-center px-4 border-l bg-background-light rounded-r-lg border-background-lighter">
              {suffix}
            </span>
          )}
        </div>
        {errorMessages?.[name] && <p className="text-sm text-danger pl-1">{errors[name]}</p>}
      </div>
    </div>
  );
});
