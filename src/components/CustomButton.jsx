import React from "react";

export function ReferenceArrowIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12.9854 15.4502L15.499 12.9277L11.8057 9.24902L15.3594 6.35156L15.3594 2.59277L11.7988 2.59277L11.7988 9.24121L5.2334 2.69922L2.71973 5.22168L9.41211 11.8896L2.7002 11.8896L2.7002 15.4502L12.9854 15.4502Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function CustomButton({
  label,
  type = "button",
  onClick,
  className = "",
  style,
  showArrow = true,
  fullWidth = false,
}) {
  return (
    <button
      type={type}
      className={`custom-btn custom-btn--primary ${fullWidth ? "custom-btn--full" : ""} ${className}`.trim()}
      onClick={onClick}
      style={style}
    >
      <span className="custom-btn__text">
        <span className="text-one">{label}</span>
        <span className="text-two" aria-hidden="true">
          {label}
        </span>
      </span>
      {showArrow && <ReferenceArrowIcon size={18} />}
    </button>
  );
}
