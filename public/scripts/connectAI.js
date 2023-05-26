document.querySelector('#ask-form').addEventListener('submit', async (e) => {
	e.preventDefault();
	const question = document.querySelector('#question-input').value;
	const response = await fetch('/ask', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ question }),
	});
	const data = await response.json();
	document.querySelector('#answer-display').textContent = data.answer;
});
