// async function test() {
//     const ids = "JsdyvUQBlaA"
//     const API_KEY = "AIzaSyCqwqRlzqNPAotET_asqCdoXJi1fuCpdWg"
//     const videoParams = new URLSearchParams({
//         part: "contentDetails",
//         id: ids,
//         key: API_KEY,
//     });
//
//     const videosResponse = await fetch(
//         `https://www.googleapis.com/youtube/v3/videos?${videoParams}`
//     );
//
//     const videosData = await videosResponse.json();
//     return videosData;
// }
//
// const res = await test();
// console.log(res.items[0].contentDetails);


const API_KEY = process.env.NEXT_API_KEY;
const BASE_URL  = process.env.YOUTUBE_BASE_URL;

console.log(API_KEY, BASE_URL);
