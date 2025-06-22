export const DisplayInfo = ({obj}) => {
  return (
    <>
    <h2>Here's the entered information</h2>
    <ol style={{fontSize: '30px'}}>
    {Object.entries(obj).map(([key, value])=>{
        return ( 
        <li key={key} style={{background: 'rgb(85, 13, 168)', padding: '4px', marginBottom: '6px'}}>
            <span style={{marginLeft: '10px'}}>{key}: {value}</span>
        </li>)
    })}
    </ol>
    </>
  );
};