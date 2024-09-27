import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext'; 

const TestComponent = () => {
    const { user, login, logout } = useAuth();

    return (
        <div>
            <div data-testid="user">{user ? user.username : 'No user logged in'}</div>
            <button onClick={() => login('testuser', 'password')}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('AuthContext Tests', () => {
    it('Should login a user', () => {
        render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(window.location.pathname).toBe('/');
    });

});
