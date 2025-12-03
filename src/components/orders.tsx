import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "./ui/card";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { FilePenLine } from 'lucide-react';
import { Dialog, DialogContent, DialogFooter } from "./ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    SelectLabel,
    SelectGroup
} from "./ui/select"
import { Input } from "./ui/input";
import { Label } from "./ui/label";


const BASE_URL = `https://management-backend-oskq.onrender.com`
// const BASE_URL = `http://localhost:4040`


interface Order {
    _id: string;
    productId: {
        _id: string;
        name: string;
        price: number;
        stock: number
    };
    quantity: number;
    status: string;
    paymentStatus: string
}

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);

    const [openEdit, setOpenEdit] = useState(false);
    const [editProduct, setEditProduct] = useState<Order | null>(null);

    useEffect(() => {
        const getOrders = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/orders`)
                setOrders(response.data.orders)
            } catch (error) {
                toast.error("Failed to fetch orders")
                console.error(error)
            }
        }
        getOrders()

        const interval = setInterval(() => {
            getOrders();
        }, 5000); 
        return () => clearInterval(interval);

    }, [])

    const handleEdit = async () => {
        try {
            if (!editProduct) {
                return;
            }
            const response = await axios.put(`${BASE_URL}/api/orders/${editProduct._id}`, {
                stock: editProduct?.productId.stock,
                status: editProduct?.status
            })

            console.log("Edit Success:", response.data);
            toast.success("Edit successful!");

            setOpenEdit(false);
        } catch (error) {
            console.error("Edit Error:", error);
            toast.error("Edit failed. Please try again.");
        }
    }

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`${BASE_URL}/api/orders/${id}`)
            console.log("Delete Success:", response.data);
            setOrders(prev => prev.filter(p => p._id !== id));
            toast.success("Delete successful!");
        } catch (error) {
            console.error("Delete Error:", error);
            toast.error("Delete failed. Please try again.");
        }
    }


    return (
        <div className="flex flex-col gap-6 text-2xl font-bold text-gray-800 px-5 mt-3 mb-3">
            <h1>Orders</h1>
            <div className="flex flex-col gap-3" >
                {orders.map((order: Order) => (
                    <Card key={order._id} className="flex flex-col">
                        <CardHeader>
                            <div className="flex flex-row justify-between items-center">
                                <CardTitle>Name: {order.productId.name}</CardTitle>
                                <div className="flex flex-row gap-3">
                                    <Button variant={"outline"} onClick={() => { setOpenEdit(true); setEditProduct(order) }}>
                                        <FilePenLine />
                                    </Button>
                                    <Button variant={"destructive"} onClick={() => handleDelete(order._id)}>Delete</Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <CardDescription>Quantity: {order.quantity}</CardDescription>
                            <CardDescription>Product ID: {order.productId._id}</CardDescription>
                            <CardDescription>Status: {order.status}</CardDescription>
                            <CardDescription>Stocks: {order.productId.stock}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex-row gap-2">
                            <CardDescription>Order ID: {order._id}</CardDescription>
                            <CardDescription>Payment Status: {order.paymentStatus}</CardDescription>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                <DialogContent>
                    <div className="flex flex-col gap-4 mt-2">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Edit Order</h1>
                            <p className="text-gray-600">Edit the status and stocks of the order</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Label>Stocks</Label>
                            <Input type="number" placeholder="Stocks"
                                onChange={(e) => {
                                    if (editProduct) {
                                        setEditProduct({ ...editProduct, productId: { ...editProduct.productId, stock: parseInt(e.target.value) } });
                                    }
                                }} />
                        </div>
                        <Select
                            onValueChange={(value) => {
                                if (editProduct) {
                                    setEditProduct({ ...editProduct, status: value });
                                }
                            }}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Order Status</SelectLabel>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <DialogFooter>
                            <Button variant="outline" onClick={() => setOpenEdit(false)}>
                                Cancel
                            </Button>

                            <Button onClick={handleEdit}>Save</Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    );
}

export default Orders;