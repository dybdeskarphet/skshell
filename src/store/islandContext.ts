import { createContext, createState } from "ags"

export const createIslandState = () => {
  const [islandOpen, setIslandOpen] = createState(false)
  return { islandOpen, setIslandOpen }
}

export type IslandState = ReturnType<typeof createIslandState>
export const IslandContext = createContext<IslandState>(null!)
