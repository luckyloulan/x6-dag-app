import React from 'react'

interface IGlobalStore {
  drawerOpen: boolean
}

interface GlobalReducerProps {
  globalState: IGlobalStore
  setGlobalState: React.Dispatch<Partial<IGlobalStore>>
}

//global state
const globalStore: IGlobalStore = {
  drawerOpen: false,
}

//更新 global state
const GlobalReducer = (
  prevState: IGlobalStore,
  updatedProperty: Partial<IGlobalStore>,
): IGlobalStore => ({
  ...prevState,
  ...updatedProperty,
})

//React.createContext
export const GlobalContext = React.createContext<GlobalReducerProps>({
  globalState: globalStore,
  setGlobalState: () => {
    throw new Error('GlobalContext 未定义')
  },
})
