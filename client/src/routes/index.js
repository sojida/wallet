/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

/* -------------------------- Internal Dependencies ------------------------- */
import ErrorBoundary from '../components/ErrorBoundary';
// import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';

/* ---------------------------- Routes PropTypes ---------------------------- */
const propTypes = {
	location: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

const Routes = ({ location }) => (
	<>
		<ErrorBoundary>
			<TransitionGroup>
				<CSSTransition
					key={location.key}
					timeout={{ enter: 300, exit: 300 }}
					classNames="fade"
				>
					<Switch location={location}>
						{/* <Route exact path="/" component={Home} /> */}
						<Route
							exact
							path="/signup"
							component={Signup}
						/>
						<Route exact path="/login" component={Signin} />
						<Route exact path="/dashboard" component={Dashboard} />
				

						<Route component={NotFound} />
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</ErrorBoundary>
		<style>
			{`
			.fade-enter {
				opacity: 0.6;
			}

			.fade-enter.fade-enter-active {
				opacity: 1;
				transition: opacity 0.4s ease-in;
			}

			.fade-exit {
				opacity: 1;
			}

			.fade-exit.fade-exit-active {
				opacity: 0.6;
				transition: opacity 0.4s ease-in;
			}
			`}
		</style>
	</>
);

Routes.propTypes = propTypes;

export default withRouter(Routes);
