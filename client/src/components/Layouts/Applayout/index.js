import React from 'react';
import { withRouter } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

export const TopNav = ({ logout, auth }) => {
	return (
		<div className="topnav-container">
		 <div className="topnav">
			<h1>Walletly</h1>
			{auth ? null :  <Button onClick={logout}>Logout</Button>}
		 </div>
		 <style jsx="true">
				{`
					.topnav {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 0 50px;
					}

					.topnav-container {
						background: lightgreen;
						align-content: center;
						height: 100px;
						padding-top: 25px;
					}
				`}
			</style>
		</div>
	)
}


const AppLayout = ({ children, history }) => {
	const logout = () => {
		localStorage.clear();
		history.push('/');
	}
	return (
		<div className="app-layout">
			<div className="app-layout-topnav">
				<TopNav logout={logout} />
			</div>
			<div className="app-layout-body">{children}</div>
			<style jsx="true">
				{`
					.app-layout {
						display: grid;
						font-family: 'Source Sans Pro', sans-serif;
					}

					.app-layout-topnav {
						grid-column: 2/-1;
						height: 100px;
						border-bottom: 2px solid #fafafc;
					}

					.topnav {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin: 0 50px;
					}

					.app-layout-body {
						grid-column: 2/-1;
						height: 100%;
						overflow: scroll;
						padding: 20px 30px;
					}

				`}
			</style>
		</div>
	);
};

export default React.memo(withRouter(AppLayout));
