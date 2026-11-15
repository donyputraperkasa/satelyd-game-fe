"use client";

import type { ComponentType, ChangeEvent } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface SettingsInputProps {
  label: string;
  icon: ComponentType<{ size: number; className?: string }>;
  type?: string;
  value: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  helperText?: string;
  showPasswordToggle?: boolean;
  isPasswordShown?: boolean;
  onTogglePassword?: () => void;
}

export function SettingsInput({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  disabled,
  readOnly,
  helperText,
  showPasswordToggle,
  isPasswordShown,
  onTogglePassword,
}: SettingsInputProps) {
  const inputType = showPasswordToggle ? (isPasswordShown ? "text" : "password") : type;

  return (
    <div>
      <label className="block text-xs font-semibold text-[#0F172A] dark:text-[#F8FAFC] mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] dark:text-[#94A3B8]" />
        <input
          type={inputType}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full h-12 rounded-xl border border-[#E2E8F0] hover:border-[#BAE6FD] dark:border-[#282E3E] py-3 pl-11 text-sm font-medium text-[#0F172A] dark:text-[#F8FAFC] placeholder-[#94A3B8] dark:placeholder-[#64748B] focus:border-[#0284C7] focus:outline-none focus:ring-2 focus:ring-[#0284C7]/20 ${
            disabled ? "bg-[#F8FAFC] dark:bg-[#141720] opacity-80 cursor-not-allowed pr-4" : "bg-[#F8FAFC] focus:bg-white dark:bg-[#141720] " + (showPasswordToggle ? "pr-11" : "pr-4")
          }`}
        />
        {showPasswordToggle && onTogglePassword && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#64748B] dark:text-[#94A3B8] hover:text-[#0284C7] dark:hover:text-[#F8FAFC]"
          >
            {isPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {helperText && (
        <p className="text-[11px] text-[#94A3B8] dark:text-[#64748B] mt-1.5">{helperText}</p>
      )}
    </div>
  );
}
