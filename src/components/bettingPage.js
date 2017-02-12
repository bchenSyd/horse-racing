import React, { Component } from 'react'
import BetEngine from '../betting'
class BettingPage extends Component {

    constructor() {
        super()
        this.state = {
            price_list: '4.2,3.5,4.6,4.8',
            max_iteration: 20,
            debug_output: '',
            safe_bet_found: false,
            best_best: '',
            one_lose_best: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.startBetting = this.startBetting.bind(this)
    }
    handleChange(event) {
        const {target: {name, value}} = event
        if (name === 'max_iteration') {
            this.setState({
                max_iteration: parseInt(value)
            })
        } else {
            this.setState({
                price_list: value
            })
        }

    }
    parsePrice(priceStr) {
        const trimedStr = _.trimEnd(priceStr, ',')
        return trimedStr.split(',')
    }
    startBetting() {
        const {price_list, max_iteration} = this.state
        const parsed_price = this.parsePrice(price_list)
        const engine = new BetEngine()
        engine.setupBetting(parsed_price, 1) //starting from $1, increment by $1
        engine.startBetting(max_iteration)
        const [best_bet, one_lose] = engine.getBestBet()

        this.setState({
            debug_output: engine.debug_output,
            safe_bet_found: engine.safe_bet_found,
            best_best: JSON.stringify(best_bet),
            one_lose_best: JSON.stringify(one_lose)
        })
    }
    render() {
        const {price_list,
            max_iteration,
            debug_output,
            safe_bet_found,
            best_best,
            one_lose_best} = this.state
        return <div>
            <div>
                <label htmlFor='txt_prices' >input prices</label>
                <input name='txt_prices' style={{ width: '400px' }}
                    placeholder='use comma to sperate prices'
                    value={price_list}
                    onChange={this.handleChange} />
            </div>
            <div>
                <label htmlFor="max_iteration">max iteration</label>
                <input name='max_iteration'
                    style={{ marginLeft: '20px' }}
                    value={max_iteration}
                    onChange={this.handleChange} />
            </div>
            <div>
                <button onClick={this.startBetting}>Go</button>
            </div>
            {safe_bet_found && <div>
                <strong><span style={{ color: 'red' }} >need to jump out of the loop. got the bet!!</span></strong>
            </div>}
            <div style={{ marginTop: '20px' }}>
                <textarea rows='60' cols='200' value={debug_output} readOnly={true} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <textarea rows='2' cols='200' value={best_best} readOnly={true} />
            </div>
            <div style={{ marginTop: '20px' }}>
                <textarea rows='4' cols='200' value={one_lose_best} readOnly={true} />
            </div>
        </div >
    }

}

export default BettingPage