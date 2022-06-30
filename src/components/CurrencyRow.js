export default function CurrencyRow(props) {
    const {options, selected, amount, onChangeAmount, onChangeCurrency} = props

    const optionsDropdown = options.map(option => 
        <option key={option} value={option}>{option}</option>
    )

    return (
        <div className="currency-row">
            <input type="number" className="currency-input" value={amount === undefined ? 0 : amount} onChange={onChangeAmount}/>
            <select className="currency-select" value={selected} onChange={onChangeCurrency}>
                {optionsDropdown}
            </select>
        </div>
    )
}