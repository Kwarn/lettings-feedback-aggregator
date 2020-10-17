import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../../store/actions/index'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import * as utility from '../../../shared/Utility'

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

const PendingSalesInputForm = ({
  pendingSalesTallyData,
  onPostPendingSalesData,
  onPutTallyData,
}) => {
  const styles = useStyles()
  const [error, setError] = useState('')
  const [formInputs, setFormInputs] = useState({
    viewingDate: '',
    location: '',
    flatNumber: '',
    applicantName: '',
    notes: '',
  })

  function clearFields() {
    setFormInputs({
      viewingDate: '',
      location: '',
      flatNumber: '',
      applicantName: '',
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
      // onPutTallyData(updateTallyData(pendingSalesTallyData, newTallyData, 'INCREMENT'))
      // onPostPendingSalesData(formInputs)
      // // clearFields()
    }
  }

  // temp function for testing
  function forcePostNewFeedbackEntry() {
    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max))
    }

    const tempFeedbackData = {
      viewingDate: '2020-10-10',
      location: utility.orderedLocationKeyNameStringsArray[getRandomInt(7)],
      flatNumber: '115',
      applicantName: 'test',
      notes: 'teeessttt',
    }
    const newTallyData = {
      location: { [tempFeedbackData.location]: 1 },
      reason: { [tempFeedbackData.reason]: 1 },
    }
    // onPostPendingSalesData(tempFeedbackData)
    // onPutTallyData(updateTallyData(pendingSalesTallyData, newTallyData, 'INCREMENT'))
  }

  const locationMenuItems = utility.locationObjectKeyNameToStr.map(l => {
    const key = Object.keys(l)[0]
    return (
      <MenuItem
        key={key}
        value={key}
      >{`${utility.convertKeyNameToStr[key]}`}</MenuItem>
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
    pendingSalesData: state.pendingSalesData,
    pendingSalesTallyData: state.pendingSalesTallyData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onPostPendingSalesData: newApplicantDataEntry =>
      dispatch(actions.postPendingSalesData(newApplicantDataEntry)),
    onPutTallyData: updatedPendingSalesTallyData =>
      dispatch(actions.putPendingSalesTallyData(updatedPendingSalesTallyData)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PendingSalesInputForm)
