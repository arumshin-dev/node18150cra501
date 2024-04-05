import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Movie from "../components/Movie";

function Detail(){
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState([]);
    const getMovie = async () =>{
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        console.log(json);
        setMovie(json.data.movie);
        setLoading(false);
    };
    useEffect(() => {
        getMovie();
    }, []);
    console.log(movie);
    console.log(movie.title);

    //https://yts.mx/api/v2/movie_details.json?movie_id=15527

    return (
        <div>
            {loading ? <h1>Loading...</h1>
                : <div>{
                    <div>
                        <img src={movie.background_image} alt={movie.title}/>
                        <img src={movie.background_image_original} alt={movie.title}/>
                        <img src={movie.large_cover_image} alt={movie.title}/>
                        <img src={movie.medium_cover_image} alt={movie.title}/>
                        <img src={movie.small_cover_image} alt={movie.title}/>
                        <h2><Link to={`/movie/${id}`}>{movie.title}</Link></h2>
                        <p>{movie.title_long}</p>
                        <p>{movie.year}</p>
                        <p>{movie.description_full}</p>
                        <ul>
                            {movie.genres.map(g => (
                                    <li key={g}>{g}</li>
                                )
                            )}
                        </ul>
                    </div>
                }</div>}
        </div>
    );
}
export default Detail;