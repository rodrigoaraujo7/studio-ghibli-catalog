import * as icon from '../assets/icon/'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = ({ ...props }: InputProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <icon.MagnifyingGlass />
      </div>
      <input
        className="flex h-10 w-full rounded-md border border-input border-gray-200 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-10 pr-10"
        type="text"
        {...props}
      />
    </div>
  )
}