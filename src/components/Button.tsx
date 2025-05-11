import { type ReactNode } from "react"

interface CustomProps {
  children: ReactNode,
  variant: 'contained' | 'outlined',
  disabled?: boolean,
  color?: string,
}

type ButtonProps = CustomProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, variant, disabled, className, color, ...props }: ButtonProps) => {
  return (
    <button
      className={`font-medium text-base h-9 w-full flex justify-center items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-all ${variant === "contained" && `${color ? color : `bg-black`} text-white`} ${variant === "outlined" && `border-1 border-gray-200 bg-white text-black`} ${disabled && 'grayscale-100'} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}