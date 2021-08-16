import React, { useState } from 'react';
import mountains from '../assets/Mountains.svg';
import Timekeeper from '../assets/Timekeeper.svg';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
//https://www.pinterest.com/pin/748371663070526195/visual-search/
//https://www.svgbackgrounds.com/#flat-mountains
const TestPage = () => {
	const [ progress, setProgress ] = React.useState(0);

	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress((oldProgress) => {
				if (oldProgress === 100) {
					return 0;
				}
				const diff = Math.random() * 10;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	function CircularProgressWithLabel(props) {
		return (
			<Box position="relative" display="inline-flex">
				<CircularProgress variant="determinate" {...props} />
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					justifyContent="center"
				>
					<Typography variant="caption" component="div" color="textSecondary">{`${Math.round(
						props.value
					)}%`}</Typography>
				</Box>
			</Box>
		);
	}

	return (
		<div
			style={{
				backgroundImage: `url(${mountains})`,
				width: '100vw',
				height: '100vh',
				display: 'flex',
				justifyContent: 'center'
			}}
		>
			<div className="child-1">
				<div className="c-1">
					<p className="name">YEWANDE LAWSON</p>
					<div className="c-c-1">
						<p>Total test: 20% completed</p>
						<LinearProgress variant="determinate" value={progress} />
					</div>
				</div>
				<hr className="hr" />

				<div className="c-2">
					<p>7 answers Left</p>
					<div className="time-progress">
						<p> TIME REMAINING </p>
						<CircularProgressWithLabel value={progress} />;
					</div>
				</div>

				<div className="quest-ans">
					<h3>
						Doodles are the fun, surprising, and sometimes spontaneous changes that are ... For them,
						creating doodles has become a group effort to enliven{' '}
					</h3>
					<FormControl component="fieldset" className="options" className="compo">
						<FormLabel component="legend">Gender</FormLabel>
						<RadioGroup
							aria-label="gender"
							className="fgroup"
							name="gender1"
							value={'value'}
							onChange={() => {}}
						>
							<FormControlLabel className="opt" value="female" control={<Radio />} label="Female" />
							<FormControlLabel className="opt" value="male" control={<Radio />} label="Male" />
							<FormControlLabel className="opt" value="other" control={<Radio />} label="Other" />
							<FormControlLabel className="opt" value="other" control={<Radio />} label="Other" />
						</RadioGroup>
					</FormControl>
					<div className='button-container'>
						<Button variant="contained"  color="">
							Previous Question
						</Button>
						<Button variant="contained"  color="">
							Next Question
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default TestPage;
