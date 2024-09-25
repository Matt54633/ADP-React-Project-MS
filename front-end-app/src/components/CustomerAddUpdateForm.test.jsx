import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import CustomerAddUpdateForm from "./CustomerAddUpdateForm";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe('CustomerAddUpdateForm Component Tests', () => {
    const mockSelectedCustomer = {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
    };

    const mockProps = {
        mode: 'Update',
        selectedCustomer: mockSelectedCustomer,
        handleInputChange: jest.fn(),
        handleCancel: jest.fn(),
        handleDelete: jest.fn(),
        handleSave: jest.fn()
    };

    it("CustomerAddUpdateForm is Rendered Correctly", () => {
        render(
            <BrowserRouter>
                <CustomerAddUpdateForm {...mockProps} />
            </BrowserRouter>
        );

        const form = screen.getByTestId('customerAddUpdateForm');
        expect(form).toBeInTheDocument();

        expect(screen.getByLabelText(/name/i)).toHaveValue(mockSelectedCustomer.name);
        expect(screen.getByLabelText(/email/i)).toHaveValue(mockSelectedCustomer.email);
        expect(screen.getByLabelText(/password/i)).toHaveValue(mockSelectedCustomer.password);
    });

    it("Calls handleCancel on Cancel button click", () => {
        render(
            <BrowserRouter>
                <CustomerAddUpdateForm {...mockProps} />
            </BrowserRouter>
        );

        const cancelButton = screen.getByText(/cancel/i);
        act(() => {
        userEvent.click(cancelButton);
        });
        expect(mockProps.handleCancel).toHaveBeenCalled();
    });

    it("Calls handleDelete on Delete button click", () => {
        render(
            <BrowserRouter>
                <CustomerAddUpdateForm {...mockProps} />
            </BrowserRouter>
        );

        const deleteButton = screen.getByText(/delete/i);
        act(() => {
        userEvent.click(deleteButton);
        });
        expect(mockProps.handleDelete).toHaveBeenCalled();
    });

    it("Calls handleSave on Save button click", () => {
        render(
            <BrowserRouter>
                <CustomerAddUpdateForm {...mockProps} />
            </BrowserRouter>
        );

        const saveButton = screen.getByText(/save/i);
        act(() => {
        userEvent.click(saveButton);
        });
        expect(mockProps.handleSave).toHaveBeenCalled();
    });
});
