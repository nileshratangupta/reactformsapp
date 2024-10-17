import React from 'react';
import deleteIcon from "../assets/delete.png";
import editIcon from "../assets/edit.png";
import ConfirmationModal from './ConfirmationModal'; // Adjust the import according to your file structure

const VaccinationTable = ({
    tableData,
    editIndex,
    selectedOption,
    inputData,
    handleInputChange,
    handleEdit,
    handleDelete,
    openModal,
    isModalOpen,
    setModalOpen,
    itemIndexToDelete,
    showInputFields,
    setShowInputFields,
    handleUpdate,
    handleSave,
    frequencyOptions,
    setSelectedOption,
    setEditIndex,
    setFieldError
}) => {
    return (
        <div>
            <table className="styled-table" style={{ width: '100%', marginTop: '20px' }} cellSpacing={2}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>From Week <span style={{ color: "red" }}>*</span></th>
                        <th>To Week <span style={{ color: "red" }}>*</span></th>
                        <th>Frequency(Every)</th>
                        <th>Comments</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <td>{editIndex === index ? selectedOption : row.selectedOption}</td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="number"
                                        name="field1"
                                        style={{ width: "80%", fontSize: "15px" }}
                                        value={inputData.field1}
                                        onChange={handleInputChange}
                                        className="table-input"
                                    />
                                ) : (
                                    row.field1
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="number"
                                        name="field2"
                                        style={{ width: "80%", fontSize: "15px" }}
                                        value={inputData.field2}
                                        onChange={handleInputChange}
                                        className="table-input"
                                    />
                                ) : (
                                    row.field2
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "0 10px",
                                        width: "80%",
                                        boxSizing: "border-box"
                                    }}>
                                        <input
                                            type="number"
                                            name="field3"
                                            style={{
                                                flex: 1,
                                                fontSize: "15px",
                                                border: "none",
                                                outline: "none",
                                                padding: "0",
                                                marginRight: "5px"
                                            }}
                                            value={inputData.field3}
                                            onChange={handleInputChange}
                                            className="table-input"
                                        />
                                        <div style={{
                                            width: "1px",
                                            backgroundColor: "#cccccc",
                                            height: "37px",
                                            margin: "0 5px"
                                        }} />
                                        <select
                                            name="frequency"
                                            style={{
                                                width: "150px",
                                                fontSize: "15px",
                                                border: "none",
                                                outline: "none",
                                                padding: "0",
                                            }}
                                            value={inputData.frequency}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" disabled>Select Frequency</option>
                                            {frequencyOptions.map((option) => (
                                                <option >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "40%" }}>
                                        <span>{row.field3}</span> <span>{row.frequency}</span>
                                    </div>
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <input
                                        type="text"
                                        name="field4"
                                        style={{ width: "80%", fontSize: "15px" }}
                                        value={inputData.field4}
                                        onChange={handleInputChange}
                                        className="table-input"
                                    />
                                ) : (
                                    row.field4
                                )}
                            </td>
                            <td>
                                {editIndex === index ? (
                                    <div>
                                        <button className="cancel-btn" onClick={() => {
                                            setEditIndex(null)
                                            setShowInputFields(false);
                                            setFieldError(false)
                                            setSelectedOption('')
                                        }}>Cancel</button>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div>
                                            <img
                                                src={editIcon}
                                                alt="Edit"
                                                style={{ cursor: "pointer", width: "20px", marginRight: "5px" }}
                                                onClick={() => handleEdit(index)}
                                            />
                                        </div>
                                        <div>
                                            <img
                                                src={deleteIcon}
                                                alt="Delete"
                                                style={{ cursor: "pointer", width: "18px" }}
                                                onClick={() => openModal(index)}
                                            />
                                            <ConfirmationModal
                                                isOpen={isModalOpen}
                                                onClose={() => setModalOpen(false)}
                                                onConfirm={() => handleDelete(itemIndexToDelete)}
                                            />
                                        </div>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                    {showInputFields && editIndex === null && (
                        <tr>
                            <td>{selectedOption}</td>
                            <td>
                                <input
                                    type="number"
                                    name="field1"
                                    style={{ width: "80%", fontSize: "15px" }}
                                    value={inputData.field1}
                                    onChange={handleInputChange}
                                    className="table-input"
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="field2"
                                    style={{ width: "80%", fontSize: "15px" }}
                                    value={inputData.field2}
                                    onChange={handleInputChange}
                                    className="table-input"
                                />
                            </td>
                            <td>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    padding: "0 10px",
                                    width: "80%",
                                    boxSizing: "border-box"
                                }}>
                                    <input
                                        type="number"
                                        name="field3"
                                        style={{
                                            flex: 1,
                                            fontSize: "15px",
                                            border: "none",
                                            outline: "none",
                                            padding: "0",
                                            marginRight: "5px"
                                        }}
                                        value={inputData.field3}
                                        onChange={handleInputChange}
                                        className="table-input"
                                    />
                                    <div style={{
                                        width: "1px",
                                        backgroundColor: "#cccccc",
                                        height: "37px",
                                        margin: "0 5px"
                                    }} />
                                    <select
                                        name="frequency"
                                        style={{
                                            width: "150px",
                                            fontSize: "15px",
                                            border: "none",
                                            outline: "none",
                                            padding: "0",
                                        }}
                                        value={inputData.frequency}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select Frequency</option>
                                        {frequencyOptions.map((option) => (
                                            <option >
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="field4"
                                    style={{ width: "80%", fontSize: "15px" }}
                                    value={inputData.field4}
                                    onChange={handleInputChange}
                                    className="table-input"
                                />
                            </td>
                            <td>
                                <div>
                                    <button className="cancel-btn" onClick={() => {
                                        setFieldError(false)
                                        setShowInputFields(false);
                                        setSelectedOption('');
                                    }}>Cancel</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {showInputFields && (
                <div style={{ marginTop: '20px' }}>
                    {editIndex !== null ? (
                        <button className="save-btn" onClick={handleUpdate}>
                            Update
                        </button>
                    ) : (
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default VaccinationTable;
