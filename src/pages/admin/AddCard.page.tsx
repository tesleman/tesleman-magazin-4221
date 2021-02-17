import axios from 'axios';
import React from 'react';

const AddCard = () => {
  const [state, setstate] = React.useState(null);

  const ref = React.useRef();

  const hendelSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setstate(e.target.files);
  };
  console.log(state);
  const ubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    Array.from(state).forEach((file: any) => {
      formData.append('avatar', file);
    });
    console.log(formData);
    const response = await fetch('http://localhost:3000/api/file', {
      body: formData,
      method: 'post',
    });
    let user = await response.json();
    console.log(user);
  };

  return (
    <form onSubmit={ubmit}>
      <input ref={ref} onChange={hendelSubmit} type="file" multiple />
      <button type="submit">sad</button>
    </form>
  );
};
export default AddCard;
