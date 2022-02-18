import React,{useState}from 'react'
import '../App.css'

function FetchData({isDark}) {

    const [data, setData] = useState(null)

    const letsFetch = async () => {
        const response = await fetch('https://random-data-api.com/api/crypto_coin/random_crypto_coin')
        const json = await response.json()
        setData(json)
    }

    console.log(data != null ? data.coin_name : null)
    console.log(data != null ? data.acronym : null)
    console.log(data != null ? data.logo : null)

    return (
        <div id="fetch-data-section">
            <button style={
                isDark ? 
                {padding:"0.5rem",cursor:"pointer",color:"wheat",width:"auto",height:"auto",border:"none",borderRadius:"20px",
                backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",transition:"2s"}
                :{padding:"0.5rem",cursor:"pointer",color:"black",width:"auto",height:"auto",border:"none",borderRadius:"20px", transition:"2s",backgroundColor:"rgba(255,255,255,0.2)",fontSize:"2vh",
                }}
                onClick={()=>letsFetch()}
                >Fetch Random Cryptocurrency
            </button>
            <div>{data != null ? data.coin_name : null}</div>
            <div>{data != null ? data.acronym : null}</div>
            <img src={data != null ? `${data.logo}` : null} className="avatar" style={{
            verticalAlign:"middle",
            maxWidth:"50px",
            minHeight:"50px",
            borderRadius:"50%",
        }}></img>
        </div>
    )
}

export default FetchData
