const images = [
  '/29points/assets/imgs/reveal-trump.png',
  '/29points/assets/imgs/bhoos.png',
  '/29points/assets/imgs/classic.png',
  '/29points/assets/imgs/logo.png'
]

const suits = ['H', 'S', 'D', 'C']
const values = ['J', '9', '1', 'T', 'K', 'Q', '8', '7']

for (const value of values) {
  for (const suit of suits) {
    images.push(`/29points/assets/cards/bhoos/${value}${suit}.png`)
    images.push(`/29points/assets/cards/classic/${value}${suit}.png`)
  }
}

export default images
