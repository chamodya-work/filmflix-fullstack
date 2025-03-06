import React, { useEffect, useState } from "react";
import "./tvSeries.css"
import Navbar from "../../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import seriesImages from '../../assets/series/seriesImages';

const TVSeries = () => {
    const navigate = useNavigate();
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const result = await fetch('http://localhost:8081/getAllSeries');
                setSeries(await result.json());
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    return(
        <div className="wrapper__tvSeries">
            <Navbar />
            <div className="tvSeries-heading">
                <h1>TV Series</h1>
            </div>
            <div className="tvSeries_scroll-wrapper">
                
                <div className="scroll-content">
                {series.map(series => (
                        <img src={series.poster_path} alt={seriesImages[series.name]} onClick={() => {navigate(`/seriesTrailer/${series.series_id}`)}}/>
                    ))}
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default TVSeries;