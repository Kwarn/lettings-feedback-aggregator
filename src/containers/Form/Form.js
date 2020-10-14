import React, { useState } from 'react'
import axios from '../../shared/axios-feedback'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import classes from './Form.module.css'

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxHeight: 50,
  },
}))

const Form = ({ toggleShouldUpdateCallback }) => {
  const styles = useStyles()
  const [error, setError] = useState('')
  const [formInputs, setFormInputs] = useState({
    viewingDate: '',
    location: '',
    flatNumber: '',
    applicantName: '',
    reason: '',
    notes: '',
  })

  const locations = [
    { poplar: 'Poplar' },
    { canningTown: 'Canning Town' },
    { epsom: 'Epsom' },
    { lewisham: 'Lewisham' },
    { walthamstow: 'Walthamstow' },
    { hayes: 'Hayes' },
    { stepneyGreen: 'Stepney Green' },
  ]

  const locationMenuItems = locations.map(l => {
    const key = Object.keys(l)[0]
    return <MenuItem key={key} value={l[key]}>{`${l[key]}`}</MenuItem>
  })


  function clearFields() {
    setFormInputs({
      viewingDate: '',
      location: '',
      flatNumber: '',
      applicantName: '',
      reason: '',
      notes: '',
    })
  }

  function createTally() {

  }

  function submitForm() {
    let isFormValid = true
    for (let input in formInputs) {
      if (input === 'notes') continue
      else isFormValid = formInputs[input].trim() && isFormValid
    }
    if (!isFormValid) {
      setError(<h1>Please fill out form</h1>)
    } else {
      const tallies = createTally()
      axios
        .post('/feedback.json', formInputs)
        .then(res => clearFields())
        .then(res => toggleShouldUpdateCallback())
        .catch(err => setError(err.message))
      axios.post('/tallies.json', tallies)
    }
  }

  return (
    <form className={classes.Form}>
      <TextField
        className={styles.formControl}
        label="Viewing Date"
        type="date"
        value={formInputs.viewingDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={event =>
          setFormInputs({ ...formInputs, viewingDate: event.target.value })
        }
      />
      <FormControl className={styles.formControl}>
        <InputLabel>Location</InputLabel>
        <Select
          value={formInputs.location}
          onChange={event =>
            setFormInputs({ ...formInputs, location: event.target.value })
          }
        >
          {locationMenuItems}
        </Select>
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel>Flat number</InputLabel>
        <Input
          value={formInputs.flatNumber}
          onChange={event =>
            setFormInputs({ ...formInputs, flatNumber: event.target.value })
          }
        />
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel>Applicant name</InputLabel>
        <Input
          value={formInputs.applicantName}
          onChange={event =>
            setFormInputs({
              ...formInputs,
              applicantName: event.target.value,
            })
          }
        />
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel>Reason</InputLabel>
        <Select
          value={formInputs.reason}
          onChange={event =>
            setFormInputs({ ...formInputs, reason: event.target.value })
          }
        >
          <MenuItem value="Cost">Cost</MenuItem>
          <MenuItem value="Commute">Commute Distance</MenuItem>
          <MenuItem value="Travel Links">Travel Links</MenuItem>
        </Select>
      </FormControl>

      <TextField
        className={styles.formControl}
        label="Notes"
        value={formInputs.notes}
        onChange={event =>
          setFormInputs({ ...formInputs, notes: event.target.value })
        }
      />

      <Button
        className={styles.button}
        variant="contained"
        color="primary"
        onClick={submitForm}
      >
        Submit
      </Button>
      <Button
        className={styles.button}
        variant="contained"
        color="secondary"
        onClick={clearFields}
      >
        Clear
      </Button>

      {error}
    </form>
  )
}

export default Form
