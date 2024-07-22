import React, { useState, useEffect } from 'react';
import Api_Response from '../Utils/Api_Response';
import { IoIosSearch } from "react-icons/io";

const apiResponse = Api_Response;

function TaxResourceForm() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [formValues, setFormValues] = useState({
        taxRate: 4,
        applied_to: 'some',
        selectedItems: [],
    });

    useEffect(() => {
        const fetchItems = async () => {
            const data = apiResponse;
            setItems(data);

            const uniqueCategories = [...new Set(data.map(item => item.category?.name))].filter(Boolean);
            setCategories(uniqueCategories);
        };

        fetchItems();
    }, []);

    const handleRadioChange = (event) => {
        setFormValues({ ...formValues, applied_to: event.target.value });

        if (event.target.value === 'all') {
            setItems(items.map(item => ({ ...item, selected: true })));
        }
    };

    const handleCategoryToggle = (categoryName, selected) => {
        const updatedItems = items.map(item => {
            if (item.category?.name === categoryName) {
                return { ...item, selected };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleItemChange = (itemId, selected) => {
        const updatedItems = items.map(item => {
            if (item.id === itemId) {
                return { ...item, selected };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const handleTaxRateChange = (event) => {
        setFormValues({ ...formValues, taxRate: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const selectedItems = items.filter(item => item.selected);
        console.log('Form values:', { ...formValues, selectedItems });
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl mb-4">Add Tax</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center">
                    <input
                        type='text' placeholder='enter tax...'
                        className="border rounded px-3 py-2 w-7/12 m-2"
                    />

                    <input
                        type="text"
                        value={formValues.taxRate}
                        onChange={handleTaxRateChange}
                        className="border rounded px-3 py-2 w-16"
                    />
                    <span className="ml-2">%</span>
                </div>

                <div className="flex items-center">
                    <label>
                        <input
                            type="radio"
                            name="applied_to"
                            value="some"
                            checked={formValues.applied_to === 'some'}
                            onChange={handleRadioChange}
                            className="mr-2"
                        />
                        Apply to specific items
                    </label>
                </div>
                <div className="flex items-center ">
                    <label>
                        <input
                            type="radio"
                            name="applied_to"
                            value="all"
                            checked={formValues.applied_to === 'all'}
                            onChange={handleRadioChange}
                            className="mr-2"
                        />
                        Apply to all items in collection
                    </label>
                </div>

                <div className=" flex items-center border rounded px-3 py-2 w-[500px]">
                    <IoIosSearch color='gray' />
                    <input
                        type="text"
                        placeholder="Search items"
                        className="focus:outline-none"
                    />
                </div>
                <hr />
                {categories.map(category => (
                    <div key={category}>
                        <div className="bg-gray-200 p-2 mt-4">
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={e => handleCategoryToggle(category, e.target.checked)}
                                    className="mr-2"
                                />
                                {category}
                            </label>
                        </div>
                        <div className="ml-4">
                            {items
                                .filter(item => item.category?.name === category)
                                .map(item => (
                                    <div key={item.id}>
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={item.selected || false}
                                                onChange={e => handleItemChange(item.id, e.target.checked)}
                                                className="mr-2"
                                            />
                                            {item.name}
                                        </label>
                                    </div>
                                ))}
                        </div>
                    </div>
                ))}

                <div>
                    <div className='bg-gray-200 p-2 mt-4'>
                        <label>
                            <input
                                type="checkbox"
                                onChange={e => handleCategoryToggle(null, e.target.checked)}
                                className="mr-2"
                            />
                            Apply to uncategorized items
                        </label>
                    </div>

                    <div className="ml-4">
                        {items
                            .filter(item => !item.category)
                            .map(item => (
                                <div key={item.id}>
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={item.selected || false}
                                            onChange={e => handleItemChange(item.id, e.target.checked)}
                                            className="mr-2"
                                        />
                                        {item.name}
                                    </label>
                                </div>
                            ))}
                    </div>
                </div>
                <hr />
                <button
                    type="submit"
                    className="bg-orange-500 text-white p-2 rounded ml-[59rem]"
                    onClick={handleSubmit}
                >
                    Apply tax to {items.filter(item => item.selected).length} item(s)
                </button>
            </form>
        </div>
    );
};

export default TaxResourceForm;
