import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const container = ReactDOM.createRoot(document.getElementById('app-container'));
container.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
