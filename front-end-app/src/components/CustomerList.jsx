import Paginator from "./Paginator";
import Search from "./Search";
import { Link } from "react-router-dom";
import SortSelect from "./SortSelect";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CustomerList = (props) => {
    const navigate = useNavigate();
    const itemsPerPage = 15;
    const start = (props.page - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, props.count);
    const [lastClickTime, setLastClickTime] = useState(0);
    const doubleClickThreshold = 250;

    const displayAlert = () => {
        if (props.selectedCustomer.name == "") {
            window.alert('Please select a customer first!')
        }
    }

    // allow user to double click a row to go straight to the form page
    const handleRowClick = (e, customer) => {
        const currentTime = new Date().getTime();

        if (currentTime - lastClickTime < doubleClickThreshold) {
            if (props.selectedCustomer.id != -1) {
                navigate('/form');
            }
        } else {
            props.handleSelectCustomer(customer);
        }

        setLastClickTime(currentTime);
    };

    return (
        <div data-testid="customerList" className="flex flex-col gap-4 py-5 w-full">
            <div className="flex justify-between gap-4 items-center">
                <h1 className="text-xl font-bold text-slate-700">Customer List</h1>
                <Search search={props.search} handleSearchChange={props.handleSearchChange} />

                <div className="flex gap-2 items-center">
                    <SortSelect handleSortDirectionChange={props.handleSortDirectionChange} />
                    {props.selectedCustomer.id === -1 ? (
                        <span onClick={displayAlert} className="flex cursor-default items-center text-gray-300 bg-slate-400 ring-1 ring-slate-300 shadow-md transition-colors text-xs px-4 h-8 rounded-lg">
                            Update
                        </span>
                    ) : (
                        <Link to={'/form'} className="flex items-center bg-blue-400 ring-1 ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">
                            Update
                        </Link>
                    )}
                    <Link to={'/form'} onClick={props.clearSelectedCustomer} className="flex items-center bg-blue-400 ring-1 ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">Add</Link>
                </div>
            </div>

            <table className="text-center border shadow-md">
                <thead>
                    <tr className="bg-slate-700 border">
                        <th className="w-1/3">Name</th>
                        <th className="w-1/3">Email</th>
                        <th className="w-1/3">Password</th>
                    </tr>
                </thead>
                <tbody>
                    {props.customers.length === 0 ? (
                        <tr>
                            <td colSpan={3} className="text-center text-xs text-slate-700">
                                No Customers Found
                            </td>
                        </tr>
                    ) : (
                        props.customers.map(customer => (
                            <tr key={customer.id} onClick={(e) => handleRowClick(e, customer)} className={`cursor-pointer hover:underline text-slate-700 ${customer.id === props.selectedCustomer.id ? 'font-bold bg-slate-200' : 'font-regular'}`}>
                                <td className="text-xs">{customer.name}</td>
                                <td className="text-xs">{customer.email}</td>
                                <td className="text-xs">{customer.password}</td>

                            </tr>
                        ))
                    )}
                </tbody>

            </table>

            <div className="flex gap-5 items-center mt-2">
                <div className="h-[1px] w-1/3 bg-gray-300"></div>
                <p className="text-slate-700 text-xs text-center w-1/3">
                    {start}-{end} of {props.count} Records
                </p>
                <div className="h-[1px] w-1/3 bg-gray-300"></div>
            </div>

            <div className="flex gap-2 justify-center">
                <Paginator page={props.page} count={props.count} handlePageChange={props.handlePageChange} />
            </div>
        </div >
    );
}

export default CustomerList;
