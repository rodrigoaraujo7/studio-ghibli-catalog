import type { ReactNode } from "react";

type FormCardProps = {
  children: ReactNode;
  title?: string;
}

export const FormCard = ({ ...props }: FormCardProps) => (
  <div className="w-2xl h-fit p-6 rounded-2xl border border-gray-200 bg-white flex flex-col">
    {props.title && (
      <h1 className="text-lg font-semibold leading-none tracking-tight">
        {props.title}
      </h1>
    )}

    {props.children}
  </div>
)