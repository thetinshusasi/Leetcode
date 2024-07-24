enum CardSuit {
    SPADE = 0,
    HEART,
    CLUB,
    DIAMOND
}

enum CardValue {
    TWO = 2,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    JACK,
    QUEEN,
    KING,
    ACE
}

class Card {
    suit: CardSuit;
    value: CardValue;

    constructor(suit: CardSuit, value: CardValue) {
        this.suit = suit;
        this.value = value;
    }

    getCardName(): string {
        return `${CardValue[this.value]} of ${CardSuit[this.suit]}`;
    }
}

class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
        this.initializeDeck();
    }

    initializeDeck() {
        this.cards = [];
        for (let value = CardValue.TWO; value <= CardValue.ACE; value++) {
            for (let suit = CardSuit.SPADE; suit <= CardSuit.DIAMOND; suit++) {
                this.cards.push(new Card(suit, value));
            }
        }
    }

    shuffle() {
        const deckLen = this.cards.length;
        for (let i = 0; i < deckLen; i++) {
            const randomIndex = Math.floor(Math.random() * deckLen);
            [this.cards[i], this.cards[randomIndex]] = [this.cards[randomIndex], this.cards[i]];
        }
    }

    deal(noOfPlayers: number): Card[][] | undefined {
        if (noOfPlayers > 52 || noOfPlayers < 2) {
            return undefined;
        }

        const noOfCardsPerPlayer = Math.floor(52 / noOfPlayers);
        const cardsPerPlayer: Card[][] = [];

        for (let i = 0; i < noOfPlayers; i++) {
            cardsPerPlayer.push(this.cards.splice(0, noOfCardsPerPlayer));
        }

        return cardsPerPlayer;
    }
}

class Player {
    name: string;
    cards: Card[];

    constructor(name: string) {
        this.name = name;
        this.cards = [];
    }

    playCard(): Card | undefined {
        return this.cards.shift();
    }

    addCards(cards: Card[]) {
        this.cards.push(...cards);
    }

    hasCards(): boolean {
        return this.cards.length > 0;
    }
}

interface PlayerCard {
    player: Player;
    card: Card;
    reservedCards?: Card[];
}

const getWinningPlayerCards = (playerCards: PlayerCard[]): PlayerCard[] => {
    let winningPlayerCards: PlayerCard[] = [];
    let maxValue = -Infinity;

    for (const playerCard of playerCards) {
        if (playerCard.card.value > maxValue) {
            maxValue = playerCard.card.value;
            winningPlayerCards = [playerCard];
        } else if (playerCard.card.value === maxValue) {
            winningPlayerCards.push(playerCard);
        }
    }

    return winningPlayerCards;
}

class Game {
    players: Player[];
    deck: Deck;

    constructor(noOfPlayers: number) {
        this.players = this.createPlayers(noOfPlayers);
        this.deck = new Deck();
        this.deck.shuffle();
        const cardsPerPlayer = this.deck.deal(noOfPlayers);
        this.distributeCards(cardsPerPlayer);
    }

    createPlayers(noOfPlayers: number): Player[] {
        const players: Player[] = [];
        for (let i = 0; i < noOfPlayers; i++) {
            players.push(new Player(`Player ${i + 1}`));
        }
        return players;
    }

    distributeCards(cardsPerPlayer: Card[][] | undefined): void {
        if (!cardsPerPlayer) return;
        for (let i = 0; i < cardsPerPlayer.length; i++) {
            this.players[i].addCards(cardsPerPlayer[i]);
        }
    }

    checkIfGameOver(): boolean {
        return this.players.filter(player => player.hasCards()).length === 1;
    }

    getWinner(): string | undefined {
        const playersWithCards = this.players.filter(player => player.hasCards());
        if (playersWithCards.length === 1) {
            return playersWithCards[0].name;
        }
        return undefined;
    }

    play(): void {
        while (!this.checkIfGameOver()) {
            const playersWithCards = this.players.filter(player => player.hasCards());
            let playerCards: PlayerCard[] = [];
            playersWithCards.forEach(player => {
                const playedCard = player.playCard();
                if (playedCard) {
                    playerCards.push({ player, card: playedCard });
                }
            });

            let winningPlayerCards = getWinningPlayerCards(playerCards);

            if (winningPlayerCards.length === 1) {
                winningPlayerCards[0].player.addCards(playerCards.map(playerCard => playerCard.card));
                continue;
            }

            let potCards: Card[] = playerCards.map(playerCard => playerCard.card);

            while (winningPlayerCards.length > 1) {
                const currentPlayersPlayCards = this.getPlayerCardsWithReserveCards(winningPlayerCards.map(p => p.player));
                potCards.push(...currentPlayersPlayCards.map(playerCard => playerCard.card));
                potCards.push(...currentPlayersPlayCards.map(playerCard => playerCard.reservedCards || []).flat());
                winningPlayerCards = getWinningPlayerCards(currentPlayersPlayCards);

                // Check if all remaining players have run out of cards
                if (currentPlayersPlayCards.length === 0) {
                    console.log("The game ends in a draw!");
                    return;
                }
            }

            if (winningPlayerCards.length === 1) {
                winningPlayerCards[0].player.addCards(potCards);
                // if (winningPlayerCards[0].reservedCards) {
                //     winningPlayerCards[0].player.addCards(winningPlayerCards[0].reservedCards);
                // }
            }
        }

        const winner = this.getWinner();
        if (winner) {
            console.log(`${winner} wins the game!`);
        }
    }

    getPlayerCardsWithReserveCards(players: Player[]): PlayerCard[] {
        const playerCards: PlayerCard[] = [];
        players.forEach(player => {
            if (player.cards.length === 1) {
                const playedCard = player.playCard();
                if (playedCard) {
                    playerCards.push({ player, card: playedCard, reservedCards: [] });
                }
            } else if (player.cards.length === 2) {
                const reservedCard = player.playCard();
                const playedCard = player.playCard();
                if (playedCard && reservedCard) {
                    playerCards.push({ player, card: playedCard, reservedCards: [reservedCard] });
                }
            } else if (player.cards.length > 2) {
                const reservedCards = player.cards.splice(0, 3);
                const playedCard = player.playCard();
                if (playedCard) {
                    playerCards.push({ player, card: playedCard, reservedCards });
                }
            }
        });
        return playerCards;
    }
}

const startWarGame = (noOfPlayers: number): void => {
    if (noOfPlayers < 2 || noOfPlayers > 52) {
        console.log("Invalid number of players. Please choose between 2 and 52 players.");
        return;
    }
    const game = new Game(noOfPlayers);
    game.play();
}

startWarGame(4); // Start a game with 4 players
