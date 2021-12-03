import * as csv from 'fast-csv'
import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log(`this is dirname ${__dirname}`)
const url = './title_id_map.csv'
let arr = {}
let keys = ['Watchmode ID', ' IMDB ID', ' TMDB ID', ' TMDB Type'];


fs.createReadStream(url)
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row => {
        arr[row[keys[1]]] = row
    })
    .on('end', rowCount => {
        console.log(`Parsed ${rowCount} rows`)
        console.log(arr['tt1442481'])
    });

// Papa.parse(url, {
//     download: true,
//     header: true,
//     skipEmptyLines: true,
//     complete: function (results) {
//         console.log(results.data)
//     }
// })


// fs.createReadStream(path.resolve(__dirname, 'assets', 'parse.csv'))
//     .pipe(csv.parse({ headers: true }))
//     .on('error', error => console.error(error))
//     .on('data', row => console.log(row))
//     .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));