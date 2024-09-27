import { Link } from "react-router-dom";

const CustomerAddUpdateForm = (props) => {
    const isFormEmpty = !props.selectedCustomer.name || !props.selectedCustomer.email || !props.selectedCustomer.password;
    const showAlert = () => { window.alert('Input cannot be empty!') };

    return (
        <div className="flex items-center justify-center h-svh">
            <div data-testid="customerAddUpdateForm" className="flex w-full lg:w-1/2 flex-col gap-3 text-slate-700 ring-1 ring-gray-300 rounded-lg shadow-md p-4">
                <h1 className="text-xl font-bold" >{props.mode}</h1>

                <div className="flex flex-col gap-1">
                    <label htmlFor='name' className="w-10">Name:</label>
                    <input id="name" name="name" type='text' onChange={(e) => props.handleInputChange(e)}
                        value={props.selectedCustomer.name} className="focus:outline-none bg-white ring-1 ring-gray-300 shadow-md transition-colors hover:bg-gray-100 text-sm px-2 h-8 rounded-lg w-full"></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='email' className="w-10">Email:</label>
                    <input id="email" name="email" type='email' onChange={(e) => props.handleInputChange(e)}
                        value={props.selectedCustomer.email} className="focus:outline-none bg-white ring-1 ring-gray-300 shadow-md transition-colors hover:bg-gray-100 text-sm px-2 h-8 rounded-lg w-full"></input>
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor='password' className="w-10">Password:</label>
                    <input id="password" name="password" type='password' onChange={(e) => props.handleInputChange(e)}
                        value={props.selectedCustomer.password} className="focus:outline-none bg-white ring-1 ring-gray-300 shadow-md transition-colors hover:bg-gray-100 text-sm px-2 h-8 rounded-lg w-full"></input>
                </div>

                <div className="flex gap-2 mt-2 justify-between">
                    <Link to='/' onClick={props.handleCancel} className="flex items-center bg-blue-400 ring-1 text-white ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">Cancel</Link>
                    <div className="flex gap-3">
                        <Link to='/' onClick={(e) => {
                            if (isFormEmpty) {
                                showAlert();
                                e.preventDefault();
                            } else {
                                props.handleDelete();
                            }
                        }} className=" flex items-center bg-red-500 ring-1 text-white ring-red-300 shadow-md transition-colors hover:bg-red-600 text-xs px-4 h-8 rounded-lg">Delete</Link>
                        <Link to='/'
                            onClick={(e) => {
                                if (isFormEmpty) {
                                    showAlert();
                                    e.preventDefault();
                                } else {
                                    props.handleSave();
                                }
                            }}

                            className="flex items-center bg-blue-400 ring-1 text-white ring-blue-300 shadow-md transition-colors hover:bg-blue-500 text-xs px-4 h-8 rounded-lg">Save</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerAddUpdateForm;