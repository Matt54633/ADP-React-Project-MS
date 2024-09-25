import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import CustomerList from "./CustomerList";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe('Customer List Component Tests', () => {
    const mockCustomers = [
        { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456' },
    ];

    const mockProps = {
        customers: mockCustomers,
        page: 1,
        count: mockCustomers.length,
        search: '',
        handleSearchChange: jest.fn(),
        handlePageChange: jest.fn(),
        handleSelectCustomer: jest.fn(),
        selectedCustomer: { id: -1 },
        clearSelectedCustomer: jest.fn(),
    };

    it("Customer List is Rendered Correctly", () => {
        render(
            <BrowserRouter>
                <CustomerList {...mockProps} />
            </BrowserRouter>
        );

        const customerList = screen.getByTestId('customerList');
        expect(customerList).toBeInTheDocument();
    });

    it("Renders customer rows correctly", () => {
        render(
            <BrowserRouter>
                <CustomerList {...mockProps} />
            </BrowserRouter>
        );

        const customerRows = screen.getAllByRole('row');
        expect(customerRows).toHaveLength(mockCustomers.length + 1);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    it("Displays the correct range of records", () => {
        render(
            <BrowserRouter>
                <CustomerList {...mockProps} />
            </BrowserRouter>
        );

        const recordRange = screen.getByText(/1-2 of 2 Records/i);
        expect(recordRange).toBeInTheDocument();
    });

    it("Calls handleSelectCustomer when a customer row is clicked", () => {
        render(
            <BrowserRouter>
                <CustomerList {...mockProps} />
            </BrowserRouter>
        );

        const customerRow = screen.getByText('John Doe');
        act(() => {
        userEvent.click(customerRow);
        });
        expect(mockProps.handleSelectCustomer).toHaveBeenCalledWith(mockCustomers[0]);
    });

});
