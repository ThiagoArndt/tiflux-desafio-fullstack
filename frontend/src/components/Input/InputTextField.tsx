interface InputTextFieldProps
  extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

function InputTextField(props: Readonly<InputTextFieldProps>) {
  return (
    <div>
      <input
        {...props}
        className="font-vietnam h-8 text-black-color font-normal text-sm bg-transparent rounded-sm border-grey-color-150 border-[2px] shadow-none border-solid border-gray-color outline-none focus:border-grey-color-50 block w-full p-2.5  "
      />
    </div>
  );
}

export default InputTextField;
