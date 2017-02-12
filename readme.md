http://horse-racing.azurewebsites.net/

//below the bet with market rate closest to 1.0 (0.999988), and we still can find a none-lose bet
const fixed_prices = [29.6,7,2.5,6.5,12.8,7.5,17.4]
{
  "iteration": 1260,
  "total_bet_amt": 633.5,
  "win": [
    {
      "horse_num": 1,
      "odds": 29.6,
      "bet_amt": 21.5,
      "potential_win_amt": 2.9
    },
    {
      "horse_num": 2,
      "odds": 7,
      "bet_amt": 90.5,
      "potential_win_amt": 0
    },
    {
      "horse_num": 3,
      "odds": 2.5,
      "bet_amt": 253.5,
      "potential_win_amt": 0.25
    },
    {
      "horse_num": 4,
      "odds": 6.5,
      "bet_amt": 97.5,
      "potential_win_amt": 0.25
    },
    {
      "horse_num": 5,
      "odds": 12.8,
      "bet_amt": 49.5,
      "potential_win_amt": 0.1
    },
    {
      "horse_num": 6,
      "odds": 7.5,
      "bet_amt": 84.5,
      "potential_win_amt": 0.25
    },
    {
      "horse_num": 7,
      "odds": 17.4,
      "bet_amt": 36.5,
      "potentinal_win_amt": 1.6
    }
  ],
  "lose": [],
  "summary": "win 7 -- lose 0",
  "market_rate": 0.99941667818823
}

//once "market_rate exceeds 1.0 (e.g. below is 1.0000267094017092) you can't find a none-lose bet anymore
const fixed_prices = [28.8,7,2.5,6.5,12.8,7.5,17.5] 
{
  "iteration": 825,
  "total_bet_amt": 416,
  "win": [
    {
      "horse_num": 1,
      "odds": 28.8,
      "bet_amt": 14.5,
      "potential_win_amt": 1.6
    },
    {
      "horse_num": 2,
      "odds": 7,
      "bet_amt": 59.5,
      "potentia\nl_win_amt": 0.5
    },
    {
      "horse_num": 4,
      "odds": 6.5,
      "bet_amt": 64,
      "potential_win_amt": 0
    },
    {
      "horse_num": 5,
      "odds": 12.8,
      "bet_amt": 32.5,
      "potential_win_amt": 0
    },
    {
      "horse_num": 6,
      "odds": 7.5,
      "bet_amt": 55.5,
      "potential_win_amt": 0.25
    },
    {
      "horse_num": 7,
      "odds": 17.5,
      "bet_amt": 24,
      "potential_win_amt": 4
    }
  ],
  "lose": [
    {
      "horse_num": 3,
      "odds": 2.5,
      "bet_amt": 166,
      "potential_win\n_amt": -1
    }
  ],
  "max_lose_by": 3,
  "max_lose_amt": 1,
  "summary": "win 6 -- lose 1",
  "market_rate": 1.0000267094017092
}
it's worth mentioning that it's called best bet but it's NOT a good bet.
if you bet $416, best case you win $4, worst case you lose $1 => then don't you put $1 on the horses that are most likely to win?