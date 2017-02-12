import _ from 'lodash'
import { getMaxVal } from './utils'
class bet_engine {
    constructor() {
        this.bet_slip = undefined
        this.bet_results = []
        this.best_bet = undefined
        this.one_lose = []
        this.price_facto = undefined
        this.debug_output = ''
        this.safe_bet_found =false
    }

    setupBetting(priceList, init_bet_amt) {
        this.price_facto = init_bet_amt
        this.bet_slip = priceList.map(p => ({
            odds: p,
            amt: this.price_facto
        }))
    }
    setupIteration(index) {
        const total_bet_amt = _.reduce(this.bet_slip, (acc, val) => {
            return acc + val.amt
        }, 0)
        //setup a new bet_result
        const bet_result = {
            iteration: index,
            total_bet_amt,
            win: [],
            lose: [],
            max_lose_by: undefined,
            max_lose_amt: undefined,
            max_lose_ratio: undefined
        }
        this.bet_results.push(bet_result)
        return bet_result
    }

    //mutate bet_result
    iteration(bet_result) {
        //iteratee is invoked with four arguments (accumulator, value, index|key, collection).
        bet_result = _(this.bet_slip).reduce((acc, val, index) => {
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
        this.debug_output += `${JSON.stringify(bet_result)} \n`
    }


    afterIteration(bet_result) {
        if (!bet_result.max_lose_amt) {
            this.best_bet = bet_result
            this.safe_bet_found = true
            console.log('need to jump out of the loop. got the bet!!!!')
            return false;
        }

        const index = bet_result.max_lose_by - 1 //zero-indexed
        this.bet_slip[index].amt += this.price_facto

        this.best_bet = this.isBestBet(bet_result) ? bet_result : this.best_bet
        if (bet_result.lose.length === 1) {
            this.one_lose.push({
                iteration: bet_result.iteration,
                horse_num: bet_result.max_lose_by,
                lose_amt: bet_result.max_lose_amt,
                lose_ratio: bet_result.max_lose_ratio
            })
        }
        return true
    }

    isBestBet(bet_result) {
        if (!this.best_bet || bet_result.win.length > this.best_bet.win.length) {
            return true
        }

        if (bet_result.win.length < this.best_bet.win.length) {
            return false
        }

        //bet_result.win.length == best_bet.win.length
        return bet_result.max_lose_ratio < this.best_bet.max_lose_ratio

    }

    startBetting(totalBet = 20) {
        for (var i = 0; i < totalBet; i++) {
            var bet_result = this.setupIteration(i)
            this.iteration(bet_result)
            if (!this.afterIteration(bet_result)) {
                break;
            }
        }
    }

    getBestBet() {
        const market_rate = _(this.bet_slip).reduce((acc, val, index) => {
            return acc + 1 / val.odds
        }, 0)
        return [{
            ...this.best_bet,
            market_rate
        },
        {
            total: this.one_lose.length,
            one_lose: this.one_lose
        }]
    }
}

export default bet_engine
