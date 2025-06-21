import { Input } from './Input';

export const Section = ({ prop, inputObj, onChange }) => {
  return (
    <>
      <section>
        <main>
          <h1>{prop}</h1>
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