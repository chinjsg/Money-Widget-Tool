import {useState, useEffect} from "react"
import CurrencyRow from "./CurrencyRow"

const base_url = "https://api.exchangerate.host/latest"
const default_from_currency = 'USD'
const default_to_currency = 'SGD'

export default function CurrencyConverter() {
    const [currencyOptions, setCurrencyOptions] = useState([])
    const [fromCurrency, setFromCurrency] = useState()
    const [toCurrency, setToCurrency] = useState()
    const [amountToConvert, setAmountToConvert] = useState(1)
    const [reverse, setReverse] = useState(false)
    const [exchangeRate, setExchangeRate] = useState(0)

    let fromAmount, toAmount
    if (reverse) {
        toAmount = amountToConvert
        fromAmount = amountToConvert / exchangeRate
    } else {
        fromAmount = amountToConvert
        toAmount = amountToConvert * exchangeRate
    }


    useEffect(() => {
        fetch(`${base_url}?base=${default_from_currency}`)
            .then(res => res.json())
            .then(data => {
                setCurrencyOptions([...Object.keys(data.rates)])
                setFromCurrency(data.base)
                setToCurrency(default_to_currency)
                setExchangeRate(data.rates[default_to_currency])
                // setToCurrency(Object.keys(data.rates)[0])
                // setExchangeRate(data.rates[Object.keys(data.rates)[0]]) 
            })
    }, [])

    useEffect(() => {
        if (fromCurrency && toCurrency) {
            fetch(`${base_url}?base=${fromCurrency}&symbols=${toCurrency}`)
            .then(res => res.json())
            .then(data => {
                setExchangeRate(data.rates[toCurrency])
            })
        }
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(event) {
        setReverse(false)
        setAmountToConvert(event.target.value)
    }

    function handleToAmountChange(event) {
        setReverse(true)
        setAmountToConvert(event.target.value)
    }

    return (
        <div className="widget">
        <h1 className="title">Convert</h1>
            <CurrencyRow 
                options={currencyOptions}
                selected={fromCurrency}
                amount={fromAmount}
                onChangeAmount={handleFromAmountChange}
                onChangeCurrency={event => setFromCurrency(event.target.value)}
            />

            <div className="equals">=</div>
            
            <CurrencyRow
                options={currencyOptions}
                selected={toCurrency}
                amount={toAmount}
                onChangeAmount={handleToAmountChange}
                onChangeCurrency={event => setToCurrency(event.target.value)}
            />
        </div>
    )
}