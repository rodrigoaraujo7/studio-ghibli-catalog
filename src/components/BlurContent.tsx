import type { ReactNode } from "react"

type BlurContentProps = {
  children: ReactNode
}

export const BlurContent = ({ ...props }: BlurContentProps) => (
  <div
    className="fixed inset-0 z-10 flex justify-center items-center bg-black/80"
  >
    {props.children}
  </div>
)