import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import InputWrapper from "../UI/InputWrapper";
import { Nullable } from "primereact/ts-helpers";
import { InputNumber } from "primereact/inputnumber";
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
  contact: number;
  address: string;
  gender: string;
};

const Regsitration = () => {
  const dispatch = useUserDispatch();
  const navigate = useNavigate();

  const [isChecked, setChecked] = useState<boolean>(false);
  const [date, setDate] = useState<Nullable<Date>>();
  const [number, setNumber] = useState<number | null>();
  const [address, setAddress] = useState<string>("");
  const [gender, setGender] = useState<"male" | "female" | null>();
  let today = new Date();
  let todayDate = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();

  let maxDate = new Date();
  maxDate.setDate(todayDate);
  maxDate.setMonth(month);
  maxDate.setFullYear(year);

  const { control, handleSubmit, setValue, getValues, reset } = useForm({
    defaultValues: {
      firstName: "",
      isSubscribed: true,
      dob: today,
      contact: 0,
      address: "",
      gender: "",
    },
  });

  const resetValues = () => {
    setNumber(null);
    setGender(null);
    setAddress("");
    setDate(null);
    reset();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // console.log(data);
    const newDate = {
      ...data,
      dob: data.dob.toString(),
    };
    dispatch(addNewUser(newDate));
    navigate("/success");
    resetValues();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>User Registration</h1>
      <InputWrapper flowAlongRow={false}>
        <Controller
          name="firstName"
          control={control}
          render={({ field }) => (
            <InputText required id="firstName" {...field} />
          )}
        />
        <label htmlFor="firstName">Username</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={false}>
        <Controller
          name="contact"
          control={control}
          render={({ field }) => (
            <InputNumber
              {...field}
              required
              useGrouping={false}
              value={number}
              id="contact"
              onValueChange={(e) => {
                if ("value" in e && typeof e.value === "number") {
                  setValue("contact", e.value);
                  setNumber(e.value);
                }
              }}
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
                  required
                  value="male"
                  onChange={(e) => {
                    setGender(e.value);
                    setValue("gender", "male");
                  }}
                  checked={gender === "male"}
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
                  value="female"
                  onChange={(e) => {
                    setGender(e.value);
                    setValue("gender", "female");
                  }}
                  checked={gender === "female"}
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
              required
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setValue("address", e.target.value);
              }}
              rows={5}
              cols={30}
            />
          )}
        />
        <label htmlFor="address">Address</label>
      </InputWrapper>

      <InputWrapper flowAlongRow={false}>
        <Controller
          name="dob"
          control={control}
          render={({ field }) => (
            <Calendar
              {...field}
              onChange={(e) => {
                if ("value" in e && e.value instanceof Date) {
                  setValue("dob", e.value);
                  setDate(getValues("dob"));
                }
                // onDateChange();
              }}
              locale="en"
              required
              maxDate={maxDate}
              id="dob"
              value={date}
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
          render={({ field }) => (
            <Checkbox
              {...field}
              // onChange={onCheckBoxChange}
              onChange={(e) => {
                let state = e.checked ? e.checked : false;
                setValue("isSubscribed", state);
                setChecked(state);
              }}
              checked={isChecked}
              id="isSubscribed"
            ></Checkbox>
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
