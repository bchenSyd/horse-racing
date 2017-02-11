import {
    setupBetting,
    setupIteration,
    iteration,
    afterIteration,
    startBetting,
    getBestBet
} from './betting'


debugger
const fixed_prices = [4.1, 12, 4.1, 5.5, 6.5, 41]
const init_bet_amt = 0.5 // start from $0.5
setupBetting(fixed_prices, init_bet_amt)

var argvIndex = process.argv.indexOf('--total-bet')
//--total-bet 100
const totalBet = argvIndex !== -1 ? parseInt(process.argv[argvIndex + 1]) : 20

startBetting(totalBet)
console.log('-----------------------------------------------------')
console.log(`best bet ${JSON.stringify(getBestBet())}`)
console.log('-----------------------------------------------------')


