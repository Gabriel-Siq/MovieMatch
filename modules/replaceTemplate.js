module.exports = (temp, movie) => {
    let output = temp.replace(/{%MOVIENAME%}/g, movie.movieName);
    output = output.replace(/{%STREAMING%}/g, movie.streaming);
    output = output.replace(/{%GENRE%}/g, movie.mainGenre);
    output = output.replace(/{%IMDB%}/g, movie.imdb);
    output = output.replace(/{%YEAR%}/g, movie.year);
    output = output.replace(/{%DESCRIPTION%}/g, movie.description);
    output = output.replace(/{%ID%}/g, movie.id);
    output = output.replace(/{%IMAGE%}/g, movie.image);

    return output;
}