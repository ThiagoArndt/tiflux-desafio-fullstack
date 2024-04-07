interface InputLabelProps {
  label: string;
  isRequired?: boolean;
}

function InputLabel(props: Readonly<InputLabelProps>) {
  const { label, isRequired } = props;
  return (
    <div className="flex gap-2 items-center justify-center">
      <label
        htmlFor="first_name"
        className="font-vietman font-medium block text-sm text-black-color"
      >
        {label}
      </label>
      {isRequired ? (
        <div className="flex-1">
          <span className="mr-auto font-vietnam font-sm text-red-color">*</span>
        </div>
      ) : (
        <></>
      )}
      <div className="flex-1"></div>
    </div>
  );
}

export default InputLabel;
