import React from 'react';
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from './Login';
import { AuthProvider } from '../hooks/AuthContext'; 
import "@testing-library/jest-dom/extend-expect";

describe('Login Component Tests', () => {
    it("Renders login form correctly", () => {
        render(
            <AuthProvider>
                <BrowserRouter>
                    <Login />
                </BrowserRouter>
            </AuthProvider>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});
