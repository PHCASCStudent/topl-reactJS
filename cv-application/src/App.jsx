// App.jsx
import { useState } from 'react';
import './App.css';
import { Section } from './components/Section';
import { Home } from './components/Home';
import { Heading } from './components/Heading';
import { DisplayInfo } from './components/DisplayInfo';

function App() {
  const [editMode, setEditMode] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [titleOfStudy, setTitleOfStudy] = useState('');
  const [dateOfStudy, setDateOfStudy] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [positionTitle, setPositionTitle] = useState('');
  const [mainResponsibilities, setMainResponsibilities] = useState('');
  const [dateFromWork, setDateFromWork] = useState('');
  const [dateUntilWork, setDateUntilWork] = useState('');
  const [infoObj, setInfoObj] = useState({});

  const onChange = (e, func) => {
    func(e.target.value);
  };

  const sectionInfo = {
    name: 'Name',
    email: 'Email',
    phone: 'Phone Number',
    schoolName: 'School Name',
    titleOfStudy: 'Study Title',
    dateOfStudy: 'Date Of Study',
    companyName: 'Company Name',
    positionTitle: 'Position Title',
    mainResponsibilties: 'Main Responsibilities',
    dateFromWork: 'Date from which you started working',
    dateUntilWork: 'Date until which you worked',
  };

  const inputObj = {
    nameInput: { inputType: 'text', hint: 'Enter your name', val: name },
    emailInput: { inputType: 'email', hint: 'Enter your email', val: email },
    phoneInput: { inputType: 'tel', hint: 'Enter your phone number', val: phone },
    schoolNameInput: { inputType: 'text', hint: 'Enter your school name', val: schoolName },
    titleOfStudyInput: { inputType: 'text', hint: 'Enter your title of study', val: titleOfStudy },
    dateOfStudyInput: { inputType: 'date', hint: 'Enter your date of study', val: dateOfStudy },
    companyNameInput: { inputType: 'text', hint: 'Enter your company name', val: companyName },
    positionTitleInput: { inputType: 'text', hint: 'Enter your posiiton title', val: positionTitle },
    mainResponsibilitiesInput: { inputType: 'text', hint: 'Enter which responsibilites you handled', val: mainResponsibilities },
    dateFromWorkInput: { inputType: 'date', hint: 'Enter since you started working', val: dateFromWork },
    dateUntilWorkInput: { inputType: 'date', hint: 'Enter until you worked', val: dateUntilWork },
  };

  return (
    <>
     {editMode ? (
      <>
    <Home />
    <Heading prop='General Information' />
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
    <Heading prop='Educational Experience' />
      <Section
        prop={sectionInfo.schoolName}
        inputObj={inputObj.schoolNameInput}
        onChange={(e) => onChange(e, setSchoolName)}
      />
      <Section
        prop={sectionInfo.titleOfStudy}
        inputObj={inputObj.titleOfStudyInput}
        onChange={(e) => onChange(e, setTitleOfStudy)}
      />
      <Section
        prop={sectionInfo.dateOfStudy}
        inputObj={inputObj.dateOfStudyInput}
        onChange={(e) => onChange(e, setDateOfStudy)}
      />
    <Heading prop='Practical Experience' />
    <Section
        prop={sectionInfo.companyName}
        inputObj={inputObj.companyNameInput}
        onChange={(e) => onChange(e, setCompanyName)}
      />
      <Section
        prop={sectionInfo.positionTitle}
        inputObj={inputObj.positionTitleInput}
        onChange={(e) => onChange(e, setPositionTitle)}
      />
      <Section
        prop={sectionInfo.mainResponsibilties}
        inputObj={inputObj.mainResponsibilitiesInput}
        onChange={(e) => onChange(e, setMainResponsibilities)}
      />
      <Section
        prop={sectionInfo.dateFromWork}
        inputObj={inputObj.dateFromWorkInput}
        onChange={(e) => onChange(e, setDateFromWork)}
      />
      <Section
        prop={sectionInfo.dateUntilWork}
        inputObj={inputObj.dateUntilWorkInput}
        onChange={(e) => onChange(e, setDateUntilWork)}
      />
      <button style={{marginLeft: "50%"}} onClick={()=>{
        setInfoObj({
          'Name': name,
          'Email': email,
          'Phone': phone,
          'School Name': schoolName,
          'Title of Study': titleOfStudy,
          'Date of Study': dateOfStudy,
          'Company Name': companyName,
          'Position Title': positionTitle,
          'Main Responsibilities': mainResponsibilities,
          'Date From Work': dateFromWork,
          'Date Until Work': dateUntilWork
        });
        setEditMode(!editMode);
      }}>Submit</button>
      </>
      ) : (
      <>
        <DisplayInfo obj={infoObj} />
          <button style={{marginLeft: "45%"}} onClick={()=> setEditMode(!editMode)}>Edit Information</button>
      </>
      )}
      </>
  );
}

export default App;