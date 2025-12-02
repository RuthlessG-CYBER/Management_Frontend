import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ListOrdered, AlertTriangle, IndianRupee } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";



// const BASE_URL = `http://localhost:4040`
const BASE_URL = `https://management-backend-oskq.onrender.com`

interface Product {
    _id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    category: string;
    minimumStockAlert: number;
}

export default function Dashboard() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [lowStock, setLowStock] = useState(0);
    const [recentProducts, setRecentProducts] = useState<Product[]>([]);

    const getTotalOrders = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/total-orders`);
            setTotalOrders(response.data);

        } catch (error) {
            console.error("Error fetching total orders:", error);
            toast.error("Failed to fetch total orders. Please try again.");
        }
    };
    getTotalOrders();

    const getTotalProducts = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/total-products`);
            setTotalProducts(response.data);
        } catch (error) {
            console.error("Error fetching total products:", error);
            toast.error("Failed to fetch total products. Please try again.");
        }
    }
    getTotalProducts();

    const getLowStock = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/low-stock-count`);
            setLowStock(response.data);
        } catch (error) {
            console.error("Error fetching low stock:", error);
            toast.error("Failed to fetch low stock. Please try again.");
        }
    }
    getLowStock();

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/recent-added-products`);
                setRecentProducts(response.data);
            } catch (error) {
                console.error("Error fetching recent products:", error);
                toast.error("Failed to fetch recent products. Please try again.");
            }
        };

        fetchRecentProducts();
    }, []);

    return (
        <main className="grow w-full px-5 mt-3">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 mt-5">
                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Total Products</CardTitle>
                        <Package className="h-6 w-6 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalProducts}</p>
                        <p className="text-sm text-gray-500">Active inventory items</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Low Stock</CardTitle>
                        <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{lowStock}</p>
                        <p className="text-sm text-gray-500">Need urgent restock</p>
                    </CardContent>
                </Card>

                <Card className="shadow-sm">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Total Orders</CardTitle>
                        <ListOrdered className="h-6 w-6 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <p className="text-3xl font-bold">{totalOrders}</p>
                        <p className="text-sm text-gray-500">Completed & pending</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>Recent Inventory</CardTitle>
                </CardHeader>
                <CardContent>
                    {recentProducts.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Product ID</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Category</TableHead>
                                    <TableHead>Price</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentProducts.map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell className="font-medium">{product._id}</TableCell>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-row items-center">
                                                <IndianRupee className="h-4 w-4" />
                                                {product.price}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <p className="text-sm text-gray-500">No recent products found.</p>  
                    )}
                </CardContent>
            </Card>
        </main>
    );
}
