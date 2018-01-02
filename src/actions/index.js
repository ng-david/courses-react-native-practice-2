// view calls action, action has payload, payload passes thru reducers, reducers apply payload to current state to return a new state

import firebase from 'firebase';

export const selectPerson = (peopleId) => {
  return {
    type: 'SELECTED_PERSON',
    payload: peopleId,
  };
};

export const noneSelected = () => {
  return {
      type: 'NONE_SELECTED',
  };
};

export const formUpdate = ({ prop, value }) => {
  return {
    type: 'FORM_UPDATE',
    payload: { prop, value },
  };
};

export const createNewContact = ({first_name, last_name, phone, email, company, project, notes }) => {
  const { currentUser } = firebase.auth(); // ask firebase for curr user

  // Using redux thunk
  return (dispatch) => {
    // If there's a user, this will create a new contact for that user, under their own name
    firebase.database().ref(`/users/${currentUser.uid}/people`)
    .push({first_name, last_name, phone, email, company, project, notes })
    .then(() => {
      dispatch({ type: 'NEW_CONTACT' });
    });
  };
};

export const loadInitialContacts = () => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people`)
    .on('value', snapshot => {
      // Thunk
      // Pass value that sits in snapshot into our reducer
      dispatch({ type: 'INITIAL_FETCH', payload: snapshot.val()});
    });
  };
}

export const deleteContact = (uid) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people/${uid}`)
    .remove() // remove from db, then update state
    .then(() => {
      dispatch({ type: 'DELETE_CONTACT'});
    });
  };
}

export const updateContact = (personSelected) => {
  return {
    type: 'UPDATE_CONTACT',
    payload: personSelected,
  };
};

export const saveContact = ({ first_name, last_name, phone, email, company, project, notes, uid }) => {
  // Always identify curr user!!
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/people/${uid}`)
    .set({ first_name, last_name, phone, email, company, project, notes, uid })
    .then(() => {
      dispatch({ type: 'SAVE_CONTACT'});
    });
  };
};
