// App.jsx
import { useState } from 'react';
import './App.css';
import { Section } from './components/Section';

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const onChange = (e, func) => {
    func(e.target.value);
  };

  const sectionInfo = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone Number',
  };

  const inputObj = {
    nameInput: { inputType: 'text', hint: 'Enter your name', val: name },
    emailInput: { inputType: 'email', hint: 'Enter your email', val: email },
    phoneInput: { inputType: 'tel', hint: 'Enter your phone number', val: phone },
  };

  return (
    <>
      <Section
        prop={sectionInfo.name}
        inputObj={inputObj.nameInput}
        onChange={(e) => onChange(e, setName)}
      />
      <Section
        prop={sectionInfo.email}
        inputObj={inputObj.emailInput}
        onChange={(e) => onChange(e, setEmail)}
      />
      <Section
        prop={sectionInfo.phone}
        inputObj={inputObj.phoneInput}
        onChange={(e) => onChange(e, setPhone)}
      />
      <p style={{ color: 'white' }}>{name}</p>
      <p style={{ color: 'white' }}>{email}</p>
      <p style={{ color: 'white' }}>{phone}</p>
    </>
  );
}

export default App;