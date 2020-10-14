import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/Utility'

const initalState = {
  feedback: {
    test: 'test',
  },
}

const reducer = (state = initalState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return updateObject(state, action)
  }
}
