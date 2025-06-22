import { Input } from './Input';

export const Section = ({ prop, inputObj, onChange }) => {
  return (
    <>
      <section>
        <main>
          <h3 style={{display:'inline-block', marginRight: '10px'}}>{prop}</h3>
          <Input
            inputType={inputObj.inputType}
            hint={inputObj.hint}
            value={inputObj.val}
            onChange={onChange}
          />
        </main>
      </section>
      <hr />
    </>
  );
};