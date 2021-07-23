import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import NoteForm from '../components/NoteForm';
import { NEW_NOTE } from '../gql/mutation';
import { GET_MY_NOTES, GET_NOTES } from '../gql/query';

const NewNote = (props: any) => {
  useEffect(() => {
    document.title = 'New Note — Share Note';
  });

  const [data, { loading, error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: data => {
      props.history.push(`note/${data.newNote.id}`);
    }
  });

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error saving the note</p>}
      <NoteForm action={data} />
    </>
  );
};

export default NewNote;
