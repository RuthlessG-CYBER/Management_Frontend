import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from 'lucide-react';

interface TopBarProps {
    onSelect: (selected: "home" | "products" | "orders") => void;
}

function TopBar({ onSelect }: TopBarProps) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <header className="w-full bg-white shadow-md font-sG">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-blue-500">
                    Inventory & Order Fulfillment System
                </h1>

                <div className="flex items-center justify-center gap-10">
                    <nav className="flex space-x-6 text-gray-700 font-medium">
                        <button onClick={() => onSelect("home")} className="hover:text-blue-600">Home</button>
                        <button onClick={() => onSelect("products")} className="hover:text-blue-600">Products</button>
                        <button onClick={() => onSelect("orders")} className="hover:text-blue-600">Orders</button>
                    </nav>

                    <Button onClick={handleLogout} variant="outline" className="bg-white hover:bg-red-600 hover:text-white">
                        <LogOut />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}

export default TopBar;
