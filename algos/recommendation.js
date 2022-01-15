const findTopGenres = (user, routeName) => {
    const userPins = user.pins;
    let topGenresObj = {};

    for (var pin of userPins) {
        let topGenreKeys = Object.keys(topGenresObj)
        let genres = pin.genre.split(",")
        for (var genre of genres) {
            genre = genre.toString().trim()
            if (topGenreKeys.includes(genre) === false) {
                topGenresObj[genre] = 1
            } else {
                let value = parseInt(topGenresObj[genre])
                topGenresObj[genre] = value + 1
            }
        }
    }

 
    user.topGenres.pop()
    user.topGenres.push(topGenresObj);

    user.save();

    let top1Value = null;
    let top2Value = null;
    let top3Value = null; 
    let top1Key = null;
    let top2Key = null;
    let top3Key = null; 

    let topGenreKeys = Object.keys(topGenresObj)
    topGenreKeys.map((genre) => { 
        let value = topGenresObj[genre]

        if (top1Value === null || value > top1Value){
            top3Value = top2Value
            top3Key = top2Key
            top2Value = top1Value
            top2Key = top1Key
            top1Value = value
            top1Key = genre
        } else if (top2Value === null || value > top2Value){
            top3Value = top2Value
            top3Key = top2Key
            top2Value = value
            top2Key = genre
        } else if (top3Value === null || value > top3Value){
            top3Value = value
            top3Key = genre
        }

    })

    let criteria = [{ 'genre': { $regex: top1Key, $options: 'i' } }, { 'genre': { $regex: top2Key, $options: 'i' } }, { 'genre': { $regex: top3Key, $options: 'i' } }]
    return criteria
}
 
export {findTopGenres}