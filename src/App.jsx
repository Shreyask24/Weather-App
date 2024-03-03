import { useState } from 'react'
import Secret from '../Secret'


function App() {
  const [city, setCity] = useState("")
  const [data, setData] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${Secret.API_UNIT}&appid=${Secret.API_KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setData(result)
        })
      setCity("");
    } catch (error) {
      console.log("Error:", error);
    }
  }



  return (
    <>
      <div className='flex justify-center items-center flex-col text-gray-200'>
        <h1 className=' mt-[25vh] font-bold text-[40px] uppercase tracking-wide'>Weather App</h1>
        <form className='mb-[30px]' onSubmit={handleSubmit}>
          <input value={city} required className='text-black mt-[40px] w-[35vh] h-[5vh] text-[15px] uppercase font-semibold placeholder:text-gray-500 rounded-lg border-2 border-black focus:outline-none focus:border-sky-900 focus:ring-1 focus:ring-sky-900 ' placeholder='Enter City Name' type="text" onChange={(e) => setCity(e.target.value)} />
          <button className='w-[13vh] uppercase h-[5vh] ml-2 rounded-xl bg-white font-semibold text-black'>Submit</button>
        </form>
        {

          data && (
            <div className='flex justify-center flex-col text-white uppercase mt-[20px]'>
              <h1 className='p-3 '>Weather in <b> {data.name} </b></h1>
              <p className='p-3'>Temperature: {data.main.temp} °C </p>
              <p className='p-3'>Overall: {data.weather[0].main} </p>
              <p className='p-3'>Description: ({data.weather[0].description}) </p>
            </div>
          )
        }
      </div>

    </>
  )
}

export default App
