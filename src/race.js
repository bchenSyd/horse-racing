import BetEngine from './betting'


debugger
//const fixed_prices = [4.99,1.67,4.99] //20% -- 60% -- 20% => inflate by -0.04% => iteration #331, amt $334
//const fixed_prices = [4.99,1.67,4.98] //20% -- 60% -- 20% => inflate by +0.00064% => no safe bet solution. best bet: iteration #96, amt $99, max_lose:$0.47, max_win:$0.8
const fixed_prices = [4.2,3.5,4.6,4.8]
const init_bet_amt = 0.5 // start from $1
const engine = new BetEngine()
engine.setupBetting(fixed_prices, init_bet_amt)

var argvIndex = process.argv.indexOf('--total-bet')
//--total-bet 100
const totalBet = argvIndex !== -1 ? parseInt(process.argv[argvIndex + 1]) : 20

engine.startBetting(totalBet)
const [best_bet, one_lose] = engine.getBestBet()
console.log('-----------------------------------------------------')
console.log(`best bet ${JSON.stringify(best_bet)}
one lose: ${JSON.stringify(one_lose)}`)
console.log('-----------------------------------------------------')


