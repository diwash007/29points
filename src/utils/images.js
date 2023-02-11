let images = [
    "/29points/assets/imgs/reveal-trump.png",
]

const suits = ["H", "S", "D", "C"];
const values = ["J", "9", "1", "T", "K", "Q", "8", "7"];

for (let value of values) {
    for (let suit of suits) {
        images.push(`/29points/assets/cards/bhoos/${value}${suit}.png`);
        images.push(`/29points/assets/cards/classic/${value}${suit}.png`);
    }
}

export default images;