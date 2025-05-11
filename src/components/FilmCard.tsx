import { useState } from "react"

import type { Film as FilmType } from "../types/Film"

import * as icon from '../assets/icon'
import { Button } from "./Button"

type FilmProps = {
  film: FilmType;
  query: string;
  includeSynopsis: boolean
}

export const FilmCard = ({ film, query, includeSynopsis }: FilmProps) => {
  const [readMore, setReadMode] = useState<boolean>(false)
  const [watched, setWatched] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [note, setNote] = useState<boolean>(false)


  const highlightMatch = (text: string, query: string) => {
    if (!query || !includeSynopsis) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={i} className="bg-yellow-300 text-black rounded">
          {part}
        </mark>
      ) : (
        part
      )
    )
  }

  return (
    <div
      className="rounded-lg border bg-card border-gray-200 text-card-foreground shadow-sm overflow-hidden h-full flex flex-col transition-all duration-200 hover:shadow-lg"
      key={film.id}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={film.image}
          alt={film.title}
          className="object-cover transition-transform duration-300 hover:scale-105"
          style={{
            position: "absolute", height: "100%", width: "100%", inset: 0, color: "transparent"
          }}
        />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-lg font-bold mb-1 line-clamp-1">
          {highlightMatch(film.title, query)}
        </h2>

        <div className="text-sm text-gray-500 mb-2">
          <p>{film.release_date} • {film.running_time}</p>
        </div>

        <div className="flex items-center mb-2">
          <icon.Star />

          <span className="text-sm font-medium">
            {film.rt_score} %
          </span>

          <div className="ml-auto flex items-center">
            <span className="text-xs text-gray-400 italic">
              Not rated
            </span>
          </div>
        </div>

        <div className="mb-2">
          <p className={`text-sm ${!readMore && "line-clamp-3"}`}>
            {highlightMatch(film.description, query)}
          </p>

          <button onClick={() => setReadMode(!readMore)} className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors outline-none hover:bg-gray-200 cursor-pointer rounded-md h-auto text-xs text-gray-500 hover:text-gray-700 mt-">
            {!readMore ? "Read More" : "Show Less"}
          </button>
        </div>

        <div className="text-xs text-gray-500">
          <p>
            <span className="font-medium">Director: </span> {film.director}
          </p>
          <p>
            <span className="font-medium">Producer: </span> {film.producer}
          </p>
        </div>
      </div>

      <div className="items-center p-4 pt-0 flex flex-wrap gap-2">
        <Button
          variant={watched ? "contained" : "outlined"}
          onClick={() => setWatched(!watched)}
        >
          <icon.Eye style={{ stroke: watched ? "#fff" : "#000" }} /> {watched ? "Watched" : "Mark Watched"}
        </Button>

        <Button
          variant={favorite ? "contained" : "outlined"}
          color="bg-red-500"
          onClick={() => setFavorite(!favorite)}
        >
          <icon.Heart style={{ stroke: favorite ? "#fff" : "#000" }} /> {favorite ? "Favorite" : "Add Favorite"}
        </Button>

        <Button variant="outlined">
          <icon.Note /> {note ? "Edit Notes" : "Add Notes"}
        </Button>
      </div>
    </div>
  )
}