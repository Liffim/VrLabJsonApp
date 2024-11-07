// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Home from './Components/Home';
import Login from './Auth/Login';
import Register from './Auth/Register';
import ObjectFileList from './ObjectFiles/ObjectFileList';
import ObjectFileDetail from './ObjectFiles/ObjectFileDetails';
import ObjectFileForm from './ObjectFiles/ObjectFileForm';
import ThemeList from './Themes/ThemeList';
import ThemeDetails from './Themes/ThemeDetails';
import ObjectFileDetails from './ObjectFiles/ObjectFileDetails'; // Ensure correct import
import CreateTheme from './Themes/CreateTheme';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Header />
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/objectfiles" element={<ObjectFileList />} />
                        <Route path="/objectfiles/:id" element={<ObjectFileDetails />} />
                        <Route path="/upload" element={<ObjectFileForm />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        {/* Themes Routes */}
                        <Route path="/themes" element={<ThemeList />} />
                        <Route path="/themes/:themeId" element={<ThemeDetails />} />
                        {/* Object File Routes for a Specific Theme */}
                        <Route path="/themes/:themeId/objectfile/:objectId" element={<ObjectFileDetails />} />
                        {/* Create Theme Route */}
                        <Route path="/create-theme" element={<CreateTheme />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
