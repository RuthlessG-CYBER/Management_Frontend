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
type RazorpayResponse = {
  razorpay_payment_id: string;
  status: string;
  amount: number;
};

const RAZORPAY_KEY_ID = "rzp_test_Rj5p6Q7Ycz9Msw"


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
        if (orderQuantity <= 0) {
            toast.error("Please enter quantity");
            return;
        }

        try {
            const totalAmount = selectedProduct.price * orderQuantity;
            const orderRes = await axios.post(`${BASE_URL}/api/order-payment`, {
                amount: totalAmount,
            });

            const order = orderRes.data;
            const options = {
                key: RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Product Purchase",
                description: selectedProduct.name,
                order_id: order.id,

                handler: async function (response: RazorpayResponse) {
                    toast.success("Payment Successful");
                    await axios.post(`${BASE_URL}/api/orders`, {
                        productId: selectedProduct._id,
                        quantity: Number(orderQuantity),
                        status: "pending",
                        paymentId: response.razorpay_payment_id,
                        paymentStatus: "paid",
                    });

                    setOpen(false);
                    setOrderQuantity(0);
                },

                prefill: {
                    name: "Soumya Panda",
                    email: "soumyapanda@example.com",
                    contact: "9999999999",
                },

                theme: {
                    color: "#4f46e5",
                },
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Payment error:", error);
            toast.error("Payment Failed");
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
