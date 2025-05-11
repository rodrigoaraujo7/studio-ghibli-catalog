import type { Film as FilmType } from "../types/Film"

import * as icon from '../assets/icon'

type FilmProps = {
  film: FilmType
}

export const FilmCard = ({ film }: FilmProps) => {
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
          {film.title}
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
          <p className="text-sm line-clamp-3">
            {film.description}
          </p>

          <button>Read more</button>
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
    </div>
  )
}