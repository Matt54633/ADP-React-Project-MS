import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Paginator from "./Paginator";
import { act } from "react";

describe('Paginator Component Tests', () => {

    it("Paginator is Rendered Correctly", () => {
        render(
            <Paginator /> 
        );

        const backButton = screen.getByTestId('backButton')
        const pageDisplay = screen.getByTestId('pageDisplay')
        const nextButton = screen.getByTestId('paginator')
        const paginator = screen.getByTestId('paginator');

        expect(paginator).toBeInTheDocument();
        expect(backButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
        expect(pageDisplay).toBeInTheDocument();
    });

    it("Paginator prevents navigating to page 0", () => {
        const handlePageChange = jest.fn();

        render(
            <Paginator page={1} count={30} handlePageChange={handlePageChange} />
        );

        const backButton = screen.getByTestId('backButton')
        expect(backButton).toBeInTheDocument();
        act(() => {
        userEvent.click(backButton);
        }); 
        expect(handlePageChange).not.toHaveBeenCalled();

    });

    it("Paginator allows navigating to the next page", () => {
        const handlePageChange = jest.fn();

        render(
            <Paginator page={1} count={30} handlePageChange={handlePageChange} />
        );

        const nextButton = screen.getByTestId('nextButton')
        expect(nextButton).toBeInTheDocument();
        act(() => {
        userEvent.click(nextButton);
        });
        expect(handlePageChange).toHaveBeenCalled();

    });
});