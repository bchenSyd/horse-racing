import _ from 'lodash'
import { getMaxVal, toFixed } from './lib'

const fixed_prices = [3.1, 12, 2.1, 5.5, 6.5, 41]

const bet_slip = [
    {
        odd: 3.1,
        amt: 0.5
    },
    {
        odd: 12,
        amt: 0.5
    },
    {
        odd: 2.1,
        amt: 0.5
    },
    {
        odd: 5.5,
        amt: 0.5
    },
    {
        odd: 6.5,
        amt: 0.5
    },
    {
        odd: 41,
        amt: 0.5
    }
]

const max_lose = {
    iteration: 0,
    total_bet_amt: undefined,
    by: undefined,
    amt: undefined
}


function getTotalBetAmtForIteration() {
    return _.reduce(bet_slip, (acc, val) => {
        return acc + val.amt
    }, 0)
}

function setupIteration(iternation) {
    max_lose.iteration = iternation;
    max_lose.total_bet_amt = getTotalBetAmtForIteration();
    max_lose.by = undefined;
    max_lose.amt = undefined;
}

function iteration() {
    //iteratee is invoked with four arguments (accumulator, value, index|key, collection).
    const result = _(bet_slip).reduce((acc, val, index) => {
        const iter_payout = toFixed(val.odd * val.amt)
        const iter_amt = acc.total_bet_amt - iter_payout
        const maxLoseAmt = getMaxVal(acc.amt, iter_amt)
        console.log(`payout: ${iter_payout} - total_bet:${acc.total_bet_amt}  = lose amt: ${iter_amt}`)
        //console.log(`index ${index}  (getMax(current_lose_amt:${iter_amt} , acc_lose_amt:${max_lose.amt}) ==>  returns:${maxLoseAmt}`)
        if (maxLoseAmt !== max_lose.amt) {
            acc.amt = maxLoseAmt;
            acc.by = index;
        }
        return acc
    }, max_lose)

    console.log(`bet iteration ${max_lose.iteration} result: ${JSON.stringify(result)}`)
}


function afterIteration() {
    let shouldContinue = true;
    if (max_lose.amt <= 0) {
        console.log('need to jump out of the loop. got the bet!!!!')
        shouldContinue = false;
    }

    const index = max_lose.by
    bet_slip[index].amt += 0.5
    return shouldContinue
}

debugger

for (var i= 1; i < 10;i++){
    setupIteration(i)
    iteration()
    if(!afterIteration()){
        break;
    }
}



