import people from './people.json';

const initialState = {
  people: [],
  detailView: false,
  personSelected: null,
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  company: '',
  project: '',
  notes: '',
  toUpdate: false,
};

export default (state = initialState, action) => {
  switch (action.type) {

    case 'INITIAL_FETCH':
      return {
        ...state,
        people: action.payload,
      };

    case 'SELECTED_PERSON':
      return {
        ...state,
        detailView: true,
        personSelected: action.payload
      };

    case 'NONE_SELECTED':
      return {
        ...state,
        detailView: false,
        personSelected: null,
      };

    case 'FORM_UPDATE':
      return {
        ...state,
        // Every form update, updates the state (even just one character!)
        [action.payload.prop]: action.payload.value
      };

    case 'NEW_CONTACT':
      return {
        ...state,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        company: '',
        project: '',
        notes: '',
      };

    case 'ADD_PERSON':
      return {
        ...state,
        ...action.newPerson
      };

    case 'UPDATE_CONTACT':
      return {
        ...state,
        toUpdate: true,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        phone: action.payload.phone,
        email: action.payload.email,
        company: action.payload.company,
        project: action.payload.project,
        notes: action.payload.notes,
        uid: action.payload.uid, // needed to update on firebase
      }

    case 'SAVE_CONTACT':
      return {
        ...state,
        toUpdate: false,
        detailView: false,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        company: '',
        project: '',
        notes: '',
        uid: '', // needed to update on firebase
      }

    case 'DELETE_CONTACT':
      return {
        ...state,
        detailView: false, // ensure we are redirected back to listview
        personSelected: null,
      }

    default:
      return state;
  }
}
