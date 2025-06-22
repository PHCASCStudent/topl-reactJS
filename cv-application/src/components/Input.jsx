export const Input = ({ inputType, hint, value, onChange }) => {
  return (
    <input
      type={inputType}
      placeholder={hint}
      value={value}
      onChange={onChange}
    />
  );
};