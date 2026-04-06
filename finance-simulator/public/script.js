async function simulate() {
    const current_balance = Number(document.getElementById('balance').value);
    const credit_limit = Number(document.getElementById('limit').value);
    const type = document.getElementById('actionType').value;
    const amount = Number(document.getElementById('amount').value);

    const response = await fetch('/simulate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            current_balance,
            credit_limit,
            action: {
                type,
                amount
            }
        })
    });

    const data = await response.json();

    document.getElementById('result').innerHTML =
        `New Balance: ${data.new_balance} <br>
         Utilization: ${data.new_utilization} <br>
         Risk: ${data.risk} <br>
         Interest Impact: ${data.interest_impact}`;
}