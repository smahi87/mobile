console.log("THIS IS W18 SERVER FILE RUNNING");
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

 /*

# a) CONNECT DATABASE

*/
mongoose.connect('mongodb://127.0.0.1:27017/music')
.then(() => {
  console.log("Connected to DB");

  // START SERVER ONLY AFTER DB CONNECTS
  app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
  });
})
.catch(err => console.log(err));

/*

# b) SCHEMA + COLLECTION

*/
const songSchema = new mongoose.Schema({
Songname: String,
Film: String,
Music_director: String,
Singer: String,
Actor: String,
Actress: String
});

const Song = mongoose.model('song_details', songSchema);

 /*

 
# c) INSERT 5 SONGS

*/

app.get('/', (req, res) => {
  res.send("Server is working");
});
app.get('/insert', async (req, res) => {
await Song.insertMany([
{ Songname: "Song1", Film: "Film1", Music_director: "MD1", Singer: "S1" },
{ Songname: "Song2", Film: "Film2", Music_director: "MD2", Singer: "S2" },
{ Songname: "Song3", Film: "Film3", Music_director: "MD1", Singer: "S3" },
{ Songname: "Song4", Film: "Film4", Music_director: "MD3", Singer: "S1" },
{ Songname: "Song5", Film: "Film5", Music_director: "MD2", Singer: "S2" }
]);
res.send("5 Songs Inserted");
});

 /*

# d) COUNT + DISPLAY ALL

*/
app.get('/songs', async (req, res) => {
const songs = await Song.find();
const count = await Song.countDocuments();

res.send({
totalSongs: count,
data: songs
});
});

 /*

# e) SONGS BY MUSIC DIRECTOR

*/
app.get('/songs/md/:name', async (req, res) => {
const songs = await Song.find({ Music_director: req.params.name });
res.send(songs);
});
/*

# f) SONGS BY MD + SINGER

*/
app.get('/songs/md/:md/singer/:singer', async (req, res) => {
const songs = await Song.find({
Music_director: req.params.md,
Singer: req.params.singer
});
res.send(songs);
});

/*

# g) DELETE SONG

*/
app.get('/delete/:name', async (req, res) => {
await Song.deleteOne({ Songname: req.params.name });
res.send("Song Deleted");
});

/*

# h) ADD NEW SONG

*/
app.get('/add', async (req, res) => {
await Song.create({
Songname: "NewSong",
Film: "NewFilm",
Music_director: "MD4",
Singer: "S4"
});
res.send("New Song Added");
});

 /*

# i) SONG BY SINGER + FILM

*/
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
const songs = await Song.find({
Singer: req.params.singer,
Film: req.params.film
});
res.send(songs);
});

/*

# j) UPDATE ADD ACTOR & ACTRESS

*/
app.get('/update/:name', async (req, res) => {
await Song.updateOne(
{ Songname: req.params.name },
{ $set: { Actor: "Actor1", Actress: "Actress1" } }
);
res.send("Updated");
});

 /*

# k) DISPLAY IN TABLE FORMAT

*/
app.get('/table', async (req, res) => {
const songs = await Song.find();

let html = `     <h2>Song Table</h2>     <table border="1" cellpadding="10">       <tr>         <th>Song</th><th>Film</th><th>Director</th>         <th>Singer</th><th>Actor</th><th>Actress</th>       </tr>
  `;

songs.forEach(s => {
html += `       <tr>         <td>${s.Songname}</td>         <td>${s.Film}</td>         <td>${s.Music_director}</td>         <td>${s.Singer}</td>         <td>${s.Actor || ''}</td>         <td>${s.Actress || ''}</td>       </tr>
    `;
});

html += "</table>";

res.send(html);
});

