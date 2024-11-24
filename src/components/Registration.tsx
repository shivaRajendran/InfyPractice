import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import InputWrapper from "../UI/InputWrapper";
import { RadioButton } from "primereact/radiobutton";
import { InputTextarea } from "primereact/inputtextarea";

import { addNewUser } from "../store/user-slice";
import { useUserDispatch } from "../store/hooks";
import "./Registration.css";
import { useNavigate } from "react-router-dom";

export type IFormInput = {
  firstName: string;
  isSubscribed: boolean;
  dob: Date;
  contact: string;
  address: string;
  gender: "Male" | "Female";
};

const Regsitration = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();
  const [validation] = useState<boolean>(true);

  const [address, setAddress] = useState<string>("");

  let today = new Date();
  let maxDate = new Date();

  maxDate.setDate(today.getDate());
  maxDate.setMonth(today.getMonth());
  maxDate.setFullYear(today.getFullYear());

  const { control, handleSubmit, setValue, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    const newData = {
      ...data,
      dob: data.dob.toLocaleDateString("en-GB") + ""
    };
    dispatch(addNewUser(newData));
    navigate("/success");
    reset();
  };

  const restrictToNumbers = (value: string) => {
    return value.replace(/[^0-9]/g, "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>User Registration</h1>
      <InputWrapper flowAlongRow={false}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputText
              required={validation}
              id="firstName"
              {...field}
              value={field.value}
            />
          )}
        />
        <label htmlFor="firstName">Username</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={false}>
        <Controller
          name="contact"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <InputText
              required={validation}
              id="contact"
              value={field.value}
              onChange={(e) =>
                field.onChange(restrictToNumbers(e.target.value))
              }
            />
          )}
        />
        <label htmlFor="contact">Contact Number</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={true}>
        <Controller
          name="gender"
          control={control}
          render={({ field }) => (
            <div className="flex flex-wrap gap-3 radio-wrapper">
              <div className="flex align-items-center">
                <RadioButton
                  {...field}
                  inputId="male"
                  name="gender"
                  required={validation}
                  value="Male"
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                  checked={field.value === "Male"}
                />
                <label htmlFor="male" className="ml-2">
                  Male
                </label>
              </div>
              <div className="flex align-items-center gap-3">
                <RadioButton
                  {...field}
                  inputId="female"
                  name="gender"
                  value="Female"
                  onChange={(e) => {
                    field.onChange(e.value);
                  }}
                  checked={field.value === "Female"}
                />
                <label htmlFor="female" className="ml-2">
                  Female
                </label>
              </div>
            </div>
          )}
        />
        <label htmlFor="gender">Gender</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={false}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <InputTextarea
              {...field}
              required={validation}
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setValue("address", e.target.value);
              }}
            />
          )}
        />
        <label htmlFor="address">Address</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={false}>
        <Controller
          name="dob"
          defaultValue={new Date()}
          control={control}
          render={({ field }) => (
            <Calendar
              {...field}
              value={field.value}
              onChange={(e) => field.onChange(e.value)}
              locale="en"
              required={validation}
              maxDate={maxDate}
              id="dob"
              showIcon
            />
          )}
        />
        <label htmlFor="dob">Date Of Birth</label>
      </InputWrapper>
      <InputWrapper flowAlongRow={true} className="checkbox">
        <Controller
          name="isSubscribed"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Checkbox
              inputId="isSubscribed"
              id="isSubscribed"
              checked={field.value}
              onChange={(e) => field.onChange(e.checked)}
            />
          )}
        />{" "}
        <label htmlFor="isSubscribed">
          Enable newsletter to get regualar updates on availability
        </label>
      </InputWrapper>

      <Button label="Submit" />
    </form>
  );
};

export default Regsitration;
