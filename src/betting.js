import _ from 'lodash'
import { getMaxVal } from './utils'
let bet_slip
let bet_results = []
let best_bet
let one_lose = []
function setupBetting(priceList, init_bet_amt) {
    bet_slip = priceList.map(p => ({
        odds: p,
        amt: init_bet_amt
    }))
}
function setupIteration(index) {
    const total_bet_amt = _.reduce(bet_slip, (acc, val) => {
        return acc + val.amt
    }, 0)
    const bet_result = {
        iteration: index,
        total_bet_amt,
        win: [],
        lose: [],
        max_lose_by: undefined,
        max_lose_amt: undefined,
        max_lose_ratio:undefined
    }
    bet_results.push(bet_result)
    return bet_result
}

function iteration(bet_result) {
    //iteratee is invoked with four arguments (accumulator, value, index|key, collection).
    bet_result = _(bet_slip).reduce((acc, val, index) => {
        const iter_payout = val.odds * val.amt
        const iter_amt = parseFloat((iter_payout - acc.total_bet_amt).toFixed(2))

        //put horse into busket
        const result_busket = iter_amt >= 0 ? acc.win : acc.lose
        result_busket.push({ horse_num: index + 1, odds: val.odds, bet_amt: val.amt, potential_win_amt: iter_amt })

        if (iter_amt < 0) { //lose bet, need to adjust max_lose_amt
            //re-calculate the max lose amount;
            //need to adjust bet amount for the horse that cause max lose amount
            const maxLoseAmt = getMaxVal(acc.max_lose_amt, iter_amt * -1)
            //console.log(`horse#${index}  (getMax(current_lose_amt:${iter_amt} , acc_lose_amt:${acc.amt}) ==>  returns:${maxLoseAmt}`)
            if (maxLoseAmt !== acc.max_lose_amt) {
                acc.max_lose_amt = maxLoseAmt;
                acc.max_lose_ratio = parseFloat((maxLoseAmt / acc.total_bet_amt).toFixed(2))
                acc.max_lose_by = index + 1;
            }
        }
        return acc
    }, bet_result)
    bet_result.summary = `win ${bet_result.win.length} -- lose ${bet_result.lose.length}`
    console.log(`bet result: ${JSON.stringify(bet_result)}`)
}


function afterIteration(bet_result) {
    if (!bet_result.max_lose_amt) {
        best_bet = bet_result
        console.log('need to jump out of the loop. got the bet!!!!')
        return false;
    }

    const index = bet_result.max_lose_by - 1 //zero-indexed
    bet_slip[index].amt += 0.5

    best_bet = isBestBet(bet_result) ? bet_result : best_bet
    if(bet_result.lose.length === 1){
        one_lose.push({
            iteration:bet_result.iteration,
            horse_num:bet_result.max_lose_by,
            lose_amt: bet_result.max_lose_amt,
            lose_ratio:bet_result.max_lose_ratio
        })
    }
    return true
}

function isBestBet(bet_result) {
    if (!best_bet || bet_result.win.length > best_bet.win.length) {
        return true
    }

    if (bet_result.win.length < best_bet.win.length) {
        return false
    }

    //bet_result.win.length == best_bet.win.length
    return bet_result.max_lose_ratio < best_bet.max_lose_ratio

}

function startBetting(totalBet = 20) {
    for (var i = 0; i < totalBet; i++) {
        var bet_result = setupIteration(i)
        iteration(bet_result)
        if (!afterIteration(bet_result)) {
            break;
        }
    }
}

function getBestBet() {
    const market_rate = _(bet_slip).reduce((acc,val,index)=>{
        return acc + 1/val.odds
    },0)
    return [{...best_bet, market_rate},{total: one_lose.length, one_lose}]
}

export {
    setupBetting,
    setupIteration,
    iteration,
    afterIteration,
    startBetting,
    getBestBet
}