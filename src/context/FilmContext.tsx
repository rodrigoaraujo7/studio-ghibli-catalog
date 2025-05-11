import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

import { api } from "../services/api"

import type { Film } from "../types/Film"

interface FilmContextProps {
  films: Film[],
  setFilms: React.Dispatch<React.SetStateAction<Film[]>>,
  loading: boolean,
}

const FilmContext = createContext<FilmContextProps | undefined>(undefined)

export const FilmProvider = ({ children }: { children: ReactNode }) => {
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const fetchFilms = async () => {
    try {
      const response = await api.get("/films");
      setFilms(response.data);
    } catch (err) {
      console.log("Erro ao buscar filmes: " + err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFilms()
  }, [])

  return (
    <FilmContext.Provider value={{
      films,
      setFilms,
      loading,
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