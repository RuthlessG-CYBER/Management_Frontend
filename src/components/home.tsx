import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Package, IndianRupee } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Label } from "./ui/label";

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

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [open, setOpen] = useState(false);
    const [orderQuantity, setOrderQuantity] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/products`)
                setProducts(response.data)
            } catch (error) {
                toast.error("Failed to fetch products")
                console.log("Error fetching products:", error)
            }
        }
        getProducts();
    }, []);

    const handleOrder = async () => {
        if (!selectedProduct) return;

        try {
            await axios.post(`${BASE_URL}/api/orders`, {
                productId: selectedProduct._id,
                quantity: Number(orderQuantity),
                status: "pending"
            });

            toast.success("Order successful!");
            setOpen(false);
            setOrderQuantity(0);
        } catch (error) {
            console.error("Order Error:", error);
            toast.error("Order failed. Please try again.");
        }
    };

    return (
        <>
            <div className="flex items-center justify-between px-5 mt-3">
                <h1 className="text-2xl font-bold text-gray-800">Home</h1>
            </div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 p-5">

                {products.map((product: Product) => (
                    <Card key={product._id} className="shadow-sm">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <CardTitle>{product.name}</CardTitle>
                            <Package className="h-6 w-6 text-blue-600" />
                        </CardHeader>

                        <CardContent>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center">
                                    <IndianRupee className="h-6 w-6" />
                                    <p className="text-3xl font-bold">{product.price}</p>
                                </div>

                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setSelectedProduct(product);
                                        setOpen(true);
                                    }}
                                >
                                    Order Now
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))} {products.length === 0 && "No products found"}

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Place Order</DialogTitle>
                            <DialogDescription>
                                {selectedProduct ? selectedProduct.name : ""}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantity" className="text-right">
                                    Quantity
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    className="col-span-3"
                                    onChange={(e) => setOrderQuantity(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>

                            <Button onClick={handleOrder}>Order Now</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>
        </>
    )
}
