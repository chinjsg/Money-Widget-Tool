export default function TipCalculator() {
    return (
        <div className="widget">
            <h1 className="title">Tip Calculator</h1>
            <div  className="bill-amount">
                <input type="number" className="tip-input" placeholder="Bill Total (bef. tax)" />
            </div>
            <div className="tip-percentage">
                <button type="button" className="button-default">15%</button>
                <button type="button" className="button-default">18%</button>
                <button type="button" className="button-selected">20%</button>
                <button type="button" className="button-default">22%</button>
                <button type="button" className="button-default button-custom">Custom</button>
                <input type="number" className="tip-input-custom" />
            </div>

            <div className="tip-summary">
                <h3>Summary</h3>
                <p>
                    Tax : <input type="number" className="tax-input" placeholder="$"/>
                </p>
                <p>Tip : <span>$5.10</span></p>
                <p>Total : <span>$455.10</span></p>
            </div>
        </div>
    )
}