import React, { Fragment, useState } from "react";

const InputEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: "",
    last_name: "",
    afm: "",
    date_of_birth: "",
  });
  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setEmployee({ ...employee, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      employee.first_name &&
      employee.last_name &&
      employee.afm &&
      employee.date_of_birth
    ) {
      const newEmployee = { ...employee };
      console.log(newEmployee);
      const response = await fetch("http://localhost:5000/employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });
      console.log(response);
      setEmployees([...employees, newEmployee]);
      setEmployee({
        first_name: "",
        last_name: "",
        afm: "",
        date_of_birth: "",
      });
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Add Employee</h1>
      <form className="mt-5" style={{ display: "flex", flexDirection: "row" }}>
        <div className="form-control">
          <label htmlFor="first_name">
            <h4>
              First Name :
              <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                value={employee.first_name}
                onChange={handleChange}
              />
            </h4>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="last_name">
            <h4>
              Last Name :
              <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                value={employee.last_name}
                onChange={handleChange}
              />
            </h4>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="afm">
            <h4>
              AFM :
              <input
                type="text"
                className="form-control"
                id="afm"
                name="afm"
                value={employee.afm}
                onChange={handleChange}
              />
            </h4>
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="date_of_birth">
            <h4>
              Date Of Birth :
              <input
                type="text"
                className="form-control"
                id="date_of_birth"
                name="date_of_birth"
                value={employee.date_of_birth}
                onChange={handleChange}
              />
            </h4>
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-success"
          onClick={handleSubmit}
        >
          Add
        </button>
      </form>
      {employees.map((person, index) => {
        const { first_name, last_name, afm, date_of_birth } = person;
        return (
          <article>
            <div
              className="mt-5"
              style={{ display: "flex", flexDirection: "row" }}
              key={index}
            >
              <h4>
                {first_name} {last_name} {afm} {date_of_birth}
              </h4>
            </div>
          </article>
        );
      })}
    </Fragment>
  );
};

export default InputEmployee;
