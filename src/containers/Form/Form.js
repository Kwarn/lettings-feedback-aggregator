import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../store/actions/index'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import { updateTallyData } from '../../shared/Utility'

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: '#FAFAFF',
    display: 'flex',
    justifyContent: 'center',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

const locations = [
  { poplar: 'Poplar' },
  { canningTown: 'Canning Town' },
  { epsom: 'Epsom' },
  { lewisham: 'Lewisham' },
  { walthamstow: 'Walthamstow' },
  { hayes: 'Hayes' },
  { stepneyGreen: 'Stepney Green' },
]

const Form = ({ tallyData, onPostFeedbackData, onPostTallyData }) => {
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

  const locationMenuItems = locations.map(l => {
    const key = Object.keys(l)[0]
    return <MenuItem key={key} value={key}>{`${l[key]}`}</MenuItem>
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

  function submitForm() {
    let isFormValid = true
    for (let input in formInputs) {
      if (!(input === 'notes'))
        isFormValid = formInputs[input].trim() && isFormValid
    }
    if (!isFormValid) {
      setError(<h1>Please fill out form</h1>)
    } else {
      const newTallyData = {
        location: { [formInputs.location]: 1 },
        reason: { [formInputs.reason]: 1 },
      }
      onPostTallyData(updateTallyData(tallyData, newTallyData, 'INCREMENT'))
      onPostFeedbackData(formInputs)
      // clearFields()
    }
  }

  function forcePostNewFeedbackEntry() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }
    const locations = [
      'poplar',
      'canningTown',
      'epsom',
      'lewisham',
      'walthamstow',
      'hayes',
      'stepneyGreen',
    ]
    const reasons = ['cost', 'travelLinks', 'commute']
    const tempFeedbackData = {
      viewingDate: '2020-10-10',
      location: locations[getRandomInt(7)],
      flatNumber: '115',
      applicantName: 'test',
      reason: reasons[getRandomInt(3)],
      notes: 'teeessttt',
    }
    const newTallyData = {
      location: { [tempFeedbackData.location]: 1 },
      reason: { [tempFeedbackData.reason]: 1 },
    }
    onPostFeedbackData(tempFeedbackData)
    onPostTallyData(updateTallyData(tallyData, newTallyData, 'INCREMENT'))
  }

  return (
    <form className={styles.wrapper}>
      <Button onClick={forcePostNewFeedbackEntry}>Force new FB entry</Button>
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
          <MenuItem value="cost">Cost</MenuItem>
          <MenuItem value="commute">Commute Distance</MenuItem>
          <MenuItem value="travelLinks">Travel Links</MenuItem>
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

const mapStateToProps = state => {
  return {
    fbData: state.fbData,
    tallyData: state.tallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostFeedbackData: newFbDataEntry =>
      dispatch(actions.postFeedbackData(newFbDataEntry)),
    onPostTallyData: updatedTallyData =>
      dispatch(actions.postTallyData(updatedTallyData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
