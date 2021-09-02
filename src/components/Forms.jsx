import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Alert from '@material-ui/lab/Alert';
// import { v2 as cloudinary, UploadApiResponse } from 'cloudinary'

import { LOCAL_BASE_URL, REMOTE_BASE_URL } from '../utility/constants'


import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const axios = require('axios');

const Forms = () => {

  const [subject, setSubject] = useState('')
  const [question, setQuestion] = useState('')
  const [option1, setOption1] = useState('')
  const [option2, setOption2] = useState('')
  const [option3, setOption3] = useState('')
  const [option4, setOption4] = useState('')
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setisSuccess] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const [value, setValue] = React.useState('waec');
  const [isImage, setIsImage] = React.useState('no');

  const [file, setFile] = useState("")


  const handleChange = (e) => {
    setSubject(e.target.value)
  }
  const handleRadioChange = (e) => {
    setValue(e.target.value)
  }
  const handleRadioChangeImage = (e) => {
    console.log(e.target)
    setIsImage(e.target.value)
  }
  const handleSubmit = async () => {

    if (isImage === 'yes' && file) {

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'fqczec5i')
      axios.post('https://api.cloudinary.com/v1_1/dv4lewpt0/image/upload', formData)
        .then(response => {

          let imageUrl = response.data.secure_url

          setSubmitted(true)
          let data = {
            subject,
            options: [option1, option2, option3, option4],
            correctOption: answer,
            question,
            exam_type: value,
            image: imageUrl
          }
          setFile(null);
          
          if (option1.length === 0 || option2.length === 0 || option3.length === 0 || option4.length === 0 ||
            answer.length === 0 || question.length === 0 || subject.length === 0) {
            setIsError(true)
          } else {


            axios.post(`${REMOTE_BASE_URL}/create`, data)
              .then(data => {
                setSuccessMsg("Question and answers posted successfully ")
                setisSuccess(true)
                setIsError(false)
                setSubmitted(false)
                setSubject('')
                setQuestion('')
                setAnswer('')
                setOption1('')
                setOption2('')
                setOption3('')
                setOption4('')
                alert("Question created")
              }).catch(err => {
                setErrorMsg("Error posting questions and answers")
                setisSuccess(false)
                setIsError(true)
                console.log('ERR: ', err)
              })
          }



        }).catch(err => {
          console.log(err)
        })
    } else {

      setSubmitted(true)
      let data = {
        subject,
        options: [option1, option2, option3, option4],
        correctOption: answer,
        question,
        exam_type: value
      }


      if (option1.length === 0 || option2.length === 0 || option3.length === 0 || option4.length === 0 ||
        answer.length === 0 || question.length === 0 || subject.length === 0) {
        setIsError(true)
      } else {


        axios.post(`${REMOTE_BASE_URL}/create`, data)
          .then(data => {
            setSuccessMsg("Question and answers posted successfully ")
            setisSuccess(true)
            setIsError(false)
            setSubmitted(false)
            setSubject('')
            setQuestion('')
            setAnswer('')
            setOption1('')
            setOption2('')
            setOption3('')
            setOption4('')
            alert("Question created")
          }).catch(err => {
            setErrorMsg("Error posting questions and answers")
            setisSuccess(false)
            setIsError(true)
            console.log('ERR: ', err)
          })
      }


    }




  }


  const handleImageChange = (e) => {
    console.log('[]:', e.target.files[0])
    setFile(e.target.files[0])

    //  if(file){



    //  cloudinary.config({
    //   cloud_name: 'dv4lewpt0',
    //   // cloud_name: process.env.CLOUDINARY_NAME,
    //   api_key:'565372365571999',
    //   api_secret: 's05Cx2lJfB2_0zAehc4pZvAWkSw',
    //   shorten: true,
    //   secure: true,
    //   ssl_detected: true
    // })

    //     // filename = req.file.path from multer
    // cloudinary.uploader
    //   .upload(file, { async: true, unique_filename: true, quality_analysis: true })
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    // }
  }


  return (
    <div className="form-parent">

      {
        isSuccess && successMsg && (
          <Alert variant="outlined" severity="success">
            {successMsg}
          </Alert>
        )
      }
      {
        isError && errorMsg && (<Alert variant="outlined" severity="error">
          {errorMsg}
        </Alert>)
      }


      <FormControl variant="filled"
        className={submitted && subject.length === 0 ? "error" : "textfield"}
      >
        <InputLabel id="demo-simple-select-filled-label">Subject</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={subject}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={'english'}>English</MenuItem>
          <MenuItem value={'mathematics'}>Mathematics</MenuItem>
          <MenuItem value={'biology'}>Biology</MenuItem>
          <MenuItem value={'physics'}>Physics</MenuItem>
          <MenuItem value={'chemistry'}>Chemistry</MenuItem>
          <MenuItem value={'literature'}>Literature</MenuItem>
          <MenuItem value={'economics'}>Economics</MenuItem>
          <MenuItem value={'government'}>Government</MenuItem>
          <MenuItem value={'commerce'}>Commerce</MenuItem>
          <MenuItem value={'accounting'}>Accounting</MenuItem>
          <MenuItem value={'crs'}>CRS</MenuItem>
        </Select>

      </FormControl>
      <FormControl component="fieldset">
        <FormLabel component="legend">Select Exam type</FormLabel>
        <RadioGroup aria-label="subject" name="subject1" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="waec" control={<Radio />} label="WAEC" />
          <FormControlLabel value="jamb" control={<Radio />} label="JAMB" />
        </RadioGroup>
      </FormControl>

      <hr />
      <FormControl component="fieldset">
        <FormLabel component="legend">Is there Image ?</FormLabel>
        <RadioGroup aria-label="image" name="image" value={isImage} onChange={handleRadioChangeImage}>
          <FormControlLabel value="no" control={<Radio />} label="No" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
        </RadioGroup>

        {
          isImage === "yes" ? (
            <>
              <input type="file" onChange={handleImageChange} />
              <img src={file ? URL.createObjectURL(file) : null} style={{ width: '200px', height: "200px", marginTop: '20px', marginBottom: '20px' }} />
            </>
          ) : null
        }

      </FormControl>
      <hr />

      { submitted && isError === true ? (<p>All fields highlighted in red are required</p>) : null}
      <TextField
        id="outlined-multiline-static"
        label="Question"
        multiline
        rows={4}
        value={question}
        defaultValue=""
        helperText="These are options for the questions"
        variant="outlined"
        className={submitted && question.length === 0 ? "error" : "textfield"}
        onChange={e => setQuestion(e.target.value)}
      />

      <TextField
        id="outlined-helperText"
        label="Option 1"
        value={option1}
        variant="outlined"
        className={submitted && option1.length === 0 ? "error" : "textfield"}
        onChange={e => setOption1(e.target.value)}
      />

      <TextField
        id="outlined-helperText"
        label="Option 2"
        value={option2}
        variant="outlined"
        className={submitted && option2.length === 0 ? "error" : "textfield"}
        onChange={e => setOption2(e.target.value)}
      />
      <TextField
        id="outlined-helperText"
        label="Option 3"
        value={option3}
        variant="outlined"
        className={submitted && option3.length === 0 ? "error" : "textfield"}
        onChange={e => setOption3(e.target.value)}
      />
      <TextField
        id="outlined-helperText"
        label="Option 4"
        value={option4}
        variant="outlined"
        className={submitted && option4.length === 0 ? "error" : "textfield"}
        onChange={e => setOption4(e.target.value)}
      />
      <TextField
        id="outlined-helperText"
        label="Answer"
        value={answer}
        variant="outlined"
        className={submitted && answer.length === 0 ? "error" : "textfield"}
        onChange={e => setAnswer(e.target.value)}
      />
      <Button variant="contained" color="primary"
        className="submit"
        onClick={handleSubmit}>
        Save
      </Button>

    </div>
  )
}
export default Forms;