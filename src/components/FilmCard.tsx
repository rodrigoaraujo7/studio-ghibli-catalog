import { useState } from "react"

import type { Film as FilmType } from "../types/Film"

import * as icon from '../assets/icon'
import { Button } from "./Button"
import { BlurContent } from "./BlurContent"
import { FormCard } from "./FormCard"

type FilmProps = {
  film: FilmType;
  query: string;
  includeSynopsis: boolean
}

type NoteModalProps = {
  filmTitle: FilmType["title"];
  note: Note,
  setNote: React.Dispatch<React.SetStateAction<Note>>,
  setNoteModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface Note {
  rating: number,
  description: string,
}

export const FilmCard = ({ film, query, includeSynopsis }: FilmProps) => {
  const [readMore, setReadMode] = useState<boolean>(false)
  const [watched, setWatched] = useState<boolean>(false)
  const [favorite, setFavorite] = useState<boolean>(false)
  const [noteModal, setNoteModal] = useState<boolean>(false)
  const [note, setNote] = useState<Note>({ rating: 0, description: "" })

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
          <icon.Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />

          <span className="text-sm font-medium">
            {film.rt_score} %
          </span>

          <div className="ml-auto flex items-center">
            {note.rating === 0 ? (
              <span className="text-xs text-gray-400 italic">
                Not rated
              </span>
            ) : (
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <icon.Star
                    className={`w-3 h-3 transition-colors ${note.rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-3">
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

        {note.description !== "" && (
          <div className="mt-3 p-2 bg-blue-50 rounded-md">
            <div className="flex items-center mb-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Your Notes
              </span>
            </div>

            <p className="text-xs text-gray-600 line-clamp-2">{note.description}</p>
          </div>
        )}
      </div>


      <div className="items-center p-4 pt-0 flex flex-wrap gap-2">
        <Button
          variant={watched ? "contained" : "outlined"}
          className="w-full"
          onClick={() => setWatched(!watched)}
        >
          <icon.Eye style={{ stroke: watched ? "#fff" : "#000" }} /> {watched ? "Watched" : "Mark Watched"}
        </Button>

        <Button
          variant={favorite ? "contained" : "outlined"}
          color="bg-red-500"
          className="w-full"
          onClick={() => setFavorite(!favorite)}
        >
          <icon.Heart style={{ stroke: favorite ? "#fff" : "#000" }} /> {favorite ? "Favorite" : "Add Favorite"}
        </Button>

        <Button
          variant="outlined"
          className="w-full"
          onClick={() => setNoteModal(!noteModal)}
        >
          <icon.Note /> {(note.description !== "" || note.rating > 0) ? "Edit Notes" : "Add Notes"}
        </Button>
      </div>

      {noteModal && (
        <NoteModal
          filmTitle={film.title}
          note={note}
          setNote={setNote}
          setNoteModal={setNoteModal}
        />
      )}
    </div>
  )
}

const NoteModal = ({ filmTitle, note, setNote, setNoteModal }: NoteModalProps) => {
  const [rating, setRating] = useState<number>(note.rating)
  const [description, setDescription] = useState<string>(note.description)

  const handleSaveNote = () => {
    setNote({
      rating,
      description
    })

    setNoteModal(false)
  }

  return (
    <BlurContent>
      <FormCard title={`Add Notes for ${filmTitle}`}>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Your Rating:
            </label>

            <div className="flex items-center">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="p-1 cursor-pointer focus:outline-none"
                    onClick={() => setRating(star)}
                  >
                    <icon.Star
                      className={`w-6 h-6 transition-colors ${rating >= star ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                    />
                  </button>
                ))}
              </div>

              <span className="ml-2 text-sm text-gray-600">{rating}/5</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Notes:</label>

            <textarea
              className="flex w-full rounded-md border border-input border-gray-200 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[150px]"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outlined" onClick={() => setNoteModal(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSaveNote}>Save Notes</Button>
          </div>
        </div>
      </FormCard>
    </BlurContent>
  )
}