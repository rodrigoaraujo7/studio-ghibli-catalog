import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

import { api } from "../services/api"

import type { Film } from "../types/Film"

interface FilmContextProps {
  films: Film[],
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>,
  loading: boolean,
  handleUpdateFilm: (id: string, updatedData: Partial<Film>) => void
}

const FilmContext = createContext<FilmContextProps | undefined>(undefined)

export const FilmProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchFilms = async () => {
    try {
      const response = await api.get<Film[]>("/films");

      const responseFilmes = response.data.map(film => ({
        ...film,
        watched: false,
        favorite: false,
        note: {
          rating: 0,
          description: ""
        }
      }));

      setFilms(responseFilmes);
    } catch (err) {
      console.log("Erro ao buscar filmes: " + err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateFilm = (id: string, updatedData: Partial<Film>) => {
    setFilms(prev =>
      prev.map(film =>
        film.id === id ? { ...film, ...updatedData } : film
      )
    );
  };

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <FilmContext.Provider value={{
      films,
      setFilms,
      loading,
      handleUpdateFilm
    }}>
      {children}
    </FilmContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFilmContext = () => {
  const context = useContext(FilmContext);

  if (!context) {
    throw new Error("useFilmContext deve ser usado dentro de um FilmProvider")
  }

  return context
}