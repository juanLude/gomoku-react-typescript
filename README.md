# Gomoku Game

The goal of the game is to be the first player to create a continuous line of five stones either horizontally, vertically, or diagonally on the game board.

# How to run the Game

1. Install dependencies: 'npm'
2. Start the server: 'npm start'
3. Go to [localhost:3000](http://localhost:3000)

# Bonus

By incorporating background music and interactive click sounds, I have enhanced the gaming atmosphere, creating a more captivating and enjoyable journey for players.

I have added an useEffect hook that creates an Audio instance and starts playing the music when isMusicOn is true. When the Header component unmounts, the cleanup function is called to pause the audio. The effect is set to run whenever isMusicOn changes.

For the click sound effect, typescript asked to provide type declarations for the audio file. To do this, I had to create a custom .d.ts file with type declarations.
