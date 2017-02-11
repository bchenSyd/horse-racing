import {
    setupBetting,
    setupIteration,
    iteration,
    afterIteration,
    startBetting,
    getBestBet
} from './betting'


debugger
//"market_rate":1.0000267094017092 => can't find a none-lose bet
const fixed_prices = [28.8,7,2.5,6.5,12.8,7.5,17.5] 

//below the bet with market rate closest to 1.0 (0.999988), and we still can find a none-lose bet
//const fixed_prices = [29.6,7,2.5,6.5,12.8,7.5,17.4]

const init_bet_amt = 0.5 // start from $0.5
setupBetting(fixed_prices, init_bet_amt)

var argvIndex = process.argv.indexOf('--total-bet')
//--total-bet 100
const totalBet = argvIndex !== -1 ? parseInt(process.argv[argvIndex + 1]) : 20

startBetting(totalBet)
console.log('-----------------------------------------------------')
console.log(`best bet ${JSON.stringify(getBestBet())}`)
console.log('-----------------------------------------------------')


