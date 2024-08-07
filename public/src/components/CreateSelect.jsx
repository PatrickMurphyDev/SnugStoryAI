import React, { useState, useEffect } from "react";
import CreatableSelect from "react-select/creatable";
import axios from "axios";

const createOption = (id, label) => {
  //axios.post()
};

const addOption = (label) => ({
  label,
  value: label.toLowerCase().replace(/\W/g, ""),
});

const defaultOptions = [addOption("Loading...")];

const CreatableSelectComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fieldData, setFieldData] = useState({ an: "loading...", ad: "" });
  const [options, setOptions] = useState(defaultOptions);
  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);

  const updateFieldData = (fd) => {
    setFieldData(fd);
    setOptions(
      fd.av.map((v, i, a) => {
        return addOption(v.vn);
      })
    );
  };

  const getOptions = async (field_id = 9) => {
    await axios
      .get("http://localhost:5000/api/characterattributefield/" + field_id)
      .then((r) => updateFieldData(r.data))
      .catch((e) => console.log(e))
      .finally(() => {});
  };

  useEffect(() => getOptions(props.field_id), []);

  const handleCreate = (inputValue) => {
    setIsLoading(true);
    setTimeout(() => {
      const newOption = addOption(inputValue);
      setIsLoading(false);
      setOptions((prev) => [...prev, newOption]);
      setValue(newOption);
    }, 1000);
  };

  return (
    <>
      {focus && <p><sub>{fieldData.ad}</sub></p>}
      <CreatableSelect
        isClearable
        isMulti
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={(newValue) => setValue(newValue)}
        onFocus={()=>setFocus(true)}
        onBlur={()=>setFocus(false)}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
    </>
  );
};

export default CreatableSelectComponent;
