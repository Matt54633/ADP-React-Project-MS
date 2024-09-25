import Search from "./Search";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react";

describe('Search Component Tests', () => {
    it("Search Input is Rendered Correctly", () => {
        render(
            <Search />
        );

        const searchInput = screen.getByPlaceholderText(/search/i);
        expect(searchInput).toBeInTheDocument();
    });

    it("Search Icon is Rendered Correctly", () => {
        render(
            <Search />
        );

        const searchIcon = screen.getByTestId('svg');
        expect(searchIcon).toBeInTheDocument();
    });

    it("Allows typing in the search input", () => {
        const handleSearchChange = jest.fn();

        render(
            <Search search={""} handleSearchChange={handleSearchChange} />
        );

        const searchInput = screen.getByPlaceholderText(/search/i);

        expect(searchInput).toBeInTheDocument();

        act(() => {
        userEvent.type(searchInput, 'test input');
        });
        expect(handleSearchChange).toHaveBeenCalledTimes('test input'.length);
    });
});