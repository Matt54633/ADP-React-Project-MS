import App from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { BrowserRouter } from "react-router-dom";

describe('App Component Tests', () => {
    it("App is Rendered Correctly", () => {
        render(
            <BrowserRouter>
                <App /> 
            </BrowserRouter>
        )

        const app = screen.getByTestId('customerList');
        expect(app).toBeInTheDocument();
    });
});