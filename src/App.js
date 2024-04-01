import {useEffect, useState} from "react";

function App() {
    //coin 정보 가져오기
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    useEffect(() => {
        fetch("https://api.coinpaprika.com/v1/tickers")
            .then((response) => response.json())
            .then((json) => {
                //console.log(json);
                setCoins(json);
                setLoading(false);
            });
    }, []);

    const [index, setIndex] = useState("xx");
    const onSelect = (event) =>{
        //console.log(event.target.value);//
        //console.log(event.target.key);//
        //console.log(event.target.selectedIndex);
        //console.log(coins[event.target.selectedIndex-1]);
        setIndex(event.target.value);
    };

    function Converter(prop) {
        console.log(prop.coin);
        //숫자 변수 생성
        const [amount, setAmount] = useState(0);
        const [result, setResult] = useState(0);
        const buyCoin = (event) => {
            //이벤트에서 input에 value 가져오기
            setAmount(event.target.value);
            setResult(event.target.value / prop.coin.quotes.USD.price);
        }
        return (
        <>
            <p>{prop.coin.name}({prop.coin.symbol}):${prop.coin.quotes.USD.price}</p>
        <label htmlFor="money">USD</label>
        <input id="money"
               placeholder="money USD"
               type="number"
               value={amount}
               onChange={buyCoin}
        />
            <h1>{result}개 살수 있다</h1>
        </>
        )
    }

    return (
        <div>
            <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>

            {loading ? <strong>Loading...</strong> : (
                <>
                    <select value={index} onChange={onSelect}>
                        <option key="xx" value="xx">select your coin</option>
                        {coins.map((coin, index) => {
                            //console.log(index);
                            return <option key={index} value={index}>{coin.name} ({coin.symbol}) :
                                ${coin.quotes.USD.price} USD</option>
                        })}
                    </select>
                    <hr/>
                    {index ==="xx" ? "Please select coin"
                        : <Converter coin={coins[index]}/>}
                </>
            )}
        </div>
    );
}

export default App;
