import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export default function Input({
  label,
  error,
  leftIcon,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-app-200">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-app-500">
            {leftIcon}
          </span>
        )}
        <input
          id={id}
          className={`
            w-full bg-app-800 border border-app-700 rounded-lg px-3 py-2.5 text-sm
            text-app-50 placeholder-app-500
            focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent
            transition-colors duration-150
            ${leftIcon ? "pl-9" : ""}
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
