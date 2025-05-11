import { useMemo, useState } from "react"

import { SearchInput } from "./SearchInput"
import { FilmCard } from "./FilmCard"
import { Button } from "./Button"

import { useFilmContext } from "../context/FilmContext"

export const Catalog = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("")
  const [includeSynopsis, setIncludeSynopsis] = useState<boolean>(false)

  const { films } = useFilmContext()

  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      const query = searchInputValue.toLowerCase()
      const titleMatch = film.title.toLowerCase().includes(query)
      const synopsisMatch = film.description?.toLowerCase().includes(query) // evite erro se não existir

      return includeSynopsis ? (titleMatch || synopsisMatch) : titleMatch
    }
    )
  }, [films, searchInputValue, includeSynopsis])

  const clearFilter = () => {
    setSearchInputValue("")
  }

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search movies..."
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center space-x-2">
          <input
            id="include-synopsis"
            type="checkbox"
            className="w-4 h-4 outline-none bg-gray-100 border-gray-300 rounded-sm accent-black cursor-pointer"
            checked={includeSynopsis}
            onChange={() => setIncludeSynopsis(!includeSynopsis)}
          />
          <label
            htmlFor="include-synopsis"
            className="text-sm font-medium leading-none cursor-pointer"
          >
            Include synopsis in search
          </label>
        </div>
      </div>

      {filteredFilms.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 py-10">
          <p className="text-lg text-gray-500">No movies found matching "{searchInputValue}"</p>
          <Button
            variant="outlined"
            style={{ width: "fit-content" }}
            onClick={clearFilter}
          >
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredFilms.map(film => (
            <FilmCard
              film={film}
              query={searchInputValue}
              includeSynopsis={includeSynopsis}
            />
          ))}
        </div>
      )}
    </div>
  )
}