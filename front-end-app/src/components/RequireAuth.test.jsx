import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RequireAuth from "./RequireAuth"; 
import "@testing-library/jest-dom/extend-expect";
import { AuthProvider } from '../hooks/AuthContext'; 

describe('RequireAuth Component Tests', () => {

    it("Navigates to /login when user is not authenticated", () => {
        render(
            <AuthProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/login" element={<div data-testid="login">Login Page</div>} />
                        <Route path="*" element={
                            <RequireAuth>
                                <div data-testid="protected">Protected Content</div>
                            </RequireAuth>
                        } />
                    </Routes>
                </MemoryRouter>
            </AuthProvider>
        );

        const loginPage = screen.getByTestId('login');
        expect(loginPage).toBeInTheDocument();
        expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
    });
});
