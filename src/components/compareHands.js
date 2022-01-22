export const compareHands = (player, opponent) => {
    switch(player) {
        case 'ROCK':
        switch(opponent) {
                case 'ROCK':
                    return 'draw';
                case 'PAPER':
                    return 'lost';
                case 'SCISSORS':
                    return 'won'
                default: return ''   
            }
        case 'PAPER':
            switch(opponent) {
                case 'ROCK':
                    return 'won';
                case 'PAPER':
                    return 'draw';
                case 'SCISSORS':
                    return 'lost';
                default: return ''
            }
        case 'SCISSORS':
            switch(opponent) {
                case 'ROCK':
                    return 'lost';
                case 'PAPER':
                    return 'won';
                case 'SCISSORS':
                    return 'draw';
                default: return ''
            }
        default: return ''
    }
}
