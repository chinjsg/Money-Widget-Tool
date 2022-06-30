import {useState} from "react"

export default function TipCalculator() {
    const [billAmount, setBillAmount] = useState(0)
    const [tipPercentage, setTipPercentage] = useState(0.15)
    const [tipAmount, setTipAmount] = useState(0)
    const [taxAmount, setTaxAmount] = useState(0)
    const [isCustom, setIsCustom] = useState(false)
    const [buttonState, setButtonState] = useState({
        btn15: true,
        btn18: false,
        btn20: false,
        btn22: false,
        btnCus: false
    })

    function handleTipButtonClick(event) {
        const {value, name} = event.target

        setButtonState(prevState => {
            for (const btn in prevState) {
                prevState[btn] = false
            }
            return {
                ...prevState,
                [name]: true
            }
        })

        if (name === "btnCus") {
            setIsCustom(true)
        } else {
            setIsCustom(false)
            setTipAmount(0)
            setTipPercentage(parseFloat(value))
        }
    }

    const percentages = [15, 18, 20, 22]
    const buttonElements = percentages.map(percent => {
        const name = "btn" + percent
        const style = buttonState[name] ? "button-selected" : "button-default"
        
        return (
            <button 
                type="button" 
                key={percent} 
                className={style} 
                name={name} 
                value={percent/100}
                onClick={handleTipButtonClick}
            >
            {percent}%
            </button>
        )
    })
    
    function handleBillChange(event) {
        const {value} = event.target
        setBillAmount(value === "" ? 0 : parseFloat(value))
    }

    function handleCustomTipChange(event) {
        const {value} = event.target
        setTipAmount(value === "" ? 0 : parseFloat(value))
    }

    function handleTaxChange(event) {
        const {value} = event.target
        setTaxAmount(value === "" ? 0 : parseFloat(value))
    }
    
    let total, tipTotal
    if (!isCustom) {
        tipTotal = billAmount * tipPercentage
        total = (billAmount * (1 + tipPercentage)) + taxAmount
    } else {
        tipTotal = tipAmount
        total = billAmount + tipTotal + taxAmount
    }

    let customTipPercentage = 0
    if (isCustom && billAmount > 0) {
        customTipPercentage = (tipAmount/billAmount) * 100
        if (!Number.isInteger(customTipPercentage)) {
            customTipPercentage = customTipPercentage.toFixed(1)
        }
    }

    return (
        <div className="widget">
            <h1 className="title">Tip Calculator</h1>
            <div className="bill">
                <input 
                    type="number"
                    className="bill-input"
                    placeholder="Bill Total (bef. tax)"
                    value={billAmount === 0 ? "" : billAmount}
                    onChange={handleBillChange} 
                />
                {buttonElements}

                <button 
                    type="button" 
                    className={`${buttonState["btnCus"] ? "button-selected" : "button-default"} button-custom`}
                    name="btnCus" 
                    onClick={handleTipButtonClick}
                >
                Custom
                </button>

                <input type="number" className="tip-input" value={tipAmount === 0 ? "" : tipAmount} onChange={handleCustomTipChange} disabled={isCustom && billAmount > 0 ? false : true} placeholder="Exact Amount"/>
            </div>

            <div className="tip-summary">
                <h3>Summary</h3>
                <p>
                    Tax : <input type="number" className="tax-input" placeholder="$" value={taxAmount === 0 ? "" : taxAmount} onChange={handleTaxChange} />
                </p>
                <p>Tip ({isCustom ? customTipPercentage : tipPercentage*100}%): <span><input type="text" className="summary-input" value={`${isNaN(tipTotal) ? "0.00" : tipTotal.toFixed(2)}`} disabled/></span></p>
                <p>Total : <span><input type="text" className="summary-input" value={`$${isNaN(total) ? "0.00" : total.toFixed(2)}`} disabled/></span></p>
            </div>
        </div>
    )
}