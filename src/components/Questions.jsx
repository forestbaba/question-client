import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { LOCAL_BASE_URL, REMOTE_BASE_URL } from '../utility/constants';
import moment from 'moment';



const Questions = () => {
	const [ questions, setQuestions ] = useState([]);
	const [ open, setOpen ] = React.useState(false);
	const [ qid, setQid ] = React.useState('');

	useEffect(() => {
		console.log('RRR');

		axios
			.get(`${REMOTE_BASE_URL}/fetchLastTen`)
			.then((data) => {
				console.log(data.data);
				setQuestions(data.data.questions);
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	}, []);

	const handleClickOpen = (id) => {
		console.log('===id: ', id);
		setOpen(true);
		setQid(id);
	};

	const handleClose = () => {
		setOpen(false);
	};
	const handleAgree = () => {
		setOpen(false);
		axios
			.delete(`${REMOTE_BASE_URL}/delete/${qid}`)
			.then((data) => {
				window.location.reload();

				alert('Question deleted');
			})
			.catch((err) => {
				console.log('ERR: ', err);
			});
	};

	const handleDelete = () => {};

	return (
		<div className="questions">
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{'Delete question'}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Confirmt that you want to delete this question
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						Disagree
					</Button>
					<Button onClick={handleAgree} color="primary" autoFocus>
						Agree
					</Button>
				</DialogActions>
			</Dialog>
			{questions.length > 0 &&
				questions.map((item, index) => {
					const dater = new Date();
					const d1 = moment(dater);
					const d12 = moment(item.date_created);

					console.log('YYY', item.date_created);
					console.log('YY*******YY', d12);

					const diffDays = d1.diff(d12, 'days');
					console.log('YY*******YY', diffDays);

					return (
						<div className="question-container" key={index}>
							<p className="question">{item.question}</p>
							{item.options.map((item, index) => {
								return (
									<p key={index}>
										{index === 0 ? (
											'A. '
										) : index === 1 ? (
											'B. '
										) : index === 2 ? (
											'C. '
										) : index === 3 ? (
											'D. '
										) : null}{' '}
										{item}
									</p>
								);
							})}
							<p className="answer">Answer: {item.correct_option}</p>
							<hr />
              {
                  diffDays >= 7 ? null :(
                    	<Button
								variant="contained"
								color="secondary"
								onClick={() => handleClickOpen(item._id)}
								startIcon={<DeleteIcon />}
							>
								Delete
							</Button>
                  )
              }

						
						</div>
					);
				})}
		</div>
	);
};
export default Questions;
