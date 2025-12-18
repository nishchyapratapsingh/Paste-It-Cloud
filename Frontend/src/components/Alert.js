export default function Alert(props) {
  return (
    <>
      <div style={{ height: "50px" }}>
        {props.alert && ( //checks if alert is null
          <div className={`alert alert-${props.alert.type}`} role="alert">
            {props.alert.message}
          </div>
        )}
      </div>
    </>
  );
}
