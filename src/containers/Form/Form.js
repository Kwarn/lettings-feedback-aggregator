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

const Form = ({ tallyData, onPostFeedbackData, onPutTallyData }) => {
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
      onPutTallyData(updateTallyData(tallyData, newTallyData, 'INCREMENT'))
      onPostFeedbackData(formInputs)
      // clearFields()
    }
  }

  // temp function for testing
  function forcePostNewFeedbackEntry() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    const tempFeedbackData = {
      viewingDate: '2020-10-10',
      location: tallyData.orderedLocationKeyNameStringsArray[getRandomInt(7)],
      flatNumber: '115',
      applicantName: 'test',
      reason: tallyData.orderedReasonKeyNameStringsArray[getRandomInt(3)],
      notes: 'teeessttt',
    }
    const newTallyData = {
      location: { [tempFeedbackData.location]: 1 },
      reason: { [tempFeedbackData.reason]: 1 },
    }
    onPostFeedbackData(tempFeedbackData)
    onPutTallyData(updateTallyData(tallyData, newTallyData, 'INCREMENT'))
  }

  const locationMenuItems = tallyData.locationObjectKeyNameToStr.map(l => {
    const key = Object.keys(l)[0]
    return (
      <MenuItem
        key={key}
        value={key}
      >{`${tallyData.convertKeyNameToStr[key]}`}</MenuItem>
    )
  })

  const reasonMenuItems = tallyData.reasonObjectKeyNameToStr.map(r => {
    const key = Object.keys(r)[0]
    return (
      <MenuItem
        key={key}
        value={key}
      >{`${tallyData.convertKeyNameToStr[key]}`}</MenuItem>
    )
  })

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
          {reasonMenuItems}
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
    onPutTallyData: updatedTallyData =>
      dispatch(actions.putTallyData(updatedTallyData)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
