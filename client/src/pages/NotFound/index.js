import React from 'react';
import { Link } from 'react-router-dom';


// images
const NotFound = () => {
	return (
		<div className="not-found-layout">
			<div className="not-found-content">
				Page Not Found
			</div>
			<style jsx="true">
				{`
					.not-found-layout {
						display: grid;
						place-items: center;
						padding: 10% 5% 0;
					}

					.thumbs-down {
						display: grid;
						place-items: center;
						margin: 20px 0;
						height: 100px;
					}

					.thumbs-down-img {
						height: 100px;
					}

					.link-to-login {
						text-decoration: none;
					}

					.success-text {
						margin: 30px 0;
					}

					.coin-logo {
						display: grid;
						place-items: center;
					}
				`}
			</style>
		</div>
	);
};

export default NotFound;
