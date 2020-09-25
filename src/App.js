import React, { createContext, memo, useContext, useState } from 'react';
import './App.css';
import { useQuery } from "react-query";

function App() {
  // 2. Lift State (step two)
  // Share state from parent to children
  // const [country, setCountry] = useState('CA')
  return (
    // <div className="App">
    //   <CountryDetails  country={country} />
    //   <CountryPicker country={country} setCountry={setCountry}/>
    // </div>

    // 3. Global State (with contexts)
    // creating a context provider you can pass the state to the
    // country provider children
    <CountryProvider>
      <HomeContent />
    </CountryProvider>
  );
}

// converting HomeContent component to a memoized component
// avoid the component re-rendered constantly. So, this way it only renders
// when the props change improving performance.
const HomeContent = memo( () => {
  return (
    <div className="App">
      <CountryPicker />
      <CountryDetails />
    </div>
  )
})

const CountryContext = createContext(null)
function CountryProvider({children}) {
  const [country, setCountry] = useState('CA')
  return (
    <CountryContext.Provider value={{country, setCountry}} >
      {children}
    </CountryContext.Provider>
  )
}

function CountryPicker() {
  // 1. Local State (step one)
  // Create state on the component.
  // const [country, setCountry] = useState('CA')

  const {country, setCountry} = useContext(CountryContext)
  return (
    <select value={country} onChange={(e) => {setCountry(e.target.value)}}>
      <option value='CA'>Canada</option>
      <option value='CO'>Colombia</option>
      <option value='CU'>Cuba</option>s
    </select>
  )
}

// Handle Server cache with React Query
async function fetchCountry(country) {
  const res = await fetch(`http://restcountries.eu/rest/v2/alpha/${country}`)
  const data = await res.json()
  return data
}

function CountryDetails() {
  const {country} = useContext(CountryContext)
  const {data, isLoading, error} = useQuery(country, fetchCountry)

  if (isLoading) return <span>loading ....</span>
  if (error) return <span>opp!!! error occurred</span>
  return(
    <div>
      <h2>{country}</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App;
