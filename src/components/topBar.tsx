import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

interface TopBarProps {
    selected: "home" | "products" | "orders" | "dashboard";
    onSelect: (page: "home" | "products" | "orders" | "dashboard") => void;
}

export default function TopBar({ selected, onSelect }: TopBarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    const active = "text-blue-600 font-semibold";
    const normal = "text-gray-700";

    return (
        <header className="w-full bg-white shadow-md font-sG">
            <div className="mx-auto px-4 py-3 flex items-center justify-between">

                <h1 className="text-xl font-semibold text-blue-500">
                    Inventory & Order Fulfillment System
                </h1>

                <div className="flex items-center gap-10">

                    <nav className="flex space-x-6 font-medium">
                        <button
                            onClick={() => onSelect("home")}
                            className={`${selected === "home" ? active : normal} hover:text-blue-600`}
                        >
                            Home
                        </button>

                        <button
                            onClick={() => onSelect("products")}
                            className={`${selected === "products" ? active : normal} hover:text-blue-600`}
                        >
                            Products
                        </button>

                        <button
                            onClick={() => onSelect("orders")}
                            className={`${selected === "orders" ? active : normal} hover:text-blue-600`}
                        >
                            Orders
                        </button>

                        <button
                            onClick={() => onSelect("dashboard")}
                            className={`${selected === "dashboard" ? active : normal} hover:text-blue-600`}
                        >
                            Dashboard
                        </button>
                    </nav>

                    <Button
                        onClick={handleLogout}
                        variant="outline"
                        className="bg-white hover:bg-red-600 hover:text-white"
                    >
                        <LogOut size={18} />
                        Logout
                    </Button>
                </div>
            </div>
        </header>
    );
}
