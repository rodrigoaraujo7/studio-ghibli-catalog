import { useMemo, useState } from "react"

import { SearchInput } from "./SearchInput"
import { FilmCard } from "./FilmCard"
import { Button } from "./Button"

import { useFilmContext } from "../context/FilmContext"

interface Filter {
  watched: boolean,
  favorite: boolean,
  hasNote: boolean
}

export const Catalog = () => {
  const [searchInputValue, setSearchInputValue] = useState<string>("")
  const [includeSynopsis, setIncludeSynopsis] = useState<boolean>(false)
  const [filters, setFilters] = useState<Filter>({
    watched: false, favorite: false, hasNote: false
  })

  const { films } = useFilmContext()

  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      const query = searchInputValue.toLowerCase()
      const titleMatch = film.title.toLowerCase().includes(query)
      const synopsisMatch = film.description?.toLowerCase().includes(query)
      const matchesText = includeSynopsis ? (titleMatch || synopsisMatch) : titleMatch

      const matchesWatched = filters.watched ? film.watched === true : true
      const matchesFavorite = filters.favorite ? film.favorite === true : true
      const matchesHasNote = filters.hasNote ? film.note.description : true

      return matchesText && matchesWatched && matchesFavorite && matchesHasNote
    })
  }, [films, searchInputValue, includeSynopsis, filters])


  const clearFilter = () => {
    setSearchInputValue("")
    setIncludeSynopsis(false)
  }

  return (
    <div className="space-y-6">
      <SearchInput
        placeholder="Search movies..."
        value={searchInputValue}
        onChange={(e) => setSearchInputValue(e.target.value)}
      />

      <div className="flex flex-wrap items-center gap-4 mt-6">
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

      <div className="flex flex-wrap gap-2 items-center mt-6">
        <div className="text-sm font-medium mr-2">Filters</div>

        <Button
          variant={filters.watched ? "contained" : "outlined"}
          color="bg-green-600"
          onClick={() => setFilters(prev => ({
            ...prev,
            watched: !prev.watched
          }))}
        >
          Watched
        </Button>

        <Button
          variant={filters.favorite ? "contained" : "outlined"}
          color="bg-red-600"
          onClick={() => setFilters(prev => ({
            ...prev,
            favorite: !prev.favorite
          }))}
        >
          Favorites
        </Button>

        <Button
          variant={filters.hasNote ? "contained" : "outlined"}
          color="bg-blue-600"
          onClick={() => setFilters(prev => ({
            ...prev,
            hasNote: !prev.hasNote
          }))}
        >
          With Notes
        </Button>
      </div>

      {(filters.watched || filters.favorite || filters.hasNote) && (
        <div className="flex items-center gap-2 mt-6">
          <span className="text-sm text-gray-500">
            Active filters:
          </span>

          <div className="flex flex-wrap gap-2">
            {filters.watched && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-green-50 text-green-700 border-green-200">
                Watched

                <button
                  className="ml-1 cursor-pointer hover:text-green-900"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    watched: !prev.watched
                  }))}
                >
                  X
                </button>
              </div>
            )}

            {filters.favorite && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-70 text-red-700 border-red-200">
                Favorites

                <button
                  className="ml-1 cursor-pointer hover:text-red-900"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    favorite: !prev.favorite
                  }))}
                >
                  X
                </button>
              </div>
            )}

            {filters.hasNote && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-red-70 text-blue-700 border-blue-200">
                With Notes

                <button
                  className="ml-1 cursor-pointer hover:text-blue-900"
                  onClick={() => setFilters(prev => ({
                    ...prev,
                    hasNote: !prev.hasNote
                  }))}
                >
                  X
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {filteredFilms.length === 0 ? (
        <div className="flex flex-col justify-center items-center gap-4 py-10">
          <p className="text-lg text-gray-500">No movies found matching "{searchInputValue}"</p>
          <Button
            variant="outlined"
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