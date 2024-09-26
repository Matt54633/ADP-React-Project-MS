import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import SortSelect from "./SortSelect";

describe('SortSelect Component Tests', () => {
    it("SortSelect is Rendered Correctly", () => {
        render(
            <SortSelect sortDirection={'A-Z'} />
        );

        const sortSelect = screen.getByText('A-Z');
        expect(sortSelect).toBeInTheDocument();
    });

    it("SortSelect is displays options correctly", () => {
        const mockHandleSortDirectionChange = jest.fn();

        render(
            <SortSelect handleSortDirectionChange={mockHandleSortDirectionChange} sortDirection={'A-Z'} />
        );

        expect(screen.getByRole('combobox')).toHaveValue('A-Z');
        expect(screen.getByText('A-Z')).toBeInTheDocument();
        expect(screen.getByText('Z-A')).toBeInTheDocument();
    });

    it("Calls handleSortDirectionChange with the correct value when the selection changes", () => {
        const mockHandleSortDirectionChange = jest.fn();

        render(
            <SortSelect handleSortDirectionChange={mockHandleSortDirectionChange} sortDirection="A-Z" />
        );

        userEvent.selectOptions(screen.getByRole('combobox'), 'Z-A');

        expect(mockHandleSortDirectionChange).toHaveBeenCalledWith('Z-A');
    });
});