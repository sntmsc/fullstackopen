import React, { useState, useEffect } from 'react'  
import axios from 'axios'


const Weather = ({capital}) => {
  const [weather,setWeather] = useState([])
  const [displayWeather,setDisplayWeather] = useState(false)

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=576e1dbb40f5ee9d6d7a920a9d7f4678&units=metric`)
      .then(response => {
        setWeather(response.data);
        setDisplayWeather(true)
      });
  }, [capital]
  )
  return(
    <div>
      {
        !displayWeather ? 
        <p>Loading...</p>:
      <div>
        <h2>Weather in {capital}</h2>
        <p><b>Temperature:</b> {weather.main.temp} Celcius</p> 
        <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="weather icon"/>
        <p><b>wind:</b> {weather.wind.speed} meter/sec degree: {weather.wind.deg}°</p>
      </div>
      }
    </div>
  )
}

const Filter = ({search,eventSearch}) => {
  return(
    <div>
      search countries: <input value={search} onChange={eventSearch}/>
    </div>
  )
}


const CountryInfo = ({c}) => {

  return(
    <div key={c.numericCode}>
    <h1>{c.name}</h1>
    <p>capital {c.capital}</p>
    <p>population {c.population}</p>
    <h2>Languages</h2>
    <ul>
      {c.languages.map((x,i) => <li key={i}>{x.name}</li>)}
    </ul>
    <img src={c.flag} alt="national flag" style={{width:"16em", height:"10em"}}></img>
  </div>
  )
}

const Countries = ({list,eventSearch}) => {

  const countriesList = () =>  list.length > 10 ? 
    <p>Too many matches, specify another filter</p> :
    list.length===1 ?
    <div>
      <CountryInfo c={list[0]}/>
      <Weather capital= {list[0].capital}/>
    </div> :
    list.map((x,i) => <div key={x.numericCode}>
                    <p> {x.name}</p>
                    <button value={x.name} onClick={eventSearch}>show</button>
                    </div>
              )
  return(
    <div>
     {countriesList()}
   </div>  
  )
}

const App = () => {
const [countries,setCountries] = useState([])
const [search, setSearch] = useState('')

const eventSearch = (event) =>{
  setSearch(event.target.value);
  }

const filtering= (event) => {
  const text= event.toLowerCase();
  const f= countries.filter(x => x.name.toLowerCase().indexOf(text)!==-1)
  return f
}

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div className="App">
  <Filter eventSearch={eventSearch} search={search}/>
 <Countries eventSearch={eventSearch} list={filtering(search)}/>
    </div>
  );
} 
 
export default App;

