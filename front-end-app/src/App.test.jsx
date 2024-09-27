import App from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

describe('App Component Tests', () => {
    it("App is Rendered Correctly", () => {
        render(
            <BrowserRouter>
                <App />
            </BrowserRouter>
        )

        const app = screen.getByText('Customer Portal');
        expect(app).toBeInTheDocument();
    });
});