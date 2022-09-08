import React, { useState, useRef } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const options = [
  { id: 1, text: "None", value: "none" },
  { id: 2, text: "Text", value: "text" },
  { id: 3, text: "Number", value: "number" },
  { id: 4, text: "Select", value: "select" },
  { id: 5, text: "TextArea", value: "textarea" },
  { id: 6, text: "Radio", value: "radio" },
  { id: 7, text: "Checkbox", value: "checkbox" },
  { id: 8, text: "Slider", value: "slider" },
];

const Container = () => {
  let data = {};
  const [select, setSelect] = useState(false);

  const [serviceList, setServiceList] = useState([
    { enteredOption: "", min: "", max: "" },
  ]);

  let optionNumber = 1;

  const questionInputRef = useRef();
  const answerTypeInputRef = useRef();
  const formRef = useRef();




  const confirmHandler = (e) => {
    e.preventDefault();
  };



  const selectHandler = () => {
    if (answerTypeInputRef.current.value === "none") {
      setSelect(false);
    } else {
      setSelect(true);
    }
  };




  const addOptionHandler = () => {
    if (serviceList.length < 4) {
      setServiceList([...serviceList, { enteredOption: "", min: "", max: "" }]);
    }
  };




  const removeOptionHandler = (index) => {
    const optionList = [...serviceList];
    optionList.splice(index, 1);
    setServiceList(optionList);
  };




  const submitHandler = () => {
    const enteredQuestion = questionInputRef.current.value;
    const answerType = answerTypeInputRef.current.value;

    data = {
      enteredQuestion,
      answerType,
      serviceList,
    };
    console.log(data);

    if (select === true) {
      toast.success("Logged Success", {
        position: toast.POSITION.TOP_CENTER,
      });
      setSelect(false);

      formRef.current.reset();
    }
  };





  const handleServiceChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...serviceList];
    list[index][name] = value;
    setServiceList(list);
  };
  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  };




  return (
    <React.Fragment>
      <ToastContainer autoClose={2000} />
      <form
        className="d-flex flex-column justify-content-center container h-75 w-75 bg-warning border aligns-items-center"
        onSubmit={confirmHandler}
        ref={formRef}>
        <div>
          <div className="input-group mb-3 ">
            <input
              type="text"
              className=" question form-control"
              placeholder="Question Title"
              ref={questionInputRef}
            />
          </div>
          <select
            className="form-select mb-3"
            defaultValue={"Answer Type"}
            ref={answerTypeInputRef}
            onChange={selectHandler}
          >
            <option disabled hidden>
              Answer Type
            </option>
            {options.map((op) => (
              <option key={op.id} value={op.value}>
                {op.text}
              </option>
            ))}
          </select>
          {select &&
            serviceList.map((singleService, index) => (
              <div
                key={index}
                className="d-flex flex-column bg-light py-10 mt-2 "
              >
                <div className="m-2">Option {optionNumber++}</div>
                <div className="input-group d-flex container h-100 w-75 p-50 mb-2">
                  <input
                    id="enteredOption"
                    name="enteredOption"
                    type="text"
                    placeholder="Placeholder"
                    className="form-control w-50 flex-fill"
                    value={singleService.service}
                    onChange={(e) => handleServiceChange(e, index)}
                  />
                  <input
                    id="min"
                    name="min"
                    min="0"
                    type="number"
                    placeholder="Min"
                    className="form-control "
                    value={singleService.service}
                    onKeyPress={preventMinus}
                    onChange={(e) => handleServiceChange(e, index)}
                  />
                  <input
                    id="max"
                    name="max"
                    min="0"
                    type="number"
                    placeholder="Max"
                    onKeyPress={preventMinus}
                    className="form-control "
                    // ref={addToRefs}
                    value={singleService.service}
                    onChange={(e) => handleServiceChange(e, index)}
                  />
                  {optionNumber !== 1 && serviceList.length > 1 && (
                    <button
                      type="button"
                      className="btn btn-dark"
                      onClick={removeOptionHandler}
                    >
                      -
                    </button>
                  )}
                </div>
              </div>
            ))}
        </div>
        <div className="d-flex justify-content-between mt-5">
          <button
            type="submit"
            className="btn btn-dark "
            onClick={submitHandler}
            disabled={!select}
          >
            Submit
          </button>

          <button
            type="add"
            className="btn btn-dark rounded-circle"
            onClick={addOptionHandler}
            disabled={!select}
          >
            +
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Container;
