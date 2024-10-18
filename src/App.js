import React, { useState, useEffect } from 'react';
import './App.css';
import VaccinationTable from './components/Table';

function App() {
  // Dropdown options
  const dropdownOptions = [
    "Vaccination 1",
    "Vaccination 2",
    "Vaccination 3",
    "Vaccination 4",
    "Vaccination 5",
    "Vaccination 6"
  ];

  const frequencyOptions = ["Once", "Hours", "Months"]; 

  // State management
  const [selectedOption, setSelectedOption] = useState('');
  const [tableData, setTableData] = useState([]); 
  const [inputData, setInputData] = useState({ field1: '', field2: '', field3: '', field4: '', frequency: '' });
  const [showInputFields, setShowInputFields] = useState(false); 
  const [editIndex, setEditIndex] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [optionError, setOptionError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [itemIndexToDelete, setItemIndexToDelete] = useState(null);

  // Load table data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('tableData');
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
  }, []);

  // Handle dropdown change
  const handleDropdownChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    setInputData({ field1: '', field2: '', field3: '', field4: '', frequency: '' }); 

    // Check if selected option already exists in table data
    const existingRow = tableData.find(data => data.selectedOption === selected);
    if (existingRow) {
      setOptionError(true)
      setSelectedOption('');
    } else {
      setOptionError(false)
      setShowInputFields(true); 
      setEditIndex(null); 
    }
  };

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save data to table and localStorage
  const handleSave = () => {
    if (inputData.field1 && inputData.field2) {
      const newRow = { selectedOption, ...inputData };
      setTableData((prevData) => [...prevData, newRow]); 

      // Save to localStorage
      localStorage.setItem('tableData', JSON.stringify([...tableData, newRow]));

      // Clear input fields after save
      setInputData({ field1: '', field2: '', field3: '', field4: '', frequency: '' });
      setShowInputFields(false); 
      setFieldError(false)
      setSelectedOption(''); 
    } else {
      setFieldError(true)
      // alert("Please fill in all fields marked with *");
    }
  };

  // Handle row deletion
  const handleDelete = (index) => {
    const updatedData = tableData.filter((_, i) => i !== index);
    setTableData(updatedData); 
    localStorage.setItem('tableData', JSON.stringify(updatedData)); 
    setModalOpen(false);
  };

  const openModal = (index) => {
    setItemIndexToDelete(index);
    setModalOpen(true);
  };

  // Handle row editing
  const handleEdit = (index) => {
    setEditIndex(index);
    setInputData({
      field1: tableData[index].field1,
      field2: tableData[index].field2,
      field3: tableData[index].field3,
      frequency: tableData[index].frequency, 
      field4: tableData[index].field4,
    });
    setSelectedOption(tableData[index].selectedOption); 
    setShowInputFields(true);
  };

  // Update the row data
  const handleUpdate = () => {
    if (inputData.field1 && inputData.field2) {
      const updatedRow = { selectedOption, ...inputData };
      const updatedData = tableData.map((data, index) => (index === editIndex ? updatedRow : data));

      setTableData(updatedData); // Update the table data
      localStorage.setItem('tableData', JSON.stringify(updatedData)); 

      // Clear input fields after updating
      setInputData({ field1: '', field2: '', field3: '', field4: '', frequency: '' });
      setShowInputFields(false); 
      setSelectedOption(''); 
      setFieldError(false)
      setEditIndex(null); 
    } else {
      setFieldError(true)
    }
  };

  return (
    <div className="App">
      <h3>Configure Vaccination</h3>

      
      <div style={{ margin: "10px 0" }}>Select Vaccination to add</div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <select
          style={{ fontSize: "15px", padding: "5px", borderRadius: "10px" }}
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          <option value="" disabled>Select Vaccination</option>
          {dropdownOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>

        {optionError && (
          <div style={{ color: "red" }}>
            This option already exists in the table.
          </div>
        )}
      </div>

      
      {tableData.length > 0 || showInputFields ? (
        <>
          <VaccinationTable
            tableData={tableData}
            editIndex={editIndex}
            selectedOption={selectedOption}
            inputData={inputData}
            handleInputChange={handleInputChange}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            openModal={openModal}
            isModalOpen={isModalOpen}
            setModalOpen={setModalOpen}
            itemIndexToDelete={itemIndexToDelete}
            showInputFields={showInputFields}
            setShowInputFields={setShowInputFields}
            handleUpdate={handleUpdate}
            handleSave={handleSave}
            frequencyOptions={frequencyOptions} 
            setEditIndex={setEditIndex}
            setFieldError={setFieldError}
            setSelectedOption={setSelectedOption}
          />
          {fieldError && (
            <div style={{ color: "red", marginTop: "5px" }}>
              Please fill in all fields marked with *
            </div>
          )}
        </>
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
}

export default App;
