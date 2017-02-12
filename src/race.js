import {
    setupBetting,
    setupIteration,
    iteration,
    afterIteration,
    startBetting,
    getBestBet
} from './betting'


debugger
//const fixed_prices = [4.99,1.67,4.99] //20% -- 60% -- 20% => inflate by -0.04% => iteration #331, amt $334
const fixed_prices = [4.99,1.67,4.98] //20% -- 60% -- 20% => inflate by +0.00064% => no safe bet solution. best bet: iteration #96, amt $99, max_lose:$0.47, max_win:$0.8
const init_bet_amt = 1 // start from $1
setupBetting(fixed_prices, init_bet_amt)

var argvIndex = process.argv.indexOf('--total-bet')
//--total-bet 100
const totalBet = argvIndex !== -1 ? parseInt(process.argv[argvIndex + 1]) : 20

startBetting(totalBet)
const [best_bet, one_lose] = getBestBet()
console.log('-----------------------------------------------------')
console.log(`best bet ${JSON.stringify(best_bet)}
one lose: ${JSON.stringify(one_lose)}`)
console.log('-----------------------------------------------------')


